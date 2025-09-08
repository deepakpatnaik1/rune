import { Hono } from 'hono'
import { cors } from 'hono/cors'
import OpenAI from 'openai'

type Bindings = {
  // R2_BUCKET: R2Bucket
  OPENAI_API_KEY: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('/api/*', cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

app.get('/api/health', (c) => {
  return c.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: '0.1.0'
  })
})

app.get('/api/hello', (c) => {
  return c.json({ 
    message: 'Hello from Hono on Cloudflare Workers!',
    timestamp: new Date().toISOString()
  })
})

app.post('/api/chat', async (c) => {
  try {
    const { message, messages = [] } = await c.req.json()
    
    console.log('chat-request', { messageCount: messages.length, hasApiKey: !!c.env.OPENAI_API_KEY })
    
    if (!message) {
      return c.json({ error: 'Message is required' }, 400)
    }

    const openai = new OpenAI({
      apiKey: c.env.OPENAI_API_KEY
    })

    const chatMessages = [
      ...messages,
      { role: 'user', content: message }
    ]

    console.log('openai-request', { model: 'gpt-5', messageCount: chatMessages.length })

    const stream = await openai.chat.completions.create({
      model: 'gpt-5', // Using GPT-5 full model as requested by Boss
      messages: chatMessages,
      max_completion_tokens: 1000, // GPT-5 uses max_completion_tokens instead of max_tokens
      // temperature: 0.7 // GPT-5 only supports default temperature (1)
      stream: true, // Enable streaming
    })

    console.log('openai-stream-start', { model: 'gpt-5', messageCount: chatMessages.length })

    // Set up Server-Sent Events headers
    c.header('Content-Type', 'text/event-stream')
    c.header('Cache-Control', 'no-cache')
    c.header('Connection', 'keep-alive')
    c.header('Access-Control-Allow-Origin', '*')
    c.header('Access-Control-Allow-Headers', 'Content-Type')

    let fullResponse = ''

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          // Send initial data with user message
          const initialData = {
            type: 'start',
            messages: [...chatMessages]
          }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(initialData)}\n\n`))

          // Process the stream
          for await (const chunk of stream) {
            const content = chunk.choices?.[0]?.delta?.content || ''
            if (content) {
              fullResponse += content
              const streamData = {
                type: 'content',
                content: content,
                fullResponse: fullResponse
              }
              controller.enqueue(encoder.encode(`data: ${JSON.stringify(streamData)}\n\n`))
            }
          }

          // Send completion data
          const completeData = {
            type: 'complete',
            response: fullResponse,
            messages: [...chatMessages, { role: 'assistant', content: fullResponse }]
          }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(completeData)}\n\n`))
          
          console.log('openai-stream-complete', { responseLength: fullResponse.length })
          controller.close()
        } catch (error) {
          console.error('stream-error', { error: error.message })
          const errorData = { type: 'error', error: error.message }
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(errorData)}\n\n`))
          controller.close()
        }
      }
    })

    return new Response(readable)

  } catch (error) {
    console.error('chat-error', { 
      error: error.message, 
      status: error.status,
      details: error.error || error 
    })
    return c.json({ 
      error: 'Failed to process chat request',
      details: error.message 
    }, 500)
  }
})

// R2 bucket example endpoint (uncomment when R2 is configured)
// app.get('/api/files', async (c) => {
//   const bucket = c.env.R2_BUCKET
//   const objects = await bucket.list()
//   return c.json({ files: objects.objects.map(obj => obj.key) })
// })

export default app