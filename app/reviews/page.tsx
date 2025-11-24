'use client'

import { useState } from 'react'
import { ReviewCard } from '@/components/public/ReviewCard'
import { Rating } from '@/components/ui/Rating'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { useReviews } from '@/hooks/useReviews'
import { validateReview } from '@/lib/utils/validation'

export default function ReviewsPage() {
  const { reviews, averageRating, addReview } = useReviews(true)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    name: '',
    rating: 0,
    comment: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }))
    if (errors.rating) {
      setErrors(prev => ({ ...prev, rating: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const validationErrors = validateReview(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    const result = await addReview(formData)
    setLoading(false)

    if (result.success) {
      setFormData({ name: '', rating: 0, comment: '' })
      setShowForm(false)
      alert('Thank you for your review! It will be reviewed and published soon.')
    } else {
      setErrors({ submit: result.error || 'Failed to submit review. Please try again.' })
    }
  }

  return (
    <div 
      className="min-h-screen py-12"
      style={{ backgroundColor: 'var(--section-bg)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'var(--heading-color)' }}
          >
            Reviews & Testimonials
          </h1>
          {averageRating > 0 && (
            <div className="flex items-center justify-center gap-3 mb-4">
              <Rating rating={Math.round(averageRating)} size="lg" />
              <span className="text-3xl font-bold text-neutral-900">
                {averageRating.toFixed(1)}
              </span>
              <span className="text-neutral-600 text-lg">
                / 5.0 ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          )}
        </div>

        {/* Leave Review Button */}
        {!showForm && (
          <div className="text-center mb-12">
            <Button onClick={() => setShowForm(true)} variant="primary" size="lg">
              Leave a Review
            </Button>
          </div>
        )}

        {/* Review Form */}
        {showForm && (
          <div className="max-w-2xl mx-auto mb-12 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Write a Review</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                error={errors.name}
              />

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Rating <span className="text-primary-600">*</span>
                </label>
                <Rating
                  rating={formData.rating}
                  onRatingChange={handleRatingChange}
                  interactive
                />
                {errors.rating && (
                  <p className="mt-1 text-sm text-red-600">{errors.rating}</p>
                )}
              </div>

              <Textarea
                label="Your Review"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                rows={5}
                required
                error={errors.comment}
              />

              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600">{errors.submit}</p>
                </div>
              )}

              <div className="flex gap-4">
                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Review'}
                </Button>
                <Button type="button" variant="outline" onClick={() => {
                  setShowForm(false)
                  setFormData({ name: '', rating: 0, comment: '' })
                  setErrors({})
                }}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Reviews List */}
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-500 text-lg">No reviews yet. Be the first to leave a review!</p>
          </div>
        )}
      </div>
    </div>
  )
}

