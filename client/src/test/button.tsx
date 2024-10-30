import { Button } from '@app/components/ui/button'
import { render, screen } from '@testing-library/react'

describe('[UI:Button]', () => {
  test('문자열 표현', () => {
    const characters = '안녕하세요'

    render(<Button>{characters}</Button>)

    const btn = screen.getByRole('button')
    expect(btn.textContent).toBe(characters)
  })
})
