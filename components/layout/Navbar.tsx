'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useSettings } from '@/hooks/useSettings'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { settings } = useSettings()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'py-2 shadow-[0_4px_30px_rgba(0,0,0,0.3)]' 
          : 'py-3'
      }`}
      style={{ 
        backgroundColor: scrolled ? 'rgba(179, 0, 45, 0.95)' : 'var(--navbar-bg)',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        color: '#ffffff',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <Link 
            href="/" 
            className="flex items-center gap-3 group"
          >
            {settings?.logoUrl ? (
              <div className="relative overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={settings.logoUrl}
                  alt={settings.siteName || 'Logo'}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
            ) : null}
            <span 
              className="text-2xl font-bold tracking-tight transition-all duration-300 group-hover:tracking-wide"
              style={{ 
                color: '#ffffff',
                fontFamily: "'Playfair Display', serif",
              }}
            >
              {settings?.siteName || 'BeautyPalace'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium transition-all duration-300 group"
                style={{ 
                  color: 'var(--link-color)',
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-[var(--hover-color)]">
                  {link.label}
                </span>
                {/* Hover underline effect */}
                <span 
                  className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[var(--link-color)] to-[var(--hover-color)] transition-all duration-300 group-hover:w-3/4 group-hover:left-[12.5%] rounded-full"
                />
                {/* Hover background glow */}
                <span 
                  className="absolute inset-0 rounded-lg bg-white/0 transition-all duration-300 group-hover:bg-white/5"
                />
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden relative p-2 rounded-lg transition-all duration-300 hover:bg-white/10"
            style={{ color: '#ffffff' }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span 
                className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${
                  isOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span 
                className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${
                  isOpen ? 'opacity-0 scale-0' : ''
                }`}
              />
              <span 
                className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${
                  isOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ 
          borderTop: isOpen ? '1px solid rgba(212, 175, 55, 0.2)' : 'none',
          background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.2))',
        }}
      >
        <div className="px-4 pt-3 pb-4 space-y-1">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:bg-white/10 hover:translate-x-2"
              style={{ 
                color: 'var(--link-color)',
                animationDelay: `${index * 50}ms`,
              }}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

