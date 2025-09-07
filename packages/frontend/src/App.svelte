<script lang="ts">
  let count = $state(0)

  function increment() {
    count += 1
  }
</script>

<main class="min-h-screen bg-gray-50 flex items-center justify-center">
  <div class="bg-white p-8 rounded-lg shadow-md">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">Welcome to Rune</h1>
    
    <div class="space-y-4">
      <p class="text-gray-600">
        A Svelte 5 + Hono.js application with TypeScript and Cloudflare Workers
      </p>
      
      <div class="flex items-center space-x-4">
        <button 
          onclick={increment}
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Count: {count}
        </button>
      </div>
    </div>
  </div>
</main>