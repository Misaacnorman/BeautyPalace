'use client'

import { ServiceCard } from '@/components/public/ServiceCard'

// Mock services data
const services = [
  {
    id: '1',
    name: 'Bridal Makeup',
    description: 'Complete bridal makeup package for your special day. Includes trial session and touch-up kit. Perfect for weddings, ensuring you look stunning from ceremony to reception.',
  },
  {
    id: '2',
    name: 'Soft Glam',
    description: 'Natural, elegant makeup look perfect for everyday events and photoshoots. Achieves a polished appearance while maintaining a fresh, natural glow.',
  },
  {
    id: '3',
    name: 'Photoshoot Makeup',
    description: 'Professional makeup designed for photography and videography sessions. Camera-ready looks that enhance your features under studio lighting.',
  },
  {
    id: '4',
    name: 'Full Glam',
    description: 'High-impact glam for luxurious events featuring dramatic eyes, flawless skin, and photo-ready finishes that keep you glowing all night.',
  },
  {
    id: '5',
    name: 'Hair Styling',
    description: 'Professional hair styling services including updos, curls, braids, and special occasion hairstyles. Perfect for weddings, parties, and photoshoots.',
  },
  {
    id: '6',
    name: 'Nail Henna Art',
    description: 'Intricate nail henna and mehndi artistry tailored to your event theme, with custom patterns that elevate bridal and festive looks.',
  },
  {
    id: '7',
    name: 'Luxe Lash Enhancements',
    description: 'Premium eyelash application featuring customizable lengths and fullness for photo-ready eyes that last through every celebration.',
  },
]

export default function ServicesPage() {
  return (
    <div 
      className="min-h-screen py-12"
      style={{ backgroundColor: 'var(--section-bg)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'var(--heading-color)' }}
          >
            Signature Services
          </h1>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--text-color)' }}
          >
            Professional beauty experiences tailored to your needs. Explore our curated offerings and reach out for bespoke packages and availability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-neutral-600 mb-4">
            Have questions about our services or need a custom package?
          </p>
          <a
            href="/contact"
            className="text-primary-600 hover:text-primary-700 font-medium underline"
          >
            Contact us for more information
          </a>
        </div>
      </div>
    </div>
  )
}

