import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchBar } from '../index'

describe('SearchBar', () => {
  it('should render input and button with correct initial state', () => {
    render(<SearchBar onSearch={() => {}} />)

    const input = screen.getByPlaceholderText('Buscar usuarios de GitHub...')
    const button = screen.getByRole('button', { name: /buscar/i })

    expect(input).toBeInTheDocument()
    expect(input).toHaveValue('')
    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()
  })

  it('should enable button when input has text', async () => {
    const user = userEvent.setup()
    render(<SearchBar onSearch={() => {}} />)

    const input = screen.getByPlaceholderText('Buscar usuarios de GitHub...')
    const button = screen.getByRole('button', { name: /buscar/i })

    await user.type(input, 'test')

    expect(button).toBeEnabled()
  })

  it('should disable button when input is cleared', async () => {
    const user = userEvent.setup()
    render(<SearchBar onSearch={() => {}} />)

    const input = screen.getByPlaceholderText('Buscar usuarios de GitHub...')
    const button = screen.getByRole('button', { name: /buscar/i })

    await user.type(input, 'test')
    await user.clear(input)

    expect(button).toBeDisabled()
  })

  it('should call onSearch with trimmed value when submitting', async () => {
    const user = userEvent.setup()
    const mockOnSearch = jest.fn()
    render(<SearchBar onSearch={mockOnSearch} />)

    const input = screen.getByPlaceholderText('Buscar usuarios de GitHub...')
    const button = screen.getByRole('button', { name: /buscar/i })

    await user.type(input, '  test  ')
    await user.click(button)

    expect(mockOnSearch).toHaveBeenCalledTimes(1)
    expect(mockOnSearch).toHaveBeenCalledWith('test')
  })

  it('should call onSearch when pressing enter', async () => {
    const user = userEvent.setup()
    const mockOnSearch = jest.fn()
    render(<SearchBar onSearch={mockOnSearch} />)

    const input = screen.getByPlaceholderText('Buscar usuarios de GitHub...')

    await user.type(input, 'test{enter}')

    expect(mockOnSearch).toHaveBeenCalledTimes(1)
    expect(mockOnSearch).toHaveBeenCalledWith('test')
  })

  it('should not call onSearch when submitting empty or whitespace-only input', async () => {
    const user = userEvent.setup()
    const mockOnSearch = jest.fn()
    render(<SearchBar onSearch={mockOnSearch} />)

    const input = screen.getByPlaceholderText('Buscar usuarios de GitHub...')

    await user.type(input, '   {enter}')

    expect(mockOnSearch).not.toHaveBeenCalled()
  })
})
