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

    try {
      const response = await fetch('http://localhost:8787/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          messages: messages
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      console.log('chat-send-success', { responseLength: data.response?.length });
      
      // Update local messages and emit event
      messages = data.messages || [];
      EventBus.emit('message-sent', { messages: messages });
      
    } catch (error) {
      console.error('chat-send-error', { error: error.message });
      // Add error message to chat
      messages = [
        ...messages,
        { role: 'user', content: userMessage },
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
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 800px;
  }
  
  .input-bar {
    display: flex;
    align-items: flex-end;
    gap: 12px;
    padding: 16px;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(20px);
    border: 2px solid;
    border-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1)) 1;
    border-radius: 9px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4), inset 0 -2px 8px rgba(255, 255, 255, 0.08);
  }
  
  textarea {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: #DFD0B8;
    font-size: 14px;
    line-height: 1.5;
    resize: none;
    min-height: 20px;
    font-family: inherit;
  }
  
  textarea::placeholder {
    color: rgba(223, 208, 184, 0.6);
  }
  
  textarea:disabled {
    opacity: 0.5;
  }
  
  button {
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    color: #DFD0B8;
    cursor: pointer;
    transition: background 0.2s;
  }
  
  button:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.15);
  }
  
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>