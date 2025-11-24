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
          <div key={i} className="aspect-square bg-neutral-200 animate-pulse rounded-lg" />
        ))}
      </div>
    )
  }

  if (photos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-500 text-lg">No photos available yet.</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="relative aspect-square cursor-pointer overflow-hidden rounded-lg group"
            onClick={() => setSelectedPhoto(photo)}
          >
            <Image
              src={photo.imageUrl}
              alt={photo.caption || 'Gallery image'}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {photo.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-white text-sm font-medium">{photo.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button
              className="absolute top-4 right-4 text-white hover:text-neutral-300 z-10"
              onClick={() => setSelectedPhoto(null)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative w-full h-[80vh]">
              <Image
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.caption || 'Gallery image'}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </div>
            {selectedPhoto.caption && (
              <p className="text-white text-center mt-4">{selectedPhoto.caption}</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

