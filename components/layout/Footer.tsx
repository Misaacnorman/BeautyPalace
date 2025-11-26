'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSettings } from '@/hooks/useSettings'

export const Footer = () => {
  const { settings } = useSettings()

  return (
    <footer 
      className="text-white relative overflow-hidden"
      style={{ backgroundColor: 'var(--footer-bg)' }}
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-5"
          style={{
            background: 'radial-gradient(circle, #FFD700 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-5"
          style={{
            background: 'radial-gradient(circle, #b3002d 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      {/* Top decorative line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              {settings?.logoUrl && (
                <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[var(--border-color)]/30">
                  <Image
                    src={settings.logoUrl}
                    alt={settings.siteName || 'Logo'}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <h3 
                className="text-2xl font-bold gold-gradient-text"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {settings?.siteName || 'BeautyPalace'}
              </h3>
            </div>
            <p className="text-neutral-400 leading-relaxed">
              {settings?.tagline || 'Professional beauty and makeup services for your special moments'}
            </p>
            {/* Newsletter-like CTA */}
            <div className="pt-4">
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--link-color)' }}>
                Book your transformation
              </p>
              <Link 
                href="/booking" 
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, var(--primary-color), #d10037)',
                  color: 'var(--neutral-color)',
                  boxShadow: '0 4px 15px rgba(179, 0, 45, 0.4)',
                }}
              >
                Schedule Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-gradient-to-r from-[var(--border-color)] to-transparent" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/gallery', label: 'Gallery' },
                { href: '/services', label: 'Services' },
                { href: '/reviews', label: 'Reviews' },
                { href: '/booking', label: 'Book Now' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="inline-flex items-center gap-2 text-neutral-400 transition-all duration-300 hover:text-[var(--hover-color)] hover:translate-x-1 group"
                  >
                    <svg 
                      className="w-3 h-3 opacity-0 -ml-5 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-gradient-to-r from-[var(--border-color)] to-transparent" />
              Connect
            </h4>
            <div className="space-y-4" style={{ color: 'var(--text-color)', opacity: 0.8 }}>
              {settings?.location && (
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 text-[var(--link-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p>{settings.location}</p>
                </div>
              )}
              {settings?.WhatsAppNumber && (
                <a
                  href={`https://wa.me/${settings.WhatsAppNumber.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-all duration-300 hover:text-[var(--hover-color)] group"
                  style={{ color: 'var(--link-color)' }}
                >
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>{settings.WhatsAppNumber}</span>
                </a>
              )}
            </div>
            
            {/* Social links */}
            <div className="flex gap-4 mt-6">
              {settings?.InstagramUrl && (
                <a
                  href={settings.InstagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.05) 100%)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    color: 'var(--link-color)',
                  }}
                >
                  <span className="sr-only">Instagram</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}
              {settings?.TikTokUrl && (
                <a
                  href={settings.TikTokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.05) 100%)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    color: 'var(--link-color)',
                  }}
                >
                  <span className="sr-only">TikTok</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div 
          className="mt-12 pt-8 border-t text-center"
          style={{ 
            borderColor: 'rgba(212, 175, 55, 0.2)',
          }}
        >
          <p className="text-neutral-500 text-sm">
            &copy; {new Date().getFullYear()} {settings?.siteName || 'BeautyPalace'}. All rights reserved.
          </p>
          <p className="text-neutral-600 text-xs mt-2">
            Crafted with ✨ for beauty enthusiasts
          </p>
        </div>
      </div>
    </footer>
  )
}

