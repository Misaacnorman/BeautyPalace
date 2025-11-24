'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { useGallery } from '@/hooks/useGallery'
import { uploadImage, deleteImage, getImagePathFromUrl } from '@/lib/firebase/storage'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Photo } from '@/lib/types'

const availableTags = ['Bridal', 'Soft Glam', 'Natural', 'Bold', 'Hair']

export const GalleryTab = () => {
  const { photos, loading, addPhoto, editPhoto, removePhoto } = useGallery()
  const [uploading, setUploading] = useState(false)
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null)
  const [caption, setCaption] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [isFeatured, setIsFeatured] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const path = `photos/${Date.now()}_${file.name}`
      const imageUrl = await uploadImage(file, path)
      await addPhoto({
        imageUrl,
        caption: '',
        tags: [],
        isFeatured: false,
      })
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      alert('Failed to upload image. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleEdit = (photo: Photo) => {
    setEditingPhoto(photo)
    setCaption(photo.caption)
    setTags(photo.tags)
    setIsFeatured(photo.isFeatured)
  }

  const handleSaveEdit = async () => {
    if (!editingPhoto?.id) return
    await editPhoto(editingPhoto.id, { caption, tags, isFeatured })
    setEditingPhoto(null)
    setCaption('')
    setTags([])
    setIsFeatured(false)
  }

  const handleDelete = async (photo: Photo) => {
    if (!confirm('Are you sure you want to delete this image?')) return

    try {
      const path = getImagePathFromUrl(photo.imageUrl)
      await deleteImage(path)
      await removePhoto(photo.id)
    } catch (error) {
      alert('Failed to delete image. Please try again.')
    }
  }

  const toggleTag = (tag: string) => {
    setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])
  }

  return (
    <div>
      <div className="mb-6">
        <Card className="p-6">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Upload New Image</h2>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="mb-4"
            disabled={uploading}
          />
          {uploading && <p className="text-sm text-neutral-600">Uploading...</p>}
        </Card>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading gallery...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <Card key={photo.id} className="p-4">
              <div className="relative aspect-square mb-4 rounded-lg overflow-hidden">
                <Image
                  src={photo.imageUrl}
                  alt={photo.caption || 'Gallery image'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {photo.isFeatured && (
                  <div className="absolute top-2 right-2 bg-accent-500 text-white px-2 py-1 rounded text-xs font-medium">
                    Featured
                  </div>
                )}
              </div>
              {photo.caption && (
                <p className="text-sm text-neutral-700 mb-2">{photo.caption}</p>
              )}
              {photo.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {photo.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(photo)}>
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(photo)}>
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingPhoto && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-neutral-900 mb-4">Edit Photo</h3>
            <Input
              label="Caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="mb-4"
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-2">Tags</label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      tags.includes(tag)
                        ? 'bg-primary-600 text-white'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium text-neutral-700">Featured</span>
              </label>
            </div>
            <div className="flex gap-3">
              <Button variant="primary" onClick={handleSaveEdit} className="flex-1">
                Save
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setEditingPhoto(null)
                  setCaption('')
                  setTags([])
                  setIsFeatured(false)
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

