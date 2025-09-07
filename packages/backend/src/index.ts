import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Bindings = {
  // R2_BUCKET: R2Bucket
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

// R2 bucket example endpoint (uncomment when R2 is configured)
// app.get('/api/files', async (c) => {
//   const bucket = c.env.R2_BUCKET
//   const objects = await bucket.list()
//   return c.json({ files: objects.objects.map(obj => obj.key) })
// })

export default app