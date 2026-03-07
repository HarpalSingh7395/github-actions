import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App'

describe('App', () => {
    it('renders the Vite + React heading', () => {
        render(<App />)
        expect(screen.getByText('Vite + React')).toBeInTheDocument()
    })

    it('renders the counter button starting at 0', () => {
        render(<App />)
        expect(screen.getByRole('button', { name: /count is 0/i })).toBeInTheDocument()
    })

    it('increments the counter on click', () => {
        render(<App />)
        const button = screen.getByRole('button', { name: /count is 0/i })
        fireEvent.click(button)
        expect(screen.getByRole('button', { name: /count is 1/i })).toBeInTheDocument()
    })
})
