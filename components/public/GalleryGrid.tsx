'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Photo } from '@/lib/types'

interface GalleryGridProps {
  photos: Photo[]
  loading?: boolean
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({ photos, loading }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-2xl border border-[var(--border-color)] bg-gradient-to-br from-white/5 to-white/0 animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (photos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg" style={{ color: 'var(--text-color)' }}>
          No photos available yet.
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
            className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-[var(--border-color)] bg-black/30 shadow-[0_20px_45px_rgba(0,0,0,0.55)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(0,0,0,0.65)]"
            style={{ animation: `galleryFadeUp 0.8s ease forwards`, animationDelay: `${index * 60}ms` }}
            onClick={() => setSelectedPhoto(photo)}
          >
            <Image
              src={photo.imageUrl}
              alt={photo.caption || `${photo.category} look`}
              fill
              className="object-cover transition duration-700 ease-out hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90" />
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 text-xs font-semibold uppercase tracking-widest rounded-full bg-white/10 text-white border border-white/30">
                {photo.category || 'Editorial'}
              </span>
              {photo.isFeatured && (
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary-600 text-white">
                  Featured
                </span>
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-5 space-y-2 text-left">
              {photo.caption && (
                <p className="text-base font-semibold text-white drop-shadow-lg">{photo.caption}</p>
              )}
              {photo.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {photo.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-5xl w-full bg-black/60 border border-[var(--border-color)] rounded-3xl overflow-hidden">
            <button
              className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
              onClick={() => setSelectedPhoto(null)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative w-full h-[70vh]">
              <Image
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.caption || `${selectedPhoto.category} look`}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
            <div className="p-6 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-white/10 text-white border border-white/20">
                  {selectedPhoto.category || 'Editorial'}
                </span>
                {selectedPhoto.isFeatured && (
                  <span className="px-4 py-1 rounded-full text-xs font-semibold bg-primary-600 text-white">
                    Featured Highlight
                  </span>
                )}
              </div>
              {selectedPhoto.caption && (
                <p className="text-lg text-white/90">{selectedPhoto.caption}</p>
              )}
              {selectedPhoto.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedPhoto.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-sm rounded-full bg-white/10 text-white/80">
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

