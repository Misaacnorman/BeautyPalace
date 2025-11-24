'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useSettings } from '@/hooks/useSettings'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { settings } = useSettings()

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/services', label: 'Services' },
    { href: '/reviews', label: 'Reviews' },
    { href: '/booking', label: 'Book Now' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav 
      className="shadow-md sticky top-0 z-50"
      style={{ backgroundColor: 'var(--navbar-bg)', color: '#ffffff' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3">
            {settings?.logoUrl ? (
              <Image
                src={settings.logoUrl}
                alt={settings.siteName || 'Logo'}
                width={40}
                height={40}
                className="object-contain"
              />
            ) : null}
            <span 
              className="text-2xl font-bold"
              style={{ color: '#ffffff' }}
            >
              {settings?.siteName || 'BeautyPalace'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors font-medium"
                style={{ color: 'var(--link-color)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--hover-color)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--link-color)'}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md transition-opacity"
            style={{ color: '#ffffff' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div 
          className="md:hidden border-t"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium transition-colors"
                style={{ 
                  color: 'var(--link-color)',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--hover-color)'
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--link-color)'
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

