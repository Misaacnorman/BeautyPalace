export type BookingStatus = 'pending' | 'confirmed' | 'cancelled'

export interface Booking {
  id?: string
  name: string
  phone: string
  email?: string
  service: string
  date: string
  time: string
  location: string
  notes?: string
  status: BookingStatus
  adminNotes?: string
  createdAt: Date | string
}

export type ReviewStatus = 'pending' | 'approved' | 'rejected'

export interface Review {
  id?: string
  name: string
  rating: number // 1-5
  comment: string
  status: ReviewStatus
  createdAt: Date | string
}

export type GalleryCategory =
  | 'Bridal'
  | 'Soft Glam'
  | 'Photoshoot'
  | 'Full Glam'
  | 'Hair'
  | 'Henna'
  | 'Lashes'
  | 'Editorial'
  | 'Behind the Scenes'

export interface Photo {
  id: string
  imageUrl: string
  caption?: string
  tags: string[]
  category: GalleryCategory
  isFeatured: boolean
  createdAt: Date | string
}

export type MediaType = 'image' | 'video'

export interface MediaItem {
  id: string
  type: MediaType
  url: string
  thumbnailUrl?: string
  caption?: string
  tags: string[]
  category: GalleryCategory
  isFeatured: boolean
  createdAt: Date | string
}

export interface Service {
  id: string
  name: string
  description: string
}

export interface Settings {
  id?: string
  siteName: string
  tagline: string
  logoUrl?: string
  primaryColor: string // hex color - Navigation bar & buttons
  accentColor: string // hex color - Backgrounds & cards
  neutralColor: string // hex color - Text colors
  footerColor: string // hex color - Footer background
  borderColor: string // hex color - Borders & dividers
  hoverColor: string // hex color - Hover states
  linkColor: string // hex color - Links
  heroHeadline: string
  heroSubtext: string
  WhatsAppNumber: string
  phoneNumber?: string
  InstagramUrl: string
  TikTokUrl: string
  location: string
  bio: string
}

