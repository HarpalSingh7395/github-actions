import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../index'

describe('GET /health', () => {
    it('returns status ok', async () => {
        const res = await request(app).get('/health')
        expect(res.status).toBe(200)
        expect(res.body.status).toBe('ok')
        expect(res.body.timestamp).toBeDefined()
    })
})

describe('GET /api/hello', () => {
    it('returns hello message', async () => {
        const res = await request(app).get('/api/hello')
        expect(res.status).toBe(200)
        expect(res.body.message).toBe('Hello from Github Actions API!')
    })
})

describe('GET /api/hello/:name', () => {
    it('greets by name', async () => {
        const res = await request(app).get('/api/hello/Harpal')
        expect(res.status).toBe(200)
        expect(res.body.message).toBe('Hello, Harpal!')
    })
})
