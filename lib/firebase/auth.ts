import { 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  User,
  onAuthStateChanged,
  Auth
} from 'firebase/auth'
import { auth, isFirebaseConfigured } from './config'

export const signIn = async (email: string, password: string) => {
  if (typeof window === 'undefined') {
    throw new Error('Auth can only be used on client side')
  }
  if (!auth || !isFirebaseConfigured()) {
    throw new Error('Firebase is not configured. Please set up your .env.local file.')
  }
  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOut = async () => {
  if (typeof window === 'undefined') {
    throw new Error('Auth can only be used on client side')
  }
  if (!auth || !isFirebaseConfigured()) {
    throw new Error('Firebase is not configured. Please set up your .env.local file.')
  }
  return await firebaseSignOut(auth)
}

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !auth || !isFirebaseConfigured()) {
      resolve(null)
      return
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      resolve(user)
    })
  })
}

export { auth }

