import { render, screen } from '@testing-library/react'
import Home from '@/pages/index'

// This tests fails its just an example
describe('Home', () => {
  it('renders a heading', () => {
    render(<Home/>)

    const alcaldia = screen.getByText("Alcaldia");

    expect(alcaldia).toBeInTheDocument()
  })
})