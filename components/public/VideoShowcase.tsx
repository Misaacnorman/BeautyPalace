'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { VideoPlayer } from './VideoPlayer'

interface Video {
  id: string
  url: string
  thumbnail: string
  title: string
  category: string
}

// Demo videos for showcase - these would normally come from a database
const showcaseVideos: Video[] = [
  {
    id: '1',
    url: '',
    thumbnail: '',
    title: 'Bridal Transformation',
    category: 'Bridal',
  },
  {
    id: '2',
    url: '',
    thumbnail: '',
    title: 'Soft Glam Tutorial',
    category: 'Soft Glam',
  },
  {
    id: '3',
    url: '',
    thumbnail: '',
    title: 'Behind the Scenes',
    category: 'BTS',
  },
]

interface VideoShowcaseProps {
  videos?: Video[]
}

export const VideoShowcase: React.FC<VideoShowcaseProps> = ({ videos = showcaseVideos }) => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // If no videos with URLs are provided, show a placeholder section
  const hasVideos = videos.some(v => v.url)

  if (!hasVideos) {
    return (
      <div className="relative py-16">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
            style={{
              background: 'radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <span 
            className="inline-block text-xs uppercase tracking-[0.4em] mb-4 px-4 py-1.5 rounded-full"
            style={{ 
              color: 'var(--link-color)',
              background: 'rgba(255, 215, 0, 0.1)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
            }}
          >
            Coming Soon
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gold-gradient-text">
            Video Showcase
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto mb-8"
            style={{ color: 'var(--text-color)', opacity: 0.8 }}
          >
            Watch transformations come to life. Our video gallery featuring tutorials, 
            behind-the-scenes content, and stunning makeovers is coming soon.
          </p>

          {/* Placeholder cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { title: 'Bridal Transformations', icon: '💒' },
              { title: 'Makeup Tutorials', icon: '✨' },
              { title: 'Behind the Scenes', icon: '🎬' },
            ].map((item, index) => (
              <div
                key={index}
                className="relative aspect-video rounded-2xl overflow-hidden group"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <span className="text-5xl mb-4 opacity-50 group-hover:opacity-80 transition-opacity duration-300">
                    {item.icon}
                  </span>
                  <h3 
                    className="text-lg font-semibold"
                    style={{ color: 'var(--heading-color)' }}
                  >
                    {item.title}
                  </h3>
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mt-4 opacity-50"
                    style={{
                      background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.1) 100%)',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                    }}
                  >
                    <svg className="w-6 h-6 text-[var(--link-color)] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 overflow-hidden">
                  <div 
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.05), transparent)',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span 
            className="inline-block text-xs uppercase tracking-[0.4em] mb-4 px-4 py-1.5 rounded-full"
            style={{ 
              color: 'var(--link-color)',
              background: 'rgba(255, 215, 0, 0.1)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
            }}
          >
            Watch & Discover
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gold-gradient-text">
            Video Showcase
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--text-color)', opacity: 0.8 }}
          >
            Experience the artistry in motion. Watch tutorials, transformations, and behind-the-scenes moments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.filter(v => v.url).map((video) => (
            <div
              key={video.id}
              className="relative aspect-video rounded-2xl overflow-hidden border border-[var(--border-color)] shadow-[0_20px_50px_rgba(0,0,0,0.5)] group cursor-pointer"
              onClick={() => setActiveVideo(video.id)}
            >
              {video.thumbnail ? (
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
                  }}
                />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.9) 0%, rgba(212, 175, 55, 0.9) 100%)',
                    boxShadow: '0 8px 32px rgba(255, 215, 0, 0.4)',
                  }}
                >
                  <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span 
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-2 bg-black/40 backdrop-blur-sm text-white border border-white/20"
                >
                  {video.category}
                </span>
                <h3 
                  className="text-lg font-semibold text-white"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95"
          onClick={() => setActiveVideo(null)}
        >
          <div 
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={() => setActiveVideo(null)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <VideoPlayer
              src={videos.find(v => v.id === activeVideo)?.url || ''}
              poster={videos.find(v => v.id === activeVideo)?.thumbnail}
              caption={videos.find(v => v.id === activeVideo)?.title}
              autoPlay
              className="aspect-video"
            />
          </div>
        </div>
      )}
    </div>
  )
}
