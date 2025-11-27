'use client'

import React, { useState } from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  onClick,
}) => {
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setGlowPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setGlowPosition({ x: 50, y: 50 })
  }

  const baseStyles = 'rounded-2xl overflow-hidden transition-all duration-300 ease-out'
  const interactiveStyles = onClick ? 'cursor-pointer' : ''
  
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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${baseStyles} ${interactiveStyles} ${className} group`}
      style={{ 
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--border-color)',
        borderWidth: '1px',
        borderStyle: 'solid',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(212, 175, 55, 0.1)',
      }}
      {...clickProps}
    >
      {/* Glow effect on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(255, 215, 0, 0.1), transparent 40%)`,
        }}
      />
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
        <div 
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.05), transparent)',
          }}
        />
      </div>
      
      {/* Border glow on hover */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 20px rgba(255, 215, 0, 0.1), 0 0 30px rgba(255, 215, 0, 0.1)',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

