'use client'

import { Suspense } from 'react'
import { BookingForm } from '@/components/public/BookingForm'

// Mock services data
const services = [
  {
    id: '1',
    name: 'Bridal Makeup',
    description: 'Complete bridal makeup package',
  },
  {
    id: '2',
    name: 'Soft Glam',
    description: 'Natural, elegant makeup look',
  },
  {
    id: '3',
    name: 'Photoshoot Makeup',
    description: 'Professional makeup for photography',
  },
  {
    id: '4',
    name: 'Full Glam',
    description: 'High-impact glam for special events featuring bold eyes and luminous skin.',
  },
  {
    id: '5',
    name: 'Hair Styling',
    description: 'Professional hair styling services',
  },
  {
    id: '6',
    name: 'Nail Henna Art',
    description: 'Custom nail henna and mehndi artistry',
  },
  {
    id: '7',
    name: 'Luxe Lash Enhancements',
    description: 'Premium eyelash application and styling',
  },
]

export default function BookingPage() {
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
            Book an Appointment
          </h1>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--text-color)' }}
          >
            Fill out the form below to request an appointment. We'll contact you via WhatsApp or phone to confirm your booking.
          </p>
        </div>

        <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
          <BookingForm services={services} />
        </Suspense>
      </div>
    </div>
  )
}

