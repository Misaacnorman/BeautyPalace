'use client'

import { useEffect } from 'react'
import { useSettings } from './useSettings'

export const useTheme = () => {
  const { settings } = useSettings()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Default palette matches globals.css
      const defaults = {
        primaryColor: '#b3002d',
        accentColor: '#050505',
        neutralColor: '#ffe9a3',
        footerColor: '#020202',
        borderColor: '#d4af37',
        hoverColor: '#ffdf7f',
        linkColor: '#ffe066',
      }

      const applyColors = (palette: typeof defaults) => {
        document.documentElement.style.setProperty('--primary-color', palette.primaryColor)
        document.documentElement.style.setProperty('--navbar-bg', palette.primaryColor)
        document.documentElement.style.setProperty('--button-bg', palette.primaryColor)

        document.documentElement.style.setProperty('--accent-color', palette.accentColor)
        document.documentElement.style.setProperty('--section-bg', palette.accentColor)
        document.documentElement.style.setProperty('--card-bg', palette === defaults ? 'var(--card-overlay)' : 'rgba(255,255,255,0.05)')
        document.documentElement.style.setProperty('--hero-bg', `linear-gradient(135deg, ${palette.accentColor} 0%, #020202 55%, #000000 100%)`)

        document.documentElement.style.setProperty('--neutral-color', palette.neutralColor)
        document.documentElement.style.setProperty('--text-color', palette.neutralColor)
        document.documentElement.style.setProperty('--heading-color', palette.neutralColor)

        document.documentElement.style.setProperty('--footer-bg', palette.footerColor)
        document.documentElement.style.setProperty('--border-color', palette.borderColor)
        document.documentElement.style.setProperty('--hover-color', palette.hoverColor)
        document.documentElement.style.setProperty('--link-color', palette.linkColor)
      }

      if (settings) {
        applyColors({
          primaryColor: settings.primaryColor || defaults.primaryColor,
          accentColor: settings.accentColor || defaults.accentColor,
          neutralColor: settings.neutralColor || defaults.neutralColor,
          footerColor: settings.footerColor || defaults.footerColor,
          borderColor: settings.borderColor || defaults.borderColor,
          hoverColor: settings.hoverColor || defaults.hoverColor,
          linkColor: settings.linkColor || defaults.linkColor,
        })
      } else {
        applyColors(defaults)
      }
    }
  }, [settings])
}

