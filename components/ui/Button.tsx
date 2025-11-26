'use client'

import React, { useState, useRef } from 'react'

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
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([])
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Create ripple effect
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const id = Date.now()
      
      setRipples(prev => [...prev, { x, y, id }])
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== id))
      }, 600)
    }
    
    props.onClick?.(e)
  }
  
  const baseStyles = `
    relative overflow-hidden font-semibold rounded-xl 
    transition-all duration-300 ease-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]
  `.trim()
  
  const variants = {
    primary: `
      bg-gradient-to-r from-[var(--primary-color)] via-[#d10037] to-[var(--primary-color)]
      bg-[length:200%_auto] hover:bg-right
      text-[var(--neutral-color)] 
      shadow-[0_4px_20px_rgba(179,0,45,0.4)]
      hover:shadow-[0_8px_30px_rgba(179,0,45,0.5),0_0_40px_rgba(179,0,45,0.2)]
      focus:ring-[var(--primary-color)]
    `,
    secondary: `
      bg-gradient-to-r from-[var(--accent-color)] via-[#1a1a1a] to-[var(--accent-color)]
      bg-[length:200%_auto] hover:bg-right
      text-white 
      shadow-lg hover:shadow-xl
      focus:ring-accent-500
    `,
    outline: `
      bg-transparent border-2 border-[var(--primary-color)]
      text-[var(--primary-color)]
      hover:bg-[var(--primary-color)]/10
      hover:border-[var(--hover-color)] hover:text-[var(--hover-color)]
      hover:shadow-[0_0_20px_rgba(255,223,127,0.2)]
      focus:ring-[var(--primary-color)]
    `,
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  }

  return (
    <button
      ref={buttonRef}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 animate-[ripple_0.6s_ease-out]"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
        />
      ))}
      
      {/* Shimmer overlay for primary button */}
      {variant === 'primary' && (
        <span className="absolute inset-0 overflow-hidden rounded-xl">
          <span 
            className="absolute inset-0 -translate-x-full animate-[shimmerSlide_3s_infinite]"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            }}
          />
        </span>
      )}
      
      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  )
}

