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
    height: calc(100vh - 200px);
    overflow-y: auto;
    padding: 20px;
    background: #222831;
    color: #DFD0B8;
  }
  
  .empty-state {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: rgba(223, 208, 184, 0.6);
  }
  
  .message {
    margin-bottom: 20px;
  }
  
  .role-label {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 2px 8px;
    border-radius: 4px;
    display: inline-block;
    margin-bottom: 8px;
  }
  
  .role-label.user {
    color: #ef4444;
    background: rgba(239, 68, 68, 0.2);
    border: 1px solid rgba(239, 68, 68, 0.3);
  }
  
  .role-label.assistant {
    color: #f97316;
    background: rgba(249, 115, 22, 0.2);
    border: 1px solid rgba(249, 115, 22, 0.3);
  }
  
  .content {
    margin-left: 19px;
    line-height: 1.5;
  }
</style>