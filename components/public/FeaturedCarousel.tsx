'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import { Photo } from '@/lib/types'

interface FeaturedCarouselProps {
  photos: Photo[]
  autoPlay?: boolean
  intervalMs?: number
  className?: string
}

export const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({
  photos,
  autoPlay = true,
  intervalMs = 5000,
  className = '',
}) => {
  const [index, setIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const goToSlide = useCallback((newIndex: number) => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setIndex(newIndex)
    setTimeout(() => setIsTransitioning(false), 700)
  }, [isTransitioning])

  const nextSlide = useCallback(() => {
    goToSlide((index + 1) % photos.length)
  }, [goToSlide, index, photos.length])

  const prevSlide = useCallback(() => {
    goToSlide((index - 1 + photos.length) % photos.length)
  }, [goToSlide, index, photos.length])

  useEffect(() => {
    if (!autoPlay || photos.length <= 1 || isPaused) return
    const interval = setInterval(nextSlide, intervalMs)
    return () => clearInterval(interval)
  }, [autoPlay, intervalMs, photos.length, isPaused, nextSlide])

  if (photos.length === 0) return null

  const current = photos[index]

  return (
    <div 
      className={`space-y-6 ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-[400px] md:h-[540px] rounded-[32px] overflow-hidden border border-[var(--border-color)] shadow-[0_30px_80px_rgba(0,0,0,0.6)] group">
        {/* Background blur effect */}
        <div className="absolute inset-0 scale-110">
          <Image
            src={current.imageUrl}
            alt=""
            fill
            className="object-cover blur-2xl opacity-30"
            sizes="90vw"
          />
        </div>
        
        {/* Main image with transition */}
        <div className="absolute inset-0">
          <Image
            src={current.imageUrl}
            alt={current.caption || current.category}
            fill
            className={`object-cover transition-all duration-700 ease-out ${isTransitioning ? 'scale-105 opacity-90' : 'scale-100 opacity-100'}`}
            sizes="90vw"
            priority
          />
        </div>
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 gap-4 text-left">
          <span 
            className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.3em] bg-white/10 backdrop-blur-sm text-white border border-white/20 w-max transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
            style={{ transitionDelay: '100ms' }}
          >
            {current.category}
          </span>
          {current.caption && (
            <h3 
              className={`text-3xl md:text-5xl font-bold text-white drop-shadow-lg transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
              style={{ 
                transitionDelay: '200ms',
                fontFamily: "'Playfair Display', serif",
              }}
            >
              {current.caption}
            </h3>
          )}
          {current.tags?.length > 0 && (
            <div 
              className={`flex flex-wrap gap-2 transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
              style={{ transitionDelay: '300ms' }}
            >
              {current.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="text-xs uppercase tracking-wide text-white/70 bg-white/5 px-3 py-1 rounded-full backdrop-blur-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Navigation arrows */}
        {photos.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/50 hover:scale-110 hover:text-white"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/50 hover:scale-110 hover:text-white"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Progress bar */}
        {photos.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
            <div 
              className="h-full bg-gradient-to-r from-[var(--border-color)] to-[var(--link-color)] transition-all duration-300"
              style={{ 
                width: `${((index + 1) / photos.length) * 100}%`,
              }}
            />
          </div>
        )}
      </div>

      {/* Thumbnail navigation */}
      {photos.length > 1 && (
        <div className="flex justify-center gap-3">
          {photos.map((photo, idx) => (
            <button
              key={photo.id}
              onClick={() => goToSlide(idx)}
              className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                idx === index 
                  ? 'w-16 h-12 ring-2 ring-[var(--border-color)] ring-offset-2 ring-offset-black scale-110' 
                  : 'w-12 h-10 opacity-50 hover:opacity-80 hover:scale-105'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            >
              <Image
                src={photo.imageUrl}
                alt=""
                fill
                className="object-cover"
                sizes="64px"
              />
              {idx === index && (
                <div className="absolute inset-0 border-2 border-white/30 rounded-lg" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

