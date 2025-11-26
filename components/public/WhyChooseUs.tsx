'use client'

import { useState, useEffect } from 'react'
import { GoldSparkles } from './GoldSparkles'

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: 'Premium Quality',
    description: 'Only the finest luxury products from top international brands to ensure flawless, long-lasting results.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Personalized Experience',
    description: 'Every look is customized to your unique features, style preferences, and the occasion.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'On-Time Service',
    description: 'We respect your schedule. Punctual arrival and efficient service for stress-free preparation.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    title: 'Expert Artistry',
    description: 'Years of experience and continuous training in the latest techniques and trends.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Photo-Ready Results',
    description: 'Looks designed to photograph beautifully and last through your entire special event.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Mobile Service',
    description: 'We come to you! Enjoy professional beauty services in the comfort of your chosen location.',
  },
]

export const WhyChooseUs: React.FC = () => {
  const [mounted, setMounted] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background effects */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(5, 5, 5, 0.9) 50%, rgba(0, 0, 0, 0.8) 100%)',
        }}
      />
      
      {/* Gold sparkle effects */}
      <GoldSparkles count={25} />
      
      {/* Decorative orbs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full opacity-10 animate-morph-bg"
        style={{
          background: 'radial-gradient(circle, #FFD700 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-10 animate-morph-bg"
        style={{
          background: 'radial-gradient(circle, #b3002d 0%, transparent 70%)',
          filter: 'blur(80px)',
          animationDelay: '2s',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span 
            className="inline-block text-xs uppercase tracking-[0.4em] mb-4 px-4 py-1.5 rounded-full"
            style={{ 
              color: 'var(--link-color)',
              background: 'rgba(255, 215, 0, 0.1)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
            }}
          >
            The BeautyPalace Difference
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gold-gradient-text">
            Why Choose Us
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--text-color)', opacity: 0.8 }}
          >
            Experience the perfect blend of artistry, luxury, and personalized care that makes every moment special
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`relative p-6 rounded-2xl transition-all duration-500 group ${
                mounted ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ 
                animationDelay: `${200 + index * 100}ms`,
                background: hoveredIndex === index 
                  ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 255, 255, 0.03) 100%)'
                  : 'rgba(255, 255, 255, 0.02)',
                border: '1px solid',
                borderColor: hoveredIndex === index 
                  ? 'rgba(212, 175, 55, 0.4)' 
                  : 'rgba(212, 175, 55, 0.1)',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Glow effect on hover */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 30px rgba(255, 215, 0, 0.1), 0 0 40px rgba(255, 215, 0, 0.05)',
                }}
              />

              {/* Icon */}
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.05) 100%)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  color: 'var(--link-color)',
                }}
              >
                {feature.icon}
              </div>

              {/* Content */}
              <h3 
                className="text-xl font-bold mb-3 transition-colors duration-300 group-hover:text-[var(--hover-color)]"
                style={{ color: 'var(--heading-color)' }}
              >
                {feature.title}
              </h3>
              <p 
                className="leading-relaxed"
                style={{ color: 'var(--text-color)', opacity: 0.85 }}
              >
                {feature.description}
              </p>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity">
                <div 
                  className="absolute top-0 right-0 w-full h-full"
                  style={{
                    background: 'linear-gradient(135deg, var(--border-color) 0%, transparent 60%)',
                    borderRadius: '0 16px 0 0',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
