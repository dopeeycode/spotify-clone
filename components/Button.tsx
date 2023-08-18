import { forwardRef } from "react"
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  children,
  disabled = false,
  type = "button",
  ...props
}, ref) => {
  return (
    <button 
      className={twMerge(`w-full rounded-full bg-green-500 border border-transparent px-3 py-3 disabled:cursor-not-allowed
      disabled:opacity-50 text-gray-200 font-bold hover:opacity-75 transition`, className)}
      ref={ref}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}) 

Button.displayName = "Button"

export default Button