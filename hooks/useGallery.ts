'use client'

import { useState, useEffect } from 'react'
import { getPhotos, createPhoto, updatePhoto, deletePhoto } from '@/lib/firebase/firestore'
import { Photo } from '@/lib/types'

interface GalleryOptions {
  tag?: string
  category?: string
  featured?: boolean
}

export const useGallery = (options?: GalleryOptions) => {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const tag = options?.tag
  const category = options?.category
  const featured = options?.featured

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true)
        const data = await getPhotos({ tag, category, featured })
        setPhotos(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch photos')
      } finally {
        setLoading(false)
      }
    }

    fetchPhotos()
  }, [tag, category, featured])

  const addPhoto = async (photo: Omit<Photo, 'id' | 'createdAt'>) => {
    try {
      await createPhoto(photo)
      // Refresh photos
      const data = await getPhotos({ tag, category, featured })
      setPhotos(data)
      return { success: true }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Failed to add photo' }
    }
  }

  const editPhoto = async (id: string, updates: Partial<Photo>) => {
    try {
      await updatePhoto(id, updates)
      // Refresh photos
      const data = await getPhotos({ tag, category, featured })
      setPhotos(data)
      return { success: true }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Failed to update photo' }
    }
  }

  const removePhoto = async (id: string) => {
    try {
      await deletePhoto(id)
      // Refresh photos
      const data = await getPhotos({ tag, category, featured })
      setPhotos(data)
      return { success: true }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Failed to delete photo' }
    }
  }

  return { photos, loading, error, addPhoto, editPhoto, removePhoto }
}

