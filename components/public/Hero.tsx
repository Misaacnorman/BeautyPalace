'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { useSettings } from '@/hooks/useSettings'

// Floating particle component
const FloatingParticle = ({ delay, duration, startX, startY }: { 
  delay: number; 
  duration: number; 
  startX: number; 
  startY: number 
}) => (
  <div
    className="absolute rounded-full opacity-0"
    style={{
      width: `${Math.random() * 6 + 3}px`,
      height: `${Math.random() * 6 + 3}px`,
      left: `${startX}%`,
      top: `${startY}%`,
      background: `radial-gradient(circle, rgba(255, 215, 0, ${Math.random() * 0.5 + 0.3}) 0%, transparent 70%)`,
      animation: `particle-float-${(delay % 3) + 1} ${duration}s ease-in-out infinite`,
      animationDelay: `${delay * 0.5}s`,
    }}
  />
)

export const Hero = () => {
  const { settings } = useSettings()
  const [mounted, setMounted] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; delay: number; duration: number; startX: number; startY: number }>>([])

  useEffect(() => {
    setMounted(true)
    // Generate random particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      delay: i,
      duration: Math.random() * 6 + 8,
      startX: Math.random() * 100,
      startY: Math.random() * 100,
    }))
    setParticles(newParticles)
  }, [])

  const heroBackground = settings?.accentColor
    ? `linear-gradient(135deg, ${settings.accentColor} 0%, #050505 55%, #000000 100%)`
    : (`var(--hero-bg)` as string)

  return (
    <section 
      className="relative py-24 md:py-40 overflow-hidden"
      style={{ 
        background: heroBackground,
        position: 'relative',
      }}
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-[600px] h-[600px] -top-48 -left-48 rounded-full opacity-20 animate-morph-bg"
          style={{
            background: `radial-gradient(circle, ${settings?.neutralColor || '#FFD700'} 0%, transparent 70%)`,
            filter: 'blur(60px)',
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] -bottom-32 -right-32 rounded-full opacity-15 animate-morph-bg"
          style={{
            background: `radial-gradient(circle, ${settings?.neutralColor || '#FFD700'} 0%, transparent 70%)`,
            filter: 'blur(80px)',
            animationDelay: '2s',
          }}
        />
        <div 
          className="absolute w-[300px] h-[300px] top-1/3 right-1/4 rounded-full opacity-10 animate-float"
          style={{
            background: `radial-gradient(circle, rgba(179, 0, 45, 0.5) 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* Floating particles */}
      {mounted && (
        <div className="particles-container">
          {particles.map((particle) => (
            <FloatingParticle key={particle.id} {...particle} />
          ))}
        </div>
      )}

      {/* Glittering gold overlay effect */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(circle at 20% 50%, ${settings?.neutralColor || '#FFD700'} 0%, transparent 50%),
                      radial-gradient(circle at 80% 50%, ${settings?.neutralColor || '#FFD700'} 0%, transparent 50%)`,
        }}
      />

      {/* Decorative lines */}
      <div className="absolute top-20 left-10 w-32 h-px bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent opacity-40 animate-pulse-glow" />
      <div className="absolute bottom-20 right-10 w-32 h-px bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent opacity-40 animate-pulse-glow" style={{ animationDelay: '1s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Animated badge */}
          <div 
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 glass ${mounted ? 'animate-fade-in-down' : 'opacity-0'}`}
            style={{ animationDelay: '0.2s' }}
          >
            <span className="w-2 h-2 rounded-full bg-[var(--link-color)] animate-pulse" />
            <span className="text-sm font-medium tracking-wider uppercase" style={{ color: 'var(--link-color)' }}>
              Premium Beauty Services
            </span>
          </div>

          <h1 
            className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-6 gold-gradient-text ${mounted ? 'animate-scale-in' : 'opacity-0'}`}
            style={{ animationDelay: '0.4s' }}
          >
            {settings?.heroHeadline || 'Transform Your Beauty'}
          </h1>
          
          <p 
            className={`text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ color: 'var(--text-color)', animationDelay: '0.6s' }}
          >
            {settings?.heroSubtext || 'Professional makeup and hair styling services for your special moments'}
          </p>
          
          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.8s' }}
          >
            <Link href="/booking">
              <Button size="lg" variant="primary">
                Book an Appointment
              </Button>
            </Link>
            <Link href="/gallery">
              <Button size="lg" variant="outline">
                View Gallery
              </Button>
            </Link>
          </div>

          {/* Scroll indicator */}
          <div 
            className={`mt-16 flex flex-col items-center ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '1.2s' }}
          >
            <span className="text-xs uppercase tracking-widest mb-3 opacity-60" style={{ color: 'var(--text-color)' }}>
              Scroll to explore
            </span>
            <div className="w-6 h-10 rounded-full border-2 border-[var(--border-color)] p-1 opacity-60">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--link-color)] animate-bounce mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

