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
    if (!onClick) return
    const target = e.target as HTMLElement
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.tagName === 'SELECT' ||
      target.closest('input[type="color"]')
    ) {
      return
    }
    onClick(e)
  }
  
  const clickProps = onClick ? { onClick: handleClick } : {}
  
  return (
    <div
      className={`${baseStyles} ${interactiveStyles} ${className}`}
      style={{ 
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--border-color)',
        borderWidth: '1px',
        borderStyle: 'solid',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.55)',
      }}
      {...clickProps}
    >
      {children}
    </div>
  )
}

