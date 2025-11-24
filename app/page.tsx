'use client'

import Link from 'next/link'
import { Hero } from '@/components/public/Hero'
import { ServiceCard } from '@/components/public/ServiceCard'
import { GalleryGrid } from '@/components/public/GalleryGrid'
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
    basePrice: 250,
  },
  {
    id: '2',
    name: 'Soft Glam',
    description: 'Natural, elegant makeup look perfect for everyday events and photoshoots.',
    basePrice: 120,
  },
  {
    id: '3',
    name: 'Photoshoot Makeup',
    description: 'Professional makeup designed for photography and videography sessions.',
    basePrice: 150,
  },
  {
    id: '4',
    name: 'Party Glam',
    description: 'Bold and glamorous makeup look for parties, events, and special occasions.',
    basePrice: 100,
  },
  {
    id: '5',
    name: 'Hair Styling',
    description: 'Professional hair styling services including updos, curls, and special occasion hairstyles.',
    basePrice: 80,
  },
]

export default function Home() {
  const { photos: featuredPhotos, loading: photosLoading } = useGallery(undefined, true)
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
            {services.slice(0, 3).map((service) => (
              <ServiceCard key={service.id} service={service} />
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 
              className="text-3xl md:text-4xl font-bold text-center mb-12"
              style={{ color: 'var(--heading-color)' }}
            >
              Featured Work
            </h2>
            <GalleryGrid photos={featuredPhotos.slice(0, 6)} loading={photosLoading} />
            <div className="text-center mt-8">
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

