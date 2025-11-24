'use client'

import { useEffect } from 'react'
import { useSettings } from './useSettings'

export const useTheme = () => {
  const { settings } = useSettings()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Default colors (glittering gold and dark black)
      const defaults = {
        primaryColor: '#000000',
        accentColor: '#1a1a1a',
        neutralColor: '#FFD700',
        footerColor: '#000000',
        borderColor: '#FFD700',
        hoverColor: '#FFA500',
        linkColor: '#FFD700',
      }

      if (settings) {
        // Apply settings colors
        if (settings.primaryColor) {
          document.documentElement.style.setProperty('--primary-color', settings.primaryColor)
          document.documentElement.style.setProperty('--navbar-bg', settings.primaryColor)
          document.documentElement.style.setProperty('--button-bg', settings.primaryColor)
        }
        if (settings.accentColor) {
          document.documentElement.style.setProperty('--accent-color', settings.accentColor)
          document.documentElement.style.setProperty('--section-bg', settings.accentColor)
          document.documentElement.style.setProperty('--card-bg', settings.accentColor)
          document.documentElement.style.setProperty('--hero-bg', settings.accentColor)
        }
        if (settings.neutralColor) {
          document.documentElement.style.setProperty('--neutral-color', settings.neutralColor)
          document.documentElement.style.setProperty('--text-color', settings.neutralColor)
          document.documentElement.style.setProperty('--heading-color', settings.neutralColor)
        }
        if (settings.footerColor) {
          document.documentElement.style.setProperty('--footer-bg', settings.footerColor)
        }
        if (settings.borderColor) {
          document.documentElement.style.setProperty('--border-color', settings.borderColor)
        }
        if (settings.hoverColor) {
          document.documentElement.style.setProperty('--hover-color', settings.hoverColor)
        }
        if (settings.linkColor) {
          document.documentElement.style.setProperty('--link-color', settings.linkColor)
        }
      } else {
        // Apply defaults if no settings
        document.documentElement.style.setProperty('--primary-color', defaults.primaryColor)
        document.documentElement.style.setProperty('--navbar-bg', defaults.primaryColor)
        document.documentElement.style.setProperty('--button-bg', defaults.primaryColor)
        document.documentElement.style.setProperty('--accent-color', defaults.accentColor)
        document.documentElement.style.setProperty('--section-bg', defaults.accentColor)
        document.documentElement.style.setProperty('--card-bg', defaults.accentColor)
        document.documentElement.style.setProperty('--hero-bg', defaults.accentColor)
        document.documentElement.style.setProperty('--neutral-color', defaults.neutralColor)
        document.documentElement.style.setProperty('--text-color', defaults.neutralColor)
        document.documentElement.style.setProperty('--heading-color', defaults.neutralColor)
        document.documentElement.style.setProperty('--footer-bg', defaults.footerColor)
        document.documentElement.style.setProperty('--border-color', defaults.borderColor)
        document.documentElement.style.setProperty('--hover-color', defaults.hoverColor)
        document.documentElement.style.setProperty('--link-color', defaults.linkColor)
      }
    }
  }, [settings])
}

