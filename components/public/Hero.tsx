'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { useSettings } from '@/hooks/useSettings'

export const Hero = () => {
  const { settings } = useSettings()

  return (
    <section 
      className="relative py-20 md:py-32"
      style={{ 
        background: `linear-gradient(135deg, var(--hero-bg) 0%, ${settings?.accentColor || '#1a1a1a'} 50%, #000000 100%)`,
        position: 'relative',
      }}
    >
      {/* Glittering gold overlay effect */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(circle at 20% 50%, ${settings?.neutralColor || '#FFD700'} 0%, transparent 50%),
                      radial-gradient(circle at 80% 50%, ${settings?.neutralColor || '#FFD700'} 0%, transparent 50%)`,
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            style={{ color: 'var(--heading-color)' }}
          >
            {settings?.heroHeadline || 'Transform Your Beauty'}
          </h1>
          <p 
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
            style={{ color: 'var(--text-color)' }}
          >
            {settings?.heroSubtext || 'Professional makeup and hair styling services for your special moments'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        </div>
      </div>
    </section>
  )
}

