'use client'

import { useEffect, useState, useMemo } from 'react'

interface Sparkle {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
  opacity: number
}

interface GoldSparklesProps {
  count?: number
  className?: string
}

export const GoldSparkles: React.FC<GoldSparklesProps> = ({ 
  count = 30,
  className = '',
}) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const sparkles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
      opacity: Math.random() * 0.6 + 0.4,
    }))
  }, [count])

  if (!mounted) return null

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute rounded-full animate-sparkle"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            background: `radial-gradient(circle, rgba(255, 215, 0, ${sparkle.opacity}) 0%, rgba(255, 215, 0, 0) 70%)`,
            boxShadow: `0 0 ${sparkle.size * 2}px rgba(255, 215, 0, ${sparkle.opacity * 0.5})`,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${sparkle.duration}s`,
          }}
        />
      ))}
      {/* Additional glitter effect lines */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`line-${i}`}
          className="absolute w-px h-8 opacity-20"
          style={{
            left: `${10 + i * 12}%`,
            top: `${Math.random() * 80}%`,
            background: 'linear-gradient(180deg, transparent, rgba(255, 215, 0, 0.8), transparent)',
            animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}
    </div>
  )
}
