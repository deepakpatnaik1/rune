import { Hono } from 'hono'
import { cors } from 'hono/cors'
import OpenAI from 'openai'

type Bindings = {
  // R2_BUCKET: R2Bucket
  OPENAI_API_KEY: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('/api/*', cors({
  origin: ['http://localhost:5173'],
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

    console.log('openai-request', { model: 'gpt-4', messageCount: chatMessages.length })

    const completion = await openai.chat.completions.create({
      model: 'gpt-4', // Using gpt-4 as gpt-5 might not be available yet
      messages: chatMessages,
      max_tokens: 1000,
      temperature: 0.7
    })

    const response = completion.choices[0]?.message?.content || 'No response generated'
    
    console.log('openai-response', { success: true, responseLength: response.length })

    return c.json({
      response,
      messages: [...chatMessages, { role: 'assistant', content: response }]
    })

  } catch (error) {
    console.error('chat-error', { error: error.message })
    return c.json({ error: 'Failed to process chat request' }, 500)
  }
})

// R2 bucket example endpoint (uncomment when R2 is configured)
// app.get('/api/files', async (c) => {
//   const bucket = c.env.R2_BUCKET
//   const objects = await bucket.list()
//   return c.json({ files: objects.objects.map(obj => obj.key) })
// })

export default app