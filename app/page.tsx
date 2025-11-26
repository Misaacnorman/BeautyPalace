'use client'

import Link from 'next/link'
import { Hero } from '@/components/public/Hero'
import { ServiceCard } from '@/components/public/ServiceCard'
import { FeaturedCarousel } from '@/components/public/FeaturedCarousel'
import { ReviewCard } from '@/components/public/ReviewCard'
import { Button } from '@/components/ui/Button'
import { useGallery } from '@/hooks/useGallery'
import { useReviews } from '@/hooks/useReviews'
import { Rating } from '@/components/ui/Rating'

// Mock services data
const services = [
  {
    id: '1',
    name: 'Bridal Makeup',
    description: 'Complete bridal makeup package for your special day. Includes trial session and touch-up kit.',
  },
  {
    id: '2',
    name: 'Soft Glam',
    description: 'Natural, elegant makeup look perfect for everyday events and photoshoots.',
  },
  {
    id: '3',
    name: 'Photoshoot Makeup',
    description: 'Professional makeup designed for photography and videography sessions.',
  },
  {
    id: '4',
    name: 'Full Glam',
    description: 'Statement glam for red carpet moments with bold eyes and luminous skin that lasts.',
  },
  {
    id: '5',
    name: 'Hair Styling',
    description: 'Professional hair styling services including updos, curls, and special occasion hairstyles.',
  },
  {
    id: '6',
    name: 'Nail Henna Art',
    description: 'Custom nail henna & mehndi designs that add intricate detail to bridal and festive looks.',
  },
  {
    id: '7',
    name: 'Luxe Lash Enhancements',
    description: 'Premium eyelash styling with customizable length and fullness for photo-ready eyes.',
  },
]

export default function Home() {
  const { photos: featuredPhotos, loading: photosLoading } = useGallery({ featured: true })
  const { reviews, averageRating } = useReviews(true)

  const featuredReviews = reviews.slice(0, 2)

  return (
    <div>
      <Hero />

      {/* Services Summary */}
      <section 
        className="py-16"
        style={{ backgroundColor: 'var(--section-bg)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            style={{ color: 'var(--heading-color)' }}
          >
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {services.slice(0, 3).map((service, index) => (
              <div
                key={service.id}
                className="opacity-0"
                style={{
                  animation: 'galleryFadeUp 0.9s ease forwards',
                  animationDelay: `${index * 120}ms`,
                }}
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/services">
              <Button variant="outline" size="lg">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Gallery */}
      {featuredPhotos.length > 0 && (
        <section 
          className="py-16"
          style={{ backgroundColor: 'var(--section-bg)' }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center space-y-4">
              <p className="text-sm uppercase tracking-[0.35em]" style={{ color: 'var(--link-color)' }}>
                spotlight looks
              </p>
              <h2 
                className="text-3xl md:text-4xl font-bold"
                style={{ color: 'var(--heading-color)' }}
              >
                Latest Transformations
              </h2>
              <p className="max-w-3xl mx-auto text-base" style={{ color: 'var(--text-color)' }}>
                A curated carousel of the week&apos;s most loved styles—tap through to feel the motion, then dive into the full gallery.
              </p>
            </div>
            {photosLoading ? (
              <div className="h-[360px] md:h-[480px] rounded-[32px] border border-[var(--border-color)] bg-gradient-to-r from-white/5 to-transparent animate-pulse" />
            ) : (
              <FeaturedCarousel photos={featuredPhotos.slice(0, 6)} />
            )}
            <div className="text-center">
              <Link href="/gallery">
                <Button variant="outline" size="lg">
                  View Full Gallery
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Reviews Highlight */}
      {featuredReviews.length > 0 && (
        <section 
          className="py-16"
          style={{ backgroundColor: 'var(--section-bg)' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                What Our Clients Say
              </h2>
              {averageRating > 0 && (
                <div className="flex items-center justify-center gap-2">
                  <Rating rating={Math.round(averageRating)} size="lg" />
                  <span className="text-2xl font-bold text-neutral-900">
                    {averageRating.toFixed(1)} / 5.0
                  </span>
                  <span className="text-neutral-600">
                    ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                  </span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {featuredReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
            <div className="text-center">
              <Link href="/reviews">
                <Button variant="outline" size="lg">
                  Read All Reviews
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

