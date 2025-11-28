'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { useGallery } from '@/hooks/useGallery'
import { uploadImage, deleteImage, getImagePathFromUrl } from '@/lib/firebase/storage'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Photo, GalleryCategory } from '@/lib/types'
import { galleryCategories, toCategoryKey } from '@/lib/constants/gallery'

const availableTags = ['Bridal', 'Soft Glam', 'Full Glam', 'Photoshoot', 'Hair', 'Henna', 'Lashes', 'Editorial']

export const GalleryTab = () => {
  const { photos, loading, addPhoto, editPhoto, removePhoto } = useGallery()
  const [uploading, setUploading] = useState(false)
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null)
  const [caption, setCaption] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [isFeatured, setIsFeatured] = useState(false)
  const [editCategory, setEditCategory] = useState(galleryCategories[0])

  const [newFile, setNewFile] = useState<File | null>(null)
  const [newPreview, setNewPreview] = useState<string | null>(null)
  const [newCaption, setNewCaption] = useState('')
  const [newTags, setNewTags] = useState<string[]>([])
  const [newCategory, setNewCategory] = useState<GalleryCategory>(galleryCategories[0])
  const [newIsFeatured, setNewIsFeatured] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    return () => {
      if (newPreview) {
        URL.revokeObjectURL(newPreview)
      }
    }
  }, [newPreview])

  const resetNewPhotoForm = () => {
    setNewFile(null)
    setNewPreview(null)
    setNewCaption('')
    setNewTags([])
    setNewCategory(galleryCategories[0])
    setNewIsFeatured(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (newPreview) {
      URL.revokeObjectURL(newPreview)
    }
    setNewFile(file)
    setNewPreview(URL.createObjectURL(file))
  }

  const handleUpload = async () => {
    if (!newFile) {
      alert('Please select an image first.')
      return
    }

    setUploading(true)
    try {
      const path = `photos/${Date.now()}_${newFile.name}`
      const imageUrl = await uploadImage(newFile, path)
      // Sanitize tags: filter falsy values and remove duplicates
      const sanitizedTags = [...new Set(newTags.filter(Boolean))]
      await addPhoto({
        imageUrl,
        caption: newCaption.trim(),
        tags: sanitizedTags,
        isFeatured: newIsFeatured,
        category: newCategory,
        categoryKey: toCategoryKey(newCategory),
      })
      resetNewPhotoForm()
    } catch (error) {
      alert('Failed to upload image. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleEdit = (photo: Photo) => {
    setEditingPhoto(photo)
    setCaption(photo.caption || '')
    setTags(photo.tags || [])
    setIsFeatured(photo.isFeatured)
    setEditCategory(photo.category || galleryCategories[0])
  }

  const handleSaveEdit = async () => {
    if (!editingPhoto?.id) return
    await editPhoto(editingPhoto.id, { 
      caption, 
      tags, 
      isFeatured, 
      category: editCategory,
      categoryKey: toCategoryKey(editCategory),
    })
    setEditingPhoto(null)
    setCaption('')
    setTags([])
    setIsFeatured(false)
    setEditCategory(galleryCategories[0])
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

  const toggleNewTag = (tag: string) => {
    setNewTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])
  }

  return (
    <div>
      <div className="mb-6">
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--heading-color)' }}>Upload New Image</h2>
          <p className="text-sm" style={{ color: 'var(--text-color)', opacity: 0.8 }}>Categorize each photo so visitors can explore by style. Add a description to give context (optional).</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="mb-2"
            disabled={uploading}
          />
          {newPreview && (
            <div className="relative h-48 rounded-xl overflow-hidden border border-[var(--border-color)]">
              <Image src={newPreview} alt="Preview" fill className="object-cover" />
            </div>
          )}
          <Input
            label="Description (optional)"
            value={newCaption}
            onChange={(e) => setNewCaption(e.target.value)}
          />
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--heading-color)' }}>Category</label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as GalleryCategory)}
              className="w-full px-4 py-2 rounded-lg border"
              style={{ borderColor: 'var(--border-color)', backgroundColor: 'transparent', color: 'var(--text-color)' }}
            >
              {galleryCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--heading-color)' }}>Tags (optional)</label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleNewTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    newTags.includes(tag)
                      ? 'bg-primary-600 text-white'
                      : 'bg-white/10 text-[var(--text-color)] hover:bg-white/20'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--text-color)' }}>
            <input
              type="checkbox"
              checked={newIsFeatured}
              onChange={(e) => setNewIsFeatured(e.target.checked)}
              className="w-4 h-4"
            />
            Feature this photo in the carousel
          </label>
          <div className="flex gap-3">
            <Button
              variant="primary"
              onClick={handleUpload}
              disabled={uploading || !newFile}
              className="flex-1"
            >
              {uploading ? 'Uploading...' : 'Upload Photo'}
            </Button>
            <Button variant="outline" onClick={resetNewPhotoForm} className="flex-1">
              Reset
            </Button>
          </div>
        </Card>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading gallery...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <Card
              key={photo.id}
              className="p-4"
            >
              <div className="relative aspect-square mb-4 rounded-lg overflow-hidden">
                <Image
                  src={photo.imageUrl}
                  alt={photo.caption || 'Gallery image'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-white">
                  {photo.category || 'Editorial'}
                </div>
                {photo.isFeatured && (
                  <div className="absolute top-3 right-3 bg-primary-600 text-white px-2 py-1 rounded text-xs font-medium">
                    Featured
                  </div>
                )}
              </div>
              {photo.caption && (
                <p className="text-sm mb-2" style={{ color: 'var(--text-color)' }}>{photo.caption}</p>
              )}
              {photo.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {photo.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-white/10 text-[var(--text-color)] text-xs rounded">
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
              label="Description"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="mb-4"
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-2">Category</label>
              <select
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value as GalleryCategory)}
                className="w-full px-4 py-2 border rounded-lg"
              >
                {galleryCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
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

