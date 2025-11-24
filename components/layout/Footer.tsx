'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSettings } from '@/hooks/useSettings'

export const Footer = () => {
  const { settings } = useSettings()

  return (
    <footer 
      className="text-white"
      style={{ backgroundColor: 'var(--footer-bg)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              {settings?.logoUrl && (
                <Image
                  src={settings.logoUrl}
                  alt={settings.siteName || 'Logo'}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              )}
              <h3 className="text-2xl font-bold">{settings?.siteName || 'BeautyPalace'}</h3>
            </div>
            <p className="text-neutral-400">{settings?.tagline || 'Professional beauty and makeup services'}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/gallery" 
                  className="transition-colors"
                  style={{ color: 'var(--link-color)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--hover-color)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--link-color)'}
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link 
                  href="/services" 
                  className="transition-colors"
                  style={{ color: 'var(--link-color)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--hover-color)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--link-color)'}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link 
                  href="/reviews" 
                  className="transition-colors"
                  style={{ color: 'var(--link-color)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--hover-color)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--link-color)'}
                >
                  Reviews
                </Link>
              </li>
              <li>
                <Link 
                  href="/booking" 
                  className="transition-colors"
                  style={{ color: 'var(--link-color)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--hover-color)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--link-color)'}
                >
                  Book Now
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="transition-colors"
                  style={{ color: 'var(--link-color)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--hover-color)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--link-color)'}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="space-y-2" style={{ color: 'var(--text-color)', opacity: 0.8 }}>
              {settings?.location && (
                <p>{settings.location}</p>
              )}
              {settings?.WhatsAppNumber && (
                <a
                  href={`https://wa.me/${settings.WhatsAppNumber.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-colors"
                  style={{ color: 'var(--link-color)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--hover-color)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--link-color)'}
                >
                  WhatsApp: {settings.WhatsAppNumber}
                </a>
              )}
            </div>
            <div className="flex space-x-4 mt-4">
              {settings?.InstagramUrl && (
                <a
                  href={settings.InstagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  style={{ color: 'var(--link-color)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--hover-color)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--link-color)'}
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
                  className="transition-colors"
                  style={{ color: 'var(--link-color)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--hover-color)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--link-color)'}
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
        <div 
          className="mt-8 pt-8 border-t text-center"
          style={{ 
            borderColor: 'var(--border-color)',
            color: 'var(--text-color)',
            opacity: 0.7
          }}
        >
          <p>&copy; {new Date().getFullYear()} {settings?.siteName || 'BeautyPalace'}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

