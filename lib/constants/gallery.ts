import { GalleryCategory } from '@/lib/types'

export const galleryCategories: GalleryCategory[] = [
  'Bridal',
  'Soft Glam',
  'Photoshoot',
  'Full Glam',
  'Hair',
  'Henna',
  'Lashes',
  'Editorial',
  'Behind the Scenes',
]

export const toCategoryKey = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
