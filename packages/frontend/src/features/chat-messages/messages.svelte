<script lang="ts">
  import { onMount } from 'svelte';
  import { EventBus } from '../../lib/eventbus';
  
  // Rule 7: Use Svelte Right - using runes
  let messages = $state<Array<{role: string, content: string}>>([]);

  onMount(() => {
    // Rule 3: Simple Event System - listen for new messages
    EventBus.on('message-sent', (data) => {
      console.log('messages-received-event', { messageCount: data.messages?.length });
      if (data.messages) {
        messages = data.messages;
      }
    });
  });
</script>

<div class="messages-container">
  {#if messages.length === 0}
    <div class="empty-state">
      <p>No messages yet. Start a conversation!</p>
    </div>
  {:else}
    <div class="messages-list">
      {#each messages as message}
        <div class="message">
          <div class="role-label {message.role}">
            {message.role.toUpperCase()}
          </div>
          <div class="content">
            {message.content}
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .messages-container {
    position: fixed;
    bottom: var(--messages-bottom);
    left: 50%;
    transform: translateX(-50%);
    width: var(--messages-width);
    max-width: var(--messages-max-width);
    height: var(--messages-height);
    overflow-y: auto;
    padding: var(--scrollback-padding);
    background: var(--bg-color);
    color: var(--text-color);
    border-radius: var(--input-border-radius) var(--input-border-radius) 0 0;
  }
  
  .empty-state {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: var(--text-muted);
  }
  
  .message {
    margin-bottom: var(--message-spacing);
  }
  
  .role-label {
    font-size: var(--label-font-size);
    font-weight: var(--label-font-weight);
    text-transform: var(--label-text-transform);
    letter-spacing: var(--label-letter-spacing);
    padding: var(--label-padding);
    border-radius: var(--label-border-radius);
    display: inline-block;
    margin-bottom: var(--header-spacing);
  }
  
  .role-label.user {
    color: var(--user-text);
    background: var(--user-bg);
    border: 1px solid var(--user-border);
  }
  
  .role-label.assistant {
    color: var(--assistant-text);
    background: var(--assistant-bg);
    border: 1px solid var(--assistant-border);
  }
  
  .content {
    margin-left: var(--content-indent);
    line-height: var(--line-height);
  }
</style>