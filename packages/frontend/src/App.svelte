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
    background: var(--bg-color);
    color: var(--text-color);
    margin: 0;
    padding: 0;
    font-family: var(--font-family);
  }
  
  main {
    min-height: var(--main-min-height);
    position: relative;
  }
</style>