'use client'

import { useEffect, useState } from 'react'
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

  useEffect(() => {
    if (!autoPlay || photos.length <= 1) return
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % photos.length)
    }, intervalMs)
    return () => clearInterval(interval)
  }, [autoPlay, intervalMs, photos.length])

  if (photos.length === 0) return null

  const current = photos[index]

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="relative h-[360px] md:h-[480px] rounded-[32px] overflow-hidden border border-[var(--border-color)] shadow-[0_25px_60px_rgba(0,0,0,0.55)]">
        <Image
          src={current.imageUrl}
          alt={current.caption || current.category}
          fill
          className="object-cover transition duration-700"
          sizes="90vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 gap-3 text-left">
          <span className="px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.3em] bg-white/15 text-white border border-white/30 w-max">
            {current.category}
          </span>
          {current.caption && (
            <h3 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
              {current.caption}
            </h3>
          )}
          {current.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {current.tags.map((tag) => (
                <span key={tag} className="text-xs uppercase tracking-wide text-white/80">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      {photos.length > 1 && (
        <div className="flex justify-center gap-3">
          {photos.map((photo, idx) => (
            <button
              key={photo.id}
              onClick={() => setIndex(idx)}
              className={`h-2.5 rounded-full transition-all ${
                idx === index ? 'bg-white w-12' : 'bg-white/30 w-6 hover:bg-white/60'
              }`}
              aria-label={`Jump to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

