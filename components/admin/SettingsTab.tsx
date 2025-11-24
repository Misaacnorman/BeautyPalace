'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useSettings } from '@/hooks/useSettings'
import { uploadImage } from '@/lib/firebase/storage'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'

// Glittering gold and dark black theme defaults
const defaultColors = {
  primaryColor: '#000000', // Dark black - Navigation
  accentColor: '#1a1a1a', // Very dark gray - Backgrounds
  neutralColor: '#FFD700', // Glittering gold - Text
  footerColor: '#000000', // Dark black - Footer
  borderColor: '#FFD700', // Glittering gold - Borders
  hoverColor: '#FFA500', // Bright gold - Hover states
  linkColor: '#FFD700', // Glittering gold - Links
}

export const SettingsTab = () => {
  const { settings, loading, update } = useSettings()
  const [formData, setFormData] = useState({
    siteName: '',
    tagline: '',
    logoUrl: '',
    primaryColor: defaultColors.primaryColor,
    accentColor: defaultColors.accentColor,
    neutralColor: defaultColors.neutralColor,
    footerColor: defaultColors.footerColor,
    borderColor: defaultColors.borderColor,
    hoverColor: defaultColors.hoverColor,
    linkColor: defaultColors.linkColor,
    heroHeadline: '',
    heroSubtext: '',
    WhatsAppNumber: '',
    phoneNumber: '',
    InstagramUrl: '',
    TikTokUrl: '',
    location: '',
    bio: '',
  })
  const [saving, setSaving] = useState(false)
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [originalColors, setOriginalColors] = useState(defaultColors)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (settings) {
      const colors = {
        primaryColor: settings.primaryColor || defaultColors.primaryColor,
        accentColor: settings.accentColor || defaultColors.accentColor,
        neutralColor: settings.neutralColor || defaultColors.neutralColor,
        footerColor: settings.footerColor || defaultColors.footerColor,
        borderColor: settings.borderColor || defaultColors.borderColor,
        hoverColor: settings.hoverColor || defaultColors.hoverColor,
        linkColor: settings.linkColor || defaultColors.linkColor,
      }
      setFormData({
        siteName: settings.siteName || '',
        tagline: settings.tagline || '',
        logoUrl: settings.logoUrl || '',
        ...colors,
        heroHeadline: settings.heroHeadline || '',
        heroSubtext: settings.heroSubtext || '',
        WhatsAppNumber: settings.WhatsAppNumber || '',
        phoneNumber: settings.phoneNumber || '',
        InstagramUrl: settings.InstagramUrl || '',
        TikTokUrl: settings.TikTokUrl || '',
        location: settings.location || '',
        bio: settings.bio || '',
      })
      setOriginalColors(colors)
      // Apply saved colors on load
      if (typeof window !== 'undefined') {
        Object.keys(colors).forEach((key) => {
          updateColorPreview(key, colors[key as keyof typeof colors])
        })
      }
    } else {
      // No settings yet, apply defaults
      if (typeof window !== 'undefined') {
        Object.keys(defaultColors).forEach((key) => {
          updateColorPreview(key, defaultColors[key as keyof typeof defaultColors])
        })
      }
    }
  }, [settings])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Real-time color preview (only for color fields)
    if (name === 'primaryColor' || name === 'accentColor' || name === 'neutralColor' || 
        name === 'footerColor' || name === 'borderColor' || name === 'hoverColor' || name === 'linkColor') {
      updateColorPreview(name, value)
    }
  }

  const handleColorInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation()
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    updateColorPreview(name, value)
  }

  const updateColorPreview = (name: string, value: string) => {
    if (typeof window !== 'undefined') {
      if (name === 'primaryColor') {
        document.documentElement.style.setProperty('--primary-color', value)
        document.documentElement.style.setProperty('--navbar-bg', value)
        document.documentElement.style.setProperty('--button-bg', value)
      } else if (name === 'accentColor') {
        document.documentElement.style.setProperty('--accent-color', value)
        document.documentElement.style.setProperty('--section-bg', value)
        document.documentElement.style.setProperty('--card-bg', value)
        document.documentElement.style.setProperty('--hero-bg', value)
      } else if (name === 'neutralColor') {
        document.documentElement.style.setProperty('--neutral-color', value)
        document.documentElement.style.setProperty('--text-color', value)
        document.documentElement.style.setProperty('--heading-color', value)
      } else if (name === 'footerColor') {
        document.documentElement.style.setProperty('--footer-bg', value)
      } else if (name === 'borderColor') {
        document.documentElement.style.setProperty('--border-color', value)
      } else if (name === 'hoverColor') {
        document.documentElement.style.setProperty('--hover-color', value)
      } else if (name === 'linkColor') {
        document.documentElement.style.setProperty('--link-color', value)
      }
    }
  }

  const restoreDefaults = () => {
    setFormData(prev => ({
      ...prev,
      ...defaultColors,
    }))
    setOriginalColors(defaultColors)
    // Apply defaults immediately
    if (typeof window !== 'undefined') {
      Object.keys(defaultColors).forEach((key) => {
        updateColorPreview(key, defaultColors[key as keyof typeof defaultColors])
      })
    }
    setMessage({ type: 'success', text: 'Default colors restored! Click "Save Settings" to apply permanently.' })
  }

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Please upload an image file' })
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'Image size must be less than 5MB' })
      return
    }

    setUploadingLogo(true)
    setMessage(null)

    try {
      const path = `logos/${Date.now()}_${file.name}`
      const imageUrl = await uploadImage(file, path)
      setFormData(prev => ({ ...prev, logoUrl: imageUrl }))
      setMessage({ type: 'success', text: 'Logo uploaded successfully!' })
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to upload logo. Please try again.' })
    } finally {
      setUploadingLogo(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    const result = await update(formData)
    setSaving(false)

    if (result.success) {
      setMessage({ type: 'success', text: 'Settings saved successfully!' })
      // Update original colors to match saved values
      setOriginalColors({
        primaryColor: formData.primaryColor,
        accentColor: formData.accentColor,
        neutralColor: formData.neutralColor,
        footerColor: formData.footerColor,
        borderColor: formData.borderColor,
        hoverColor: formData.hoverColor,
        linkColor: formData.linkColor,
      })
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to save settings' })
      // Revert colors to original values on error
      if (typeof window !== 'undefined') {
        Object.keys(originalColors).forEach((key) => {
          updateColorPreview(key, originalColors[key as keyof typeof originalColors])
        })
      }
      setFormData(prev => ({
        ...prev,
        ...originalColors,
      }))
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading settings...</div>
  }

  const ColorPicker = ({ name, label, description }: { name: string; label: string; description: string }) => {
    const handleColorClick = (e: React.MouseEvent<HTMLInputElement>) => {
      // Prevent any parent handlers from interfering
      e.stopPropagation()
      e.nativeEvent.stopImmediatePropagation()
    }

    const handleColorMouseDown = (e: React.MouseEvent<HTMLInputElement>) => {
      // Prevent any parent handlers from interfering
      e.stopPropagation()
      e.nativeEvent.stopImmediatePropagation()
    }

    return (
      <div>
        <label className="block text-xs font-semibold text-neutral-700 mb-1">
          {label}
        </label>
        <p className="text-xs text-neutral-500 mb-2">{description}</p>
        <div className="relative">
          <input
            name={name}
            type="color"
            value={formData[name as keyof typeof formData] as string}
            onChange={handleColorInput}
            onInput={handleColorInput}
            onClick={handleColorClick}
            onMouseDown={handleColorMouseDown}
            onFocus={(e) => {
              e.stopPropagation()
              e.nativeEvent.stopImmediatePropagation()
            }}
            onBlur={(e) => {
              // Only stop propagation on blur if it's not a natural blur
              e.stopPropagation()
            }}
            className="w-full h-12 rounded-lg border border-neutral-300 cursor-pointer"
            style={{ 
              backgroundColor: formData[name as keyof typeof formData] as string,
              pointerEvents: 'auto'
            }}
          />
        </div>
        <Input
          name={name}
          type="text"
          value={formData[name as keyof typeof formData] as string}
          onChange={handleChange}
          className="mt-2 text-sm"
        />
      </div>
    )
  }

  return (
    <Card className="p-8">
      <h2 className="text-2xl font-bold text-neutral-900 mb-6">Site Settings</h2>
      
      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          <p className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
            {message.text}
          </p>
        </div>
      )}

      <form 
        onSubmit={handleSubmit} 
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Site Name"
            name="siteName"
            value={formData.siteName}
            onChange={handleChange}
            required
          />
          <Input
            label="Tagline"
            name="tagline"
            value={formData.tagline}
            onChange={handleChange}
          />
        </div>

        {/* Logo Upload */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Logo
          </label>
          <div className="flex items-center gap-4">
            {formData.logoUrl && (
              <div className="relative w-24 h-24 border border-neutral-300 rounded-lg overflow-hidden bg-white">
                <Image
                  src={formData.logoUrl}
                  alt="Logo"
                  fill
                  className="object-contain p-2"
                  sizes="96px"
                />
              </div>
            )}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
                id="logo-upload"
                disabled={uploadingLogo}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={uploadingLogo}
                onClick={() => {
                  fileInputRef.current?.click()
                }}
              >
                {uploadingLogo ? 'Uploading...' : formData.logoUrl ? 'Change Logo' : 'Upload Logo'}
              </Button>
              <p className="text-xs text-neutral-500 mt-1">Recommended: PNG or SVG, max 5MB</p>
              {uploadingLogo && (
                <p className="text-xs text-blue-600 mt-1 animate-pulse">Uploading logo...</p>
              )}
            </div>
          </div>
        </div>

        {/* Theme Colors */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-neutral-700">
              Theme Colors
            </label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={restoreDefaults}
            >
              Restore Defaults
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ColorPicker
              name="primaryColor"
              label="Primary Color (Navigation & Buttons)"
              description="Navbar background, primary buttons, brand elements"
            />
            <ColorPicker
              name="accentColor"
              label="Background Color (Sections & Cards)"
              description="Page backgrounds, section backgrounds, cards, hero area"
            />
            <ColorPicker
              name="neutralColor"
              label="Text Color (Fonts & Content)"
              description="Body text, headings, navigation links, all text content"
            />
            <ColorPicker
              name="footerColor"
              label="Footer Background"
              description="Footer background color"
            />
            <ColorPicker
              name="borderColor"
              label="Border & Divider Color"
              description="Borders, dividers, card borders, input borders"
            />
            <ColorPicker
              name="hoverColor"
              label="Hover State Color"
              description="Hover effects on links, buttons, interactive elements"
            />
            <ColorPicker
              name="linkColor"
              label="Link Color"
              description="All link colors, clickable text"
            />
          </div>
        </div>

        <Input
          label="Hero Headline"
          name="heroHeadline"
          value={formData.heroHeadline}
          onChange={handleChange}
        />

        <Textarea
          label="Hero Subtext"
          name="heroSubtext"
          value={formData.heroSubtext}
          onChange={handleChange}
          rows={2}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="WhatsApp Number"
            name="WhatsAppNumber"
            value={formData.WhatsAppNumber}
            onChange={handleChange}
            placeholder="+1234567890"
          />
          <Input
            label="Phone Number (Optional)"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="+1234567890"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Instagram URL"
            name="InstagramUrl"
            type="url"
            value={formData.InstagramUrl}
            onChange={handleChange}
            placeholder="https://instagram.com/username"
          />
          <Input
            label="TikTok URL"
            name="TikTokUrl"
            type="url"
            value={formData.TikTokUrl}
            onChange={handleChange}
            placeholder="https://tiktok.com/@username"
          />
        </div>

        <Input
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g., New York, NY"
        />

        <Textarea
          label="Bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={5}
          placeholder="Write a short bio about yourself..."
        />

        <Button type="submit" variant="primary" size="lg" disabled={saving}>
          {saving ? 'Saving...' : 'Save Settings'}
        </Button>
      </form>
    </Card>
  )
}
