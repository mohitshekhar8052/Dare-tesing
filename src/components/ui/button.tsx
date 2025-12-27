import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: string
  size?: string
  className?: string
}

export const Button = React.forwardRef<HTMLButtonElement, Props>(({ children, className = '', variant, size, ...rest }, ref) => {
  const base = 'inline-flex items-center gap-2 rounded-md px-3 py-1.5'
  return (
    <button ref={ref} className={`${base} ${className}`} {...rest}>
      {children}
    </button>
  )
})

Button.displayName = 'Button'
