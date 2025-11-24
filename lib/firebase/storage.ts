import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage, isFirebaseConfigured } from './config'

const checkFirebase = () => {
  if (!storage || !isFirebaseConfigured()) {
    throw new Error('Firebase is not configured. Please set up your .env.local file with Firebase credentials.')
  }
}

export const uploadImage = async (file: File, path: string): Promise<string> => {
  checkFirebase()
  const storageRef = ref(storage!, path)
  await uploadBytes(storageRef, file)
  return await getDownloadURL(storageRef)
}

export const deleteImage = async (path: string): Promise<void> => {
  checkFirebase()
  const storageRef = ref(storage!, path)
  await deleteObject(storageRef)
}

export const getImagePathFromUrl = (url: string): string => {
  // Extract path from Firebase Storage URL
  const match = url.match(/\/o\/(.+)\?/)
  if (match) {
    return decodeURIComponent(match[1])
  }
  return url
}

