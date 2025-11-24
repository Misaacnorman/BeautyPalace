'use client'

import { useState, useEffect } from 'react'
import { getReviews, createReview, updateReview } from '@/lib/firebase/firestore'
import { Review } from '@/lib/types'

export const useReviews = (approvedOnly: boolean = false) => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true)
        const data = await getReviews(approvedOnly ? 'approved' : undefined)
        setReviews(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch reviews')
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [approvedOnly])

  const addReview = async (review: Omit<Review, 'id' | 'createdAt' | 'status'>) => {
    try {
      await createReview(review)
      // Refresh reviews
      const data = await getReviews(approvedOnly ? 'approved' : undefined)
      setReviews(data)
      return { success: true }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Failed to submit review' }
    }
  }

  const updateReviewStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await updateReview(id, { status })
      // Refresh reviews
      const data = await getReviews(approvedOnly ? 'approved' : undefined)
      setReviews(data)
      return { success: true }
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Failed to update review' }
    }
  }

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0

  return { reviews, loading, error, addReview, updateReviewStatus, averageRating }
}

