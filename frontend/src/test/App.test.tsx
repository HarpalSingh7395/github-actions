import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import App from '../App'

beforeEach(() => {
    vi.resetAllMocks()
})

describe('App', () => {
    it('renders the Vite + React heading', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            json: async () => ({ message: 'Hello from Github Actions API!' }),
        } as unknown as Response)

        render(<App />)
        expect(screen.getByText('Vite + React')).toBeInTheDocument()
    })

    it('renders the counter button starting at 0', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            json: async () => ({ message: 'Hello from Github Actions API!' }),
        } as unknown as Response)

        render(<App />)
        expect(screen.getByRole('button', { name: /count is 0/i })).toBeInTheDocument()
    })

    it('increments the counter on click', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            json: async () => ({ message: 'Hello from Github Actions API!' }),
        } as unknown as Response)

        render(<App />)
        const button = screen.getByRole('button', { name: /count is 0/i })
        fireEvent.click(button)
        expect(screen.getByRole('button', { name: /count is 1/i })).toBeInTheDocument()
    })

    it('displays the API message from backend', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            json: async () => ({ message: 'Hello from Github Actions API!' }),
        } as unknown as Response)

        render(<App />)
        await waitFor(() =>
            expect(screen.getByText('Hello from Github Actions API!')).toBeInTheDocument()
        )
    })

    it('shows error when backend is unreachable', async () => {
        global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

        render(<App />)
        await waitFor(() =>
            expect(screen.getByText('Failed to connect to backend')).toBeInTheDocument()
        )
    })
})
