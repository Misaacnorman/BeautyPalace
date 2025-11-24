'use client'

import { useState } from 'react'
import { GalleryGrid } from '@/components/public/GalleryGrid'
import { useGallery } from '@/hooks/useGallery'

const tags = ['All', 'Bridal', 'Soft Glam', 'Natural', 'Bold', 'Hair']

export default function GalleryPage() {
  const [selectedTag, setSelectedTag] = useState<string>('All')
  const { photos, loading } = useGallery(selectedTag === 'All' ? undefined : selectedTag)

  return (
    <div 
      className="min-h-screen py-12"
      style={{ backgroundColor: 'var(--section-bg)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 
          className="text-4xl md:text-5xl font-bold text-center mb-4"
          style={{ color: 'var(--heading-color)' }}
        >
          Gallery
        </h1>
        <p 
          className="text-center mb-12 max-w-2xl mx-auto"
          style={{ color: 'var(--text-color)' }}
        >
          Explore our portfolio of beautiful makeup and hair styling work
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedTag === tag
                  ? 'text-white'
                  : 'hover:bg-opacity-20'
              }`}
              style={{
                backgroundColor: selectedTag === tag ? 'var(--primary-color)' : 'var(--card-bg)',
                color: selectedTag === tag ? '#ffffff' : 'var(--text-color)',
              }}
              onMouseEnter={(e) => {
                if (selectedTag !== tag) {
                  e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.1)'
                }
              }}
              onMouseLeave={(e) => {
                if (selectedTag !== tag) {
                  e.currentTarget.style.backgroundColor = 'var(--card-bg)'
                }
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        <GalleryGrid photos={photos} loading={loading} />
      </div>
    </div>
  )
}

