<script lang="ts">
  import { EventBus } from '../../lib/eventbus';
  
  // Rule 7: Use Svelte Right - using runes
  let message = $state('');
  let loading = $state(false);
  let messages = $state<Array<{role: string, content: string}>>([]);

  async function sendMessage() {
    if (!message.trim() || loading) return;
    
    const userMessage = message;
    message = ''; // Clear input immediately
    loading = true;
    
    console.log('chat-send-start', { message: userMessage });

    // Add user message immediately
    messages = [...messages, { role: 'user', content: userMessage }];
    EventBus.emit('message-sent', { messages: messages });

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          messages: messages.slice(0, -1) // Don't include the user message we just added
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response stream');
      }

      let currentAssistantMessage = '';
      
      // Add empty assistant message for streaming
      messages = [...messages, { role: 'assistant', content: '' }];
      
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              
              if (data.type === 'content') {
                currentAssistantMessage = data.fullResponse;
                // Update the last message (assistant) with streaming content
                messages = [
                  ...messages.slice(0, -1),
                  { role: 'assistant', content: currentAssistantMessage }
                ];
                EventBus.emit('message-sent', { messages: messages });
              } else if (data.type === 'complete') {
                console.log('chat-stream-complete', { responseLength: data.response?.length });
                messages = data.messages || messages;
                EventBus.emit('message-sent', { messages: messages });
              } else if (data.type === 'error') {
                throw new Error(data.error);
              }
            } catch (parseError) {
              // Skip invalid JSON lines
              continue;
            }
          }
        }
      }
      
    } catch (error) {
      console.error('chat-send-error', { error: error.message });
      // Replace last message with error
      messages = [
        ...messages.slice(0, -1),
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }
      ];
      EventBus.emit('message-sent', { messages: messages });
    } finally {
      loading = false;
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }
</script>

<div class="input-container">
  <div class="input-bar">
    <textarea 
      bind:value={message}
      onkeydown={handleKeydown}
      placeholder="Type a message..."
      disabled={loading}
      rows="1"
    ></textarea>
    <button onclick={sendMessage} disabled={loading || !message.trim()}>
      {loading ? '...' : 'Send'}
    </button>
  </div>
</div>

<style>
  .input-container {
    position: fixed;
    bottom: var(--input-bottom);
    left: 50%;
    transform: translateX(-50%);
    width: var(--messages-width);
    max-width: var(--messages-max-width);
  }
  
  .input-bar {
    display: flex;
    align-items: flex-end;
    gap: var(--input-gap);
    padding: var(--input-padding);
    background: var(--input-background);
    backdrop-filter: var(--input-backdrop-filter);
    border: var(--input-border-width) solid;
    border-image: linear-gradient(to bottom, var(--input-border-top), var(--input-border-bottom)) 1;
    border-radius: var(--input-border-radius);
    box-shadow: var(--input-shadow-outer), var(--input-shadow-inner);
  }
  
  textarea {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: var(--text-color);
    font-size: var(--font-size);
    line-height: var(--line-height);
    resize: none;
    min-height: var(--textarea-min-height);
    font-family: var(--font-family);
  }
  
  textarea::placeholder {
    color: var(--text-muted);
  }
  
  textarea:disabled {
    opacity: var(--disabled-opacity);
  }
  
  button {
    padding: var(--button-padding);
    background: var(--controls-hover-background);
    border: var(--border-width) solid var(--input-border-top);
    border-radius: var(--input-border-radius);
    color: var(--text-color);
    cursor: pointer;
    transition: background var(--transition-duration);
  }
  
  button:hover:not(:disabled) {
    background: var(--controls-hover-background);
  }
  
  button:disabled {
    opacity: var(--disabled-opacity);
    cursor: not-allowed;
  }
</style>