'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Photo } from '@/lib/types'

interface GalleryGridProps {
  photos: Photo[]
  loading?: boolean
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({ photos, loading }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      // Handle both 'Escape' and 'Esc' for browser compatibility
      if (e.key === 'Escape' || e.key === 'Esc') setSelectedPhoto(null)
    }
    if (selectedPhoto) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [selectedPhoto])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[4/5] rounded-3xl border border-[var(--border-color)] skeleton"
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>
    )
  }

  if (photos.length === 0) {
    return (
      <div className="text-center py-16">
        <div 
          className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.05) 100%)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
          }}
        >
          <svg className="w-10 h-10 text-[var(--link-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-lg font-medium" style={{ color: 'var(--heading-color)' }}>
          No photos available yet
        </p>
        <p className="text-sm mt-2" style={{ color: 'var(--text-color)', opacity: 0.7 }}>
          Check back soon for beautiful transformations
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            className={`relative aspect-[4/5] overflow-hidden rounded-3xl border border-[var(--border-color)] bg-black/30 shadow-[0_20px_45px_rgba(0,0,0,0.55)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_35px_70px_rgba(0,0,0,0.65)] hover:border-[var(--link-color)]/50 group ${mounted ? '' : 'opacity-0'}`}
            style={{ 
              animation: mounted ? `galleryFadeUp 0.8s ease forwards` : 'none', 
              animationDelay: `${index * 80}ms`,
              opacity: mounted ? undefined : 0,
            }}
            onClick={() => setSelectedPhoto(photo)}
          >
            <Image
              src={photo.imageUrl}
              alt={photo.caption || `${photo.category} look`}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
            
            {/* Shine effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div 
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                }}
              />
            </div>
            
            {/* Top badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
              <span className="px-3 py-1.5 text-xs font-semibold uppercase tracking-widest rounded-full bg-black/40 backdrop-blur-sm text-white border border-white/20 transition-all duration-300 group-hover:bg-black/60">
                {photo.category || 'Editorial'}
              </span>
              {photo.isFeatured && (
                <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-[var(--primary-color)] to-[#d10037] text-white shadow-lg">
                  ✨ Featured
                </span>
              )}
            </div>
            
            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 p-5 space-y-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              {photo.caption && (
                <p className="text-base font-semibold text-white drop-shadow-lg" style={{ 
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {photo.caption}
                </p>
              )}
              {photo.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {photo.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80 backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                  {photo.tags.length > 3 && (
                    <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80 backdrop-blur-sm">
                      +{photo.tags.length - 3}
                    </span>
                  )}
                </div>
              )}
              
              {/* View indicator */}
              <div className="flex items-center gap-2 text-white/60 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Click to view
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Enhanced Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in-up"
          style={{ animationDuration: '0.3s' }}
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative max-w-5xl w-full bg-black/60 border border-[var(--border-color)] rounded-3xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white/80 hover:text-white hover:bg-black/70 z-20 flex items-center justify-center transition-all duration-300 hover:scale-110"
              onClick={() => setSelectedPhoto(null)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Image container */}
            <div className="relative w-full h-[60vh] md:h-[70vh]">
              <Image
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.caption || `${selectedPhoto.category} look`}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
            
            {/* Info panel */}
            <div className="p-6 md:p-8 space-y-4 border-t border-[var(--border-color)]/30">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-white/10 text-white border border-white/20 backdrop-blur-sm">
                  {selectedPhoto.category || 'Editorial'}
                </span>
                {selectedPhoto.isFeatured && (
                  <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-[var(--primary-color)] to-[#d10037] text-white">
                    ✨ Featured Highlight
                  </span>
                )}
              </div>
              {selectedPhoto.caption && (
                <p 
                  className="text-xl md:text-2xl font-semibold"
                  style={{ color: 'var(--heading-color)', fontFamily: "'Playfair Display', serif" }}
                >
                  {selectedPhoto.caption}
                </p>
              )}
              {selectedPhoto.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedPhoto.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-3 py-1.5 text-sm rounded-full bg-white/5 border border-[var(--border-color)]/30"
                      style={{ color: 'var(--link-color)' }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

