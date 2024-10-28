import { forwardRef } from 'react'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, icon, ...props }, ref) => {
    return (
      <button {...props} ref={ref}>
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'

export { Button }
