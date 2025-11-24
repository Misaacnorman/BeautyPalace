import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const getVariantStyles = () => {
    if (variant === 'primary') {
      return {
        backgroundColor: 'var(--primary-color)',
        borderColor: 'var(--primary-color)',
      }
    }
    if (variant === 'outline') {
      return {
        borderColor: 'var(--primary-color)',
        color: 'var(--primary-color)',
      }
    }
    return {}
  }
  
  const variants = {
    primary: 'text-white hover:opacity-90 focus:ring-primary-500',
    secondary: 'bg-accent-500 text-white hover:bg-accent-600 focus:ring-accent-500',
    outline: 'border-2 bg-transparent focus:ring-primary-500',
  }
  
  const getHoverStyle = () => {
    if (variant === 'outline') {
      return {
        borderColor: 'var(--hover-color)',
        color: 'var(--hover-color)',
      }
    }
    return {}
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }
  
  const style = getVariantStyles()
  const hoverStyle = getHoverStyle()

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      style={Object.keys(style).length > 0 ? style : undefined}
      onMouseEnter={(e) => {
        if (variant === 'outline' && Object.keys(hoverStyle).length > 0) {
          Object.assign(e.currentTarget.style, hoverStyle)
        }
      }}
      onMouseLeave={(e) => {
        if (variant === 'outline') {
          e.currentTarget.style.borderColor = 'var(--primary-color)'
          e.currentTarget.style.color = 'var(--primary-color)'
        }
      }}
      {...props}
    >
      {children}
    </button>
  )
}

