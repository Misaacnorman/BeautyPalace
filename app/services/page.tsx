'use client'

import { ServiceCard } from '@/components/public/ServiceCard'

// Mock services data
const services = [
  {
    id: '1',
    name: 'Bridal Makeup',
    description: 'Complete bridal makeup package for your special day. Includes trial session and touch-up kit. Perfect for weddings, ensuring you look stunning from ceremony to reception.',
    basePrice: 250,
  },
  {
    id: '2',
    name: 'Soft Glam',
    description: 'Natural, elegant makeup look perfect for everyday events and photoshoots. Achieves a polished appearance while maintaining a fresh, natural glow.',
    basePrice: 120,
  },
  {
    id: '3',
    name: 'Photoshoot Makeup',
    description: 'Professional makeup designed for photography and videography sessions. Camera-ready looks that enhance your features under studio lighting.',
    basePrice: 150,
  },
  {
    id: '4',
    name: 'Party Glam',
    description: 'Bold and glamorous makeup look for parties, events, and special occasions. Stand out with dramatic eyes, flawless skin, and long-lasting color.',
    basePrice: 100,
  },
  {
    id: '5',
    name: 'Hair Styling',
    description: 'Professional hair styling services including updos, curls, braids, and special occasion hairstyles. Perfect for weddings, parties, and photoshoots.',
    basePrice: 80,
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
            Services & Pricing
          </h1>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--text-color)' }}
          >
            Professional beauty services tailored to your needs. All prices are base rates and may vary based on specific requirements.
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

