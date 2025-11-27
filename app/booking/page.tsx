'use client'

import { Suspense } from 'react'
import { BookingForm } from '@/components/public/BookingForm'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GoldSparkles } from '@/components/public/GoldSparkles'
import { useSettings } from '@/hooks/useSettings'

// Mock services data
const services = [
  {
    id: '1',
    name: 'Bridal Makeup',
    description: 'Complete bridal beauty journey with a trial scheduled once advance payment is confirmed.',
  },
  {
    id: '2',
    name: 'Soft Glam',
    description: 'Natural, elegant makeup look perfect for everyday celebrations and intimate events.',
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
    description: 'Professional hair styling tailored to each occasion—bridal, cultural, editorial, or red carpet.',
  },
  {
    id: '6',
    name: 'Henna Artistry',
    description: 'Custom casual and bridal henna designs tailored to your story.',
  },
  {
    id: '7',
    name: 'Luxe Lash Enhancements',
    description: 'Premium eyelash application and styling',
  },
]

const bookingHighlights = [
  { label: 'Response Time', value: '< 12 hours' },
  { label: 'Travel Ready', value: 'Worldwide' },
  { label: 'Secure Booking', value: 'Advance payment, digital contract' },
]

const bookingProcess = [
  {
    title: 'Share your vision',
    description: 'Tell us about your event, preferred services, and any inspiration you have in mind.',
  },
  {
    title: 'Confirm availability',
    description: 'We respond with availability, tailored packages, and travel details where needed.',
  },
  {
    title: 'Secure your date',
    description: 'Reserve with a confirmed advance payment. Bridal trials are scheduled after booking.',
  },
  {
    title: 'Show up & glow',
    description: 'We arrive fully equipped for flawless glam with touch-ups until you are photo ready.',
  },
]

export default function BookingPage() {
  const { settings } = useSettings()

  return (
    <div className="relative" style={{ backgroundColor: 'var(--section-bg)' }}>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 10% 20%, rgba(255, 215, 0, 0.15), transparent 50%), radial-gradient(circle at 80% 0%, rgba(179, 0, 45, 0.25), transparent 45%)',
          }}
        />
        <GoldSparkles count={45} className="opacity-70" />
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <span className="inline-block uppercase tracking-[0.5em] text-xs text-[var(--link-color)]">
            Book Now
          </span>
          <h1 className="text-4xl md:text-5xl font-bold gold-gradient-text">
            Reserve your glam experience
          </h1>
          <p className="text-lg md:text-xl" style={{ color: 'var(--text-color)', opacity: 0.85 }}>
            Tell us when and where you need us—we craft the look, travel to you, and stay until every detail sparkles.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold">
            {bookingHighlights.map((item) => (
              <div
                key={item.label}
                className="px-5 py-3 rounded-full border"
                style={{
                  borderColor: 'var(--border-color)',
                  background: 'rgba(255, 255, 255, 0.02)',
                  color: 'var(--text-color)',
                }}
              >
                <span className="block text-[0.85rem] uppercase tracking-[0.3em] opacity-75">
                  {item.label}
                </span>
                <span className="text-base font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking form + content */}
      <section className="relative py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[0.95fr,1.05fr]">
          <div className="space-y-8">
            <Card className="p-8 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.4em]" style={{ color: 'var(--link-color)' }}>
                  curated menu
                </p>
                <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--heading-color)' }}>
                  Choose your experience
                </h2>
                <p style={{ color: 'var(--text-color)', opacity: 0.75 }}>
                  Combine services to create a signature package. We’ll confirm timing and team members after you send the request.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="p-4 rounded-2xl border h-full"
                    style={{
                      borderColor: 'var(--border-color)',
                      background: 'rgba(255, 255, 255, 0.02)',
                    }}
                  >
                    <p className="font-semibold mb-1" style={{ color: 'var(--heading-color)' }}>
                      {service.name}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--text-color)', opacity: 0.8 }}>
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-8 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.4em]" style={{ color: 'var(--link-color)' }}>
                  how it works
                </p>
                <h3 className="text-2xl font-bold" style={{ color: 'var(--heading-color)' }}>
                  Booking journey
                </h3>
              </div>
              <div className="space-y-5">
                {bookingProcess.map((step, index) => (
                  <div key={step.title} className="flex gap-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-semibold"
                      style={{
                        background: 'rgba(255, 215, 0, 0.09)',
                        border: '1px solid rgba(255, 215, 0, 0.25)',
                        color: 'var(--link-color)',
                      }}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold" style={{ color: 'var(--heading-color)' }}>
                        {step.title}
                      </p>
                      <p className="text-sm" style={{ color: 'var(--text-color)', opacity: 0.8 }}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-7 space-y-4 border border-[var(--border-color)]/40">
              <h3 className="text-xl font-semibold" style={{ color: 'var(--heading-color)' }}>
                Prefer to speak first?
              </h3>
              <p style={{ color: 'var(--text-color)', opacity: 0.85 }}>
                {settings?.WhatsAppNumber
                  ? 'Send us a quick WhatsApp message with your event date and we’ll respond with availability right away.'
                  : 'Reach out via our contact page and we’ll guide you through the booking process.'}
              </p>
              {settings?.WhatsAppNumber ? (
                <Button
                  className="w-full sm:w-auto"
                  type="button"
                  onClick={() => {
                    const sanitized = settings.WhatsAppNumber?.replace(/\D/g, '')
                    if (sanitized) {
                      window.open(`https://wa.me/${sanitized}`, '_blank', 'noreferrer')
                    }
                  }}
                >
                  WhatsApp Us
                </Button>
              ) : (
                <Button
                  className="w-full sm:w-auto"
                  type="button"
                  onClick={() => {
                    window.location.href = '/contact'
                  }}
                >
                  Contact us
                </Button>
              )}
            </Card>
          </div>

          <Card className="p-2 sm:p-3 lg:p-4 relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-60"
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(26,26,26,0.9) 60%)',
              }}
            />
            <GoldSparkles count={20} className="opacity-30" />
            <div className="relative z-10 p-6 sm:p-10 space-y-6">
              <div className="space-y-3 text-center">
                <p className="text-xs uppercase tracking-[0.5em]" style={{ color: 'var(--link-color)' }}>
                  booking form
                </p>
                <h3 className="text-3xl font-bold" style={{ color: 'var(--heading-color)' }}>
                  Tell us about your event
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-color)', opacity: 0.8 }}>
                  Complete the form and our team will follow up via WhatsApp or phone within 12 hours.
                </p>
              </div>
              <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
                <BookingForm services={services} />
              </Suspense>
              <p className="text-xs text-center" style={{ color: 'var(--text-color)', opacity: 0.6 }}>
                By booking you agree to our cancellation policy and understand that dates are only confirmed once the advance payment is received.
              </p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}

