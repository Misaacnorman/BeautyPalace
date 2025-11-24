'use client'

import { useState, useEffect } from 'react'
import { getSettings, updateSettings } from '@/lib/firebase/firestore'
import { Settings } from '@/lib/types'

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true)
        const data = await getSettings()
        setSettings(data)
        setError(null)
      } catch (err) {
        // If Firebase is not configured, use default settings
        if (err instanceof Error && err.message.includes('not configured')) {
          setSettings(null) // Will use defaults in components
          setError(null)
        } else {
          setError(err instanceof Error ? err.message : 'Failed to fetch settings')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const update = async (updates: Partial<Settings>) => {
    try {
      await updateSettings(updates)
      const data = await getSettings()
      setSettings(data)
      return { success: true }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Failed to update settings' }
    }
  }

  return { settings, loading, error, update }
}

