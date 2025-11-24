import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  const baseStyles = 'rounded-lg shadow-md overflow-hidden'
  const interactiveStyles = onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''
  
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Don't trigger card onClick if clicking on form inputs (especially color pickers)
    const target = e.target as HTMLElement
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT' || target.closest('input[type="color"]')) {
      return
    }
    onClick?.(e)
  }
  
  return (
    <div
      className={`${baseStyles} ${interactiveStyles} ${className}`}
      style={{ 
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--border-color)',
        borderWidth: '1px',
        borderStyle: 'solid',
      }}
      onClick={handleClick}
    >
      {children}
    </div>
  )
}

