<script lang="ts">
  import { ChatMessages } from './features/chat-messages';
  import { ChatInput } from './features/chat-input';
  import { generateCSSProperties } from './lib/css-theme';
  
  // Inject theme CSS variables
  const cssProps = generateCSSProperties();
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = cssProps;
    document.head.appendChild(style);
  }
</script>

<main>
  <ChatMessages />
  <ChatInput />
</main>

<style>
  :global(body) {
    background: #222831;
    color: #e0e0e0;
    margin: 0;
    padding: 0;
    font-family: 'Lexend', -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', system-ui, sans-serif;
  }
  
  main {
    min-height: 100vh;
    position: relative;
  }
</style>