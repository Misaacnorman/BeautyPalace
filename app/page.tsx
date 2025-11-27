'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Hero } from '@/components/public/Hero'
import { ServiceCard } from '@/components/public/ServiceCard'
import { FeaturedCarousel } from '@/components/public/FeaturedCarousel'
import { ReviewCard } from '@/components/public/ReviewCard'
import { Button } from '@/components/ui/Button'
import { useGallery } from '@/hooks/useGallery'
import { useReviews } from '@/hooks/useReviews'
import { Rating } from '@/components/ui/Rating'
import { WhyChooseUs } from '@/components/public/WhyChooseUs'
import { VideoShowcase } from '@/components/public/VideoShowcase'
import { GoldSparkles } from '@/components/public/GoldSparkles'

// Mock services data
const services = [
  {
    id: '1',
    name: 'Bridal Makeup',
    description: 'Complete bridal beauty journey with a trial scheduled after advance payment so every detail is perfected.',
  },
  {
    id: '2',
    name: 'Soft Glam',
    description: 'Natural, elegant makeup look perfect for everyday celebrations and intimate events.',
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
    description: 'Professional hair styling crafted for each occasion—bridal, cultural, editorial, or red carpet.',
  },
  {
    id: '6',
    name: 'Henna Artistry',
    description: 'Custom casual and bridal henna designs that honor tradition—nail henna not offered.',
  },
  {
    id: '7',
    name: 'Luxe Lash Enhancements',
    description: 'Premium eyelash styling with customizable length and fullness for photo-ready eyes.',
  },
]

// Section wrapper component for consistent animations
const AnimatedSection = ({ 
  children, 
  className = '',
  delay = 0,
}: { 
  children: React.ReactNode
  className?: string
  delay?: number
}) => {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])
  
  return (
    <section 
      className={`py-20 md:py-28 relative overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ backgroundColor: 'var(--section-bg)' }}
    >
      {children}
    </section>
  )
}

export default function Home() {
  const { photos: featuredPhotos, loading: photosLoading } = useGallery({ featured: true })
  const { reviews, averageRating } = useReviews(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const featuredReviews = reviews.slice(0, 2)

  return (
    <div className="relative">
      <Hero />

      {/* Services Summary */}
      <AnimatedSection delay={100}>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--border-color)]/30 to-transparent" />
        <div className="absolute -top-32 right-0 w-64 h-64 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #FFD700 0%, transparent 70%)' }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span 
              className="inline-block text-xs uppercase tracking-[0.4em] mb-4 px-4 py-1.5 rounded-full"
              style={{ 
                color: 'var(--link-color)',
                background: 'rgba(255, 215, 0, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
              }}
            >
              What We Offer
            </span>
            <h2 
              className="text-4xl md:text-5xl font-bold mb-4 gold-gradient-text"
            >
              Our Services
            </h2>
            <p 
              className="text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--text-color)', opacity: 0.8 }}
            >
              Premium beauty services tailored to make you feel extraordinary
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {services.slice(0, 3).map((service, index) => (
              <div
                key={service.id}
                className={`${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${200 + index * 150}ms` }}
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/services">
              <Button variant="outline" size="lg">
                <span>View All Services</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* Featured Gallery */}
      {featuredPhotos.length > 0 && (
        <AnimatedSection delay={200}>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--border-color)]/30 to-transparent" />
          <div className="absolute -bottom-32 left-0 w-64 h-64 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #b3002d 0%, transparent 70%)' }} />
          
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-4">
              <span 
                className="inline-block text-xs uppercase tracking-[0.4em] mb-2 px-4 py-1.5 rounded-full"
                style={{ 
                  color: 'var(--link-color)',
                  background: 'rgba(255, 215, 0, 0.1)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                }}
              >
                Spotlight Looks
              </span>
              <h2 
                className="text-4xl md:text-5xl font-bold gold-gradient-text"
              >
                Latest Transformations
              </h2>
              <p className="max-w-3xl mx-auto text-base leading-relaxed" style={{ color: 'var(--text-color)', opacity: 0.8 }}>
                A curated carousel of the week&apos;s most loved styles—tap through to feel the motion, then dive into the full gallery.
              </p>
            </div>
            
            {photosLoading ? (
              <div className="h-[400px] md:h-[540px] rounded-[32px] border border-[var(--border-color)] skeleton" />
            ) : (
              <FeaturedCarousel photos={featuredPhotos.slice(0, 6)} />
            )}
            
            <div className="text-center">
              <Link href="/gallery">
                <Button variant="outline" size="lg">
                  <span>View Full Gallery</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Video Showcase Section */}
      <AnimatedSection delay={250}>
        <GoldSparkles count={15} />
        <VideoShowcase />
      </AnimatedSection>

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Reviews Highlight */}
      {featuredReviews.length > 0 && (
        <AnimatedSection delay={300}>
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5" style={{ background: 'radial-gradient(circle, #FFD700 0%, transparent 70%)' }} />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span 
                className="inline-block text-xs uppercase tracking-[0.4em] mb-4 px-4 py-1.5 rounded-full"
                style={{ 
                  color: 'var(--link-color)',
                  background: 'rgba(255, 215, 0, 0.1)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                }}
              >
                Testimonials
              </span>
              <h2 className="text-4xl md:text-5xl font-bold gold-gradient-text mb-6">
                What Our Clients Say
              </h2>
              {averageRating > 0 && (
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <Rating rating={Math.round(averageRating)} size="lg" />
                  <div className="flex items-baseline gap-2">
                    <span 
                      className="text-4xl font-bold"
                      style={{ color: 'var(--heading-color)' }}
                    >
                      {averageRating.toFixed(1)}
                    </span>
                    <span style={{ color: 'var(--text-color)', opacity: 0.7 }}>
                      / 5.0 ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {featuredReviews.map((review, index) => (
                <div
                  key={review.id}
                  className={`${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${400 + index * 150}ms` }}
                >
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Link href="/reviews">
                <Button variant="outline" size="lg">
                  <span>Read All Reviews</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* CTA Section */}
      <AnimatedSection delay={400} className="relative">
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(179, 0, 45, 0.1) 0%, transparent 50%, rgba(255, 215, 0, 0.05) 100%)',
          }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gold-gradient-text">
            Ready to Transform Your Look?
          </h2>
          <p 
            className="text-lg mb-8 max-w-2xl mx-auto"
            style={{ color: 'var(--text-color)', opacity: 0.8 }}
          >
            Book your appointment today and let us help you discover your most beautiful self.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button size="lg" variant="primary">
                Book Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}

