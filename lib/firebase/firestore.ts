import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  QueryConstraint,
} from 'firebase/firestore'
import { db, isFirebaseConfigured } from './config'
import { Booking, Review, Photo, Settings } from '@/lib/types'

const checkFirebase = () => {
  if (!db || !isFirebaseConfigured()) {
    throw new Error('Firebase is not configured. Please set up your .env.local file with Firebase credentials.')
  }
}

// Bookings
export const getBookings = async (status?: string) => {
  checkFirebase()
  const bookingsRef = collection(db!, 'bookings')
  const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')]
  
  if (status) {
    constraints.unshift(where('status', '==', status))
  }
  
  const q = query(bookingsRef, ...constraints)
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
  })) as Booking[]
}

export const createBooking = async (booking: Omit<Booking, 'id' | 'createdAt'>) => {
  checkFirebase()
  const bookingsRef = collection(db!, 'bookings')
  return await addDoc(bookingsRef, {
    ...booking,
    createdAt: Timestamp.now(),
  })
}

export const updateBooking = async (id: string, updates: Partial<Booking>) => {
  checkFirebase()
  const bookingRef = doc(db!, 'bookings', id)
  await updateDoc(bookingRef, updates)
}

// Reviews
export const getReviews = async (status?: 'approved') => {
  checkFirebase()
  const reviewsRef = collection(db!, 'reviews')
  const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')]
  
  if (status) {
    constraints.unshift(where('status', '==', status))
  }
  
  const q = query(reviewsRef, ...constraints)
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
  })) as Review[]
}

export const createReview = async (review: Omit<Review, 'id' | 'createdAt' | 'status'>) => {
  checkFirebase()
  const reviewsRef = collection(db!, 'reviews')
  return await addDoc(reviewsRef, {
    ...review,
    status: 'pending',
    createdAt: Timestamp.now(),
  })
}

export const updateReview = async (id: string, updates: Partial<Review>) => {
  checkFirebase()
  const reviewRef = doc(db!, 'reviews', id)
  await updateDoc(reviewRef, updates)
}

// Photos
export const getPhotos = async (tag?: string, featured?: boolean) => {
  checkFirebase()
  const photosRef = collection(db!, 'photos')
  const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')]
  
  if (tag) {
    constraints.unshift(where('tags', 'array-contains', tag))
  }
  
  if (featured) {
    constraints.unshift(where('isFeatured', '==', true))
  }
  
  const q = query(photosRef, ...constraints)
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
  })) as Photo[]
}

export const createPhoto = async (photo: Omit<Photo, 'id' | 'createdAt'>) => {
  checkFirebase()
  const photosRef = collection(db!, 'photos')
  return await addDoc(photosRef, {
    ...photo,
    createdAt: Timestamp.now(),
  })
}

export const updatePhoto = async (id: string, updates: Partial<Photo>) => {
  checkFirebase()
  const photoRef = doc(db!, 'photos', id)
  await updateDoc(photoRef, updates)
}

export const deletePhoto = async (id: string) => {
  checkFirebase()
  const photoRef = doc(db!, 'photos', id)
  await deleteDoc(photoRef)
}

// Settings
export const getSettings = async (): Promise<Settings | null> => {
  checkFirebase()
  const settingsRef = collection(db!, 'settings')
  const snapshot = await getDocs(settingsRef)
  
  if (snapshot.empty) {
    return null
  }
  
  const doc = snapshot.docs[0]
  return {
    id: doc.id,
    ...doc.data(),
  } as Settings
}

export const updateSettings = async (settings: Partial<Settings>) => {
  checkFirebase()
  const settingsRef = collection(db!, 'settings')
  const snapshot = await getDocs(settingsRef)
  
  if (snapshot.empty) {
    // Create new settings document
    await addDoc(settingsRef, settings)
  } else {
    // Update existing settings document
    const docRef = doc(db!, 'settings', snapshot.docs[0].id)
    await updateDoc(docRef, settings)
  }
}

