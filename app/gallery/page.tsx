'use client'

import { useState, useMemo } from 'react'
import { GalleryGrid } from '@/components/public/GalleryGrid'
import { FeaturedCarousel } from '@/components/public/FeaturedCarousel'
import { useGallery } from '@/hooks/useGallery'
import { galleryCategories, toCategoryKey } from '@/lib/constants/gallery'

const categoryFilters = ['All', ...galleryCategories]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const { photos, loading } = useGallery()

  const featuredPhotos = useMemo(
    () => photos.filter((photo) => photo.isFeatured),
    [photos]
  )

  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'All') return photos
    const categoryKey = toCategoryKey(selectedCategory)
    return photos.filter((photo) => photo.categoryKey === categoryKey)
  }, [photos, selectedCategory])

  return (
    <div 
      className="min-h-screen py-12 space-y-16"
      style={{ backgroundColor: 'var(--section-bg)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <p className="text-sm uppercase tracking-[0.35em]" style={{ color: 'var(--link-color)' }}>
          curated gallery
        </p>
        <h1 className="text-4xl md:text-5xl font-bold gold-gradient-text">
          Immersive Beauty Stories
        </h1>
        <p 
          className="text-lg max-w-3xl mx-auto"
          style={{ color: 'var(--text-color)' }}
        >
          Dive into our evolving portfolio. Each look is meticulously captured to showcase texture, colour harmony,
          and the emotion behind every transformation.
        </p>
      </div>

      {featuredPhotos.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturedCarousel photos={featuredPhotos} />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-wrap justify-center gap-3">
          {categoryFilters.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-all ${
                selectedCategory === category
                  ? 'bg-[var(--primary-color)] text-white shadow-[0_10px_25px_rgba(179,0,45,0.35)]'
                  : 'bg-white/5 text-[var(--text-color)] hover:bg-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <GalleryGrid photos={filteredPhotos} loading={loading} />
      </div>
    </div>
  )
}
