'use client'

import { useState } from 'react'
import { useSettings } from '@/hooks/useSettings'
import { Card } from '@/components/ui/Card'

const faqs = [
  {
    question: 'How far in advance should I book?',
    answer: 'We recommend booking at least 2-4 weeks in advance, especially for bridal services. However, we do our best to accommodate last-minute requests when possible.',
  },
  {
    question: 'Do you travel to locations?',
    answer: 'Yes! We offer on-location services for weddings, events, and photoshoots. Travel fees may apply depending on the distance.',
  },
  {
    question: 'What products do you use?',
    answer: 'We use high-quality, professional-grade makeup products from trusted brands. All products are hypoallergenic and suitable for sensitive skin. If you have specific allergies, please let us know in advance.',
  },
  {
    question: 'Do you offer trial sessions?',
    answer: 'Yes, we offer trial sessions for bridal makeup. This allows you to see the look before your special day and make any adjustments. Trial sessions are included in our bridal package.',
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'We understand that plans can change. Please contact us at least 48 hours in advance to cancel or reschedule. Deposits may be required for certain services.',
  },
]

export default function ContactPage() {
  const { settings } = useSettings()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

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
            Contact & FAQ
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Bio & Contact Info */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">About</h2>
            {settings?.bio ? (
              <p className="text-neutral-700 mb-6 whitespace-pre-line">{settings.bio}</p>
            ) : (
              <p className="text-neutral-700 mb-6">
                Professional makeup artist and hair stylist with years of experience creating beautiful looks for weddings, events, and photoshoots. Specializing in bridal makeup, soft glam, and hair styling.
              </p>
            )}

            <div className="space-y-4">
              {settings?.location && (
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-1">Location</h3>
                  <p className="text-neutral-600">{settings.location}</p>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Get in Touch</h3>
                <div className="space-y-2">
                  {settings?.WhatsAppNumber && (
                    <a
                      href={`https://wa.me/${settings.WhatsAppNumber.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-primary-600 hover:text-primary-700 font-medium"
                    >
                      WhatsApp: {settings.WhatsAppNumber}
                    </a>
                  )}
                  {settings?.phoneNumber && (
                    <a
                      href={`tel:${settings.phoneNumber}`}
                      className="block text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Phone: {settings.phoneNumber}
                    </a>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Follow Us</h3>
                <div className="flex gap-4">
                  {settings?.InstagramUrl && (
                    <a
                      href={settings.InstagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700"
                    >
                      <span className="sr-only">Instagram</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  )}
                  {settings?.TikTokUrl && (
                    <a
                      href={settings.TikTokUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700"
                    >
                      <span className="sr-only">TikTok</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* FAQ */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-neutral-200 last:border-0 pb-4 last:pb-0">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full text-left flex items-center justify-between font-semibold text-neutral-900 hover:text-primary-600 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <svg
                      className={`w-5 h-5 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === index && (
                    <p className="mt-2 text-neutral-600">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

