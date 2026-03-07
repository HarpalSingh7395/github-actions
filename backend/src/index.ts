import express, { Request, Response } from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// Health check
app.get('/health', (_req: Request, res: Response) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
    })
})

// Hello endpoint for github actions comments.
app.get('/api/hello', (_req: Request, res: Response) => {
    res.json({
        message: 'Hello from Github Actions API!',
    })
})

// Greet by name
app.get('/api/hello/:name', (req: Request, res: Response) => {
    const { name } = req.params
    res.json({
        message: `Hello, ${name}!`,
    })
})

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`)
    })
}


export default app
