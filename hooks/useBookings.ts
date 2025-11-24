'use client'

import { useState, useEffect } from 'react'
import { getBookings, createBooking, updateBooking } from '@/lib/firebase/firestore'
import { Booking } from '@/lib/types'

export const useBookings = (status?: string) => {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true)
        const data = await getBookings(status)
        setBookings(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch bookings')
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [status])

  const addBooking = async (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
    try {
      await createBooking({
        ...booking,
        status: 'pending',
      })
      // Refresh bookings
      const data = await getBookings(status)
      setBookings(data)
      return { success: true }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Failed to create booking' }
    }
  }

  const updateBookingStatus = async (id: string, updates: Partial<Booking>) => {
    try {
      await updateBooking(id, updates)
      // Refresh bookings
      const data = await getBookings(status)
      setBookings(data)
      return { success: true }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Failed to update booking' }
    }
  }

  return { bookings, loading, error, addBooking, updateBookingStatus }
}

