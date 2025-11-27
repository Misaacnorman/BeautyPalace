'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSettings } from '@/hooks/useSettings'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { GoldSparkles } from '@/components/public/GoldSparkles'

const faqs = [
  {
    question: 'How far in advance should I book?',
    answer:
      'We recommend booking at least 2–4 weeks in advance, especially for bridal services. We still try to accommodate last-minute requests when possible.',
  },
  {
    question: 'Do you travel to locations?',
    answer:
      'Yes! We offer on-location glam for weddings, events, and photoshoots. Travel fees are shared upfront based on distance.',
  },
  {
    question: 'What products do you use?',
    answer:
      'We work with professional, hypoallergenic products that perform beautifully on camera and in person. Share any allergies and we tailor the kit.',
  },
  {
    question: 'Do you offer trial sessions?',
    answer:
      'Bridal trials are available after booking confirmation so we can dedicate a full session to customizing your look.',
  },
  {
    question: 'What is your cancellation policy?',
    answer:
      'Plans change! Please notify us at least 48 hours prior. Deposits ensure your date is secured and are applied toward final payment.',
  },
]

export default function ContactPage() {
  const { settings } = useSettings()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const channels = [
    settings?.WhatsAppNumber && {
      title: 'WhatsApp',
      value: settings.WhatsAppNumber,
      description: 'Fastest replies, voice notes, inspo references welcome.',
      action: () => {
        const sanitized = settings.WhatsAppNumber.replace(/\D/g, '')
        window.open(`https://wa.me/${sanitized}`, '_blank', 'noreferrer')
      },
    },
    settings?.phoneNumber && {
      title: 'Call',
      value: settings.phoneNumber,
      description: 'Prefer to talk it out? Give us a ring.',
      action: () => {
        window.location.href = `tel:${settings.phoneNumber}`
      },
    },
  ].filter(Boolean) as {
    title: string
    value: string
    description: string
    action: () => void
  }[]

  return (
    <div className="relative" style={{ backgroundColor: 'var(--section-bg)' }}>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 15% 20%, rgba(255, 215, 0, 0.18), transparent 50%), radial-gradient(circle at 85% 0%, rgba(179, 0, 45, 0.3), transparent 45%)',
          }}
        />
        <GoldSparkles count={38} className="opacity-70" />
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <span className="inline-block uppercase tracking-[0.5em] text-xs text-[var(--link-color)]">
            Let's connect
          </span>
          <h1 className="text-4xl md:text-5xl font-bold gold-gradient-text">We’re here for every detail</h1>
          <p className="text-lg md:text-xl" style={{ color: 'var(--text-color)', opacity: 0.85 }}>
            From availability checks to elaborate glam plans, message us anytime. We reply fast and guide you through
            booking in a single thread.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold">
            <div
              className="px-5 py-3 rounded-full border"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-color)' }}
            >
              Response time: under 12 hours
            </div>
            <div
              className="px-5 py-3 rounded-full border"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-color)' }}
            >
              Studio hours: 9am – 7pm (EAT)
            </div>
          </div>
        </div>
      </section>

      {/* Contact grid */}
      <section className="relative py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1.15fr,0.85fr]">
          <div className="space-y-8">
            <Card className="p-8 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.4em]" style={{ color: 'var(--link-color)' }}>
                  direct line
                </p>
                <h2 className="text-3xl font-bold" style={{ color: 'var(--heading-color)' }}>
                  Talk to us
                </h2>
                <p style={{ color: 'var(--text-color)', opacity: 0.75 }}>
                  Share dates, looks, or location and we’ll align the perfect glam plan.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {channels.length > 0 ? (
                  channels.map((channel) => (
                    <div
                      key={channel.title}
                      className="p-5 rounded-2xl border flex flex-col justify-between"
                      style={{
                        borderColor: 'var(--border-color)',
                        background: 'rgba(255, 255, 255, 0.02)',
                      }}
                    >
                      <div>
                        <p className="text-sm uppercase tracking-[0.3em]" style={{ color: 'var(--link-color)' }}>
                          {channel.title}
                        </p>
                        <p className="text-xl font-semibold" style={{ color: 'var(--heading-color)' }}>
                          {channel.value}
                        </p>
                        <p className="text-sm" style={{ color: 'var(--text-color)', opacity: 0.8 }}>
                          {channel.description}
                        </p>
                      </div>
                      <Button className="mt-4" size="sm" onClick={channel.action}>
                        Message now
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm" style={{ color: 'var(--text-color)' }}>
                    Contact details coming soon. In the meantime, use the booking form and we will respond via email.
                  </p>
                )}
              </div>
            </Card>

            <Card className="p-8 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.4em]" style={{ color: 'var(--link-color)' }}>
                  studio notes
                </p>
                <h3 className="text-2xl font-bold" style={{ color: 'var(--heading-color)' }}>
                  Location & presence
                </h3>
              </div>
              <div className="space-y-4">
                {settings?.location && (
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em]" style={{ color: 'var(--link-color)' }}>
                      operations base
                    </p>
                    <p className="text-lg font-semibold" style={{ color: 'var(--heading-color)' }}>
                      {settings.location}
                    </p>
                  </div>
                )}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--link-color)' }}>
                      Studio hours
                    </p>
                    <p className="text-base" style={{ color: 'var(--text-color)', opacity: 0.85 }}>
                      Monday – Sunday
                      <br />
                      09:00 – 19:00 (EAT)
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em]" style={{ color: 'var(--link-color)' }}>
                      Socials
                    </p>
                    <div className="flex gap-3">
                      {settings?.InstagramUrl && (
                        <a
                          href={settings.InstagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--link-color)] hover:text-[var(--hover-color)]"
                        >
                          Instagram
                        </a>
                      )}
                      {settings?.TikTokUrl && (
                        <a
                          href={settings.TikTokUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--link-color)] hover:text-[var(--hover-color)]"
                        >
                          TikTok
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-sm" style={{ color: 'var(--text-color)', opacity: 0.7 }}>
                  On-location glam is available globally. Travel and accommodation are quoted up front so there are zero
                  surprises.
                </p>
              </div>
            </Card>
          </div>

          <Card className="p-8 space-y-6 relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-60"
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(26,26,26,0.9) 60%)',
              }}
            />
            <GoldSparkles count={18} className="opacity-30" />
            <div className="relative z-10 space-y-6">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.5em]" style={{ color: 'var(--link-color)' }}>
                  Story & ethos
                </p>
                <h3 className="text-3xl font-bold" style={{ color: 'var(--heading-color)' }}>
                  About BeautyPalace
                </h3>
                <p style={{ color: 'var(--text-color)', opacity: 0.8 }}>
                  {settings?.bio ||
                    'Expert makeup artistry and hair craftsmanship for modern brides, campaign shoots, and luxury events. We design looks that read beautifully in person and on camera.'}
                </p>
              </div>
              <div className="rounded-2xl border p-5" style={{ borderColor: 'var(--border-color)' }}>
                <p className="text-sm uppercase tracking-[0.3em]" style={{ color: 'var(--link-color)' }}>
                  Ready to book?
                </p>
                <p className="text-lg font-semibold mb-3" style={{ color: 'var(--heading-color)' }}>
                  Head over to our booking page to reserve your date instantly.
                </p>
                <Link href="/booking" className="inline-block">
                  <Button size="sm">Book now</Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <Card className="p-8 md:p-10">
            <div className="text-center mb-8 space-y-3">
              <p className="text-xs uppercase tracking-[0.4em]" style={{ color: 'var(--link-color)' }}>
                FAQs
              </p>
              <h2 className="text-3xl font-bold" style={{ color: 'var(--heading-color)' }}>
                Need quick answers?
              </h2>
              <p className="text-base" style={{ color: 'var(--text-color)', opacity: 0.8 }}>
                Everything we’re asked most, from travel to timelines. Tap to expand any question.
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={faq.question} className="border-b border-[var(--border-color)]/40 last:border-0 pb-4 last:pb-0">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full text-left flex items-center justify-between font-semibold"
                    style={{ color: 'var(--heading-color)' }}
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
                    <p className="mt-3 text-sm" style={{ color: 'var(--text-color)', opacity: 0.8 }}>
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
