'use client'

import { useReviews } from '@/hooks/useReviews'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Rating } from '@/components/ui/Rating'
import { Review } from '@/lib/types'

export const ReviewsTab = () => {
  const { reviews, loading, updateReviewStatus } = useReviews(false)

  const handleApprove = async (id: string) => {
    await updateReviewStatus(id, 'approved')
  }

  const handleReject = async (id: string) => {
    if (!confirm('Are you sure you want to reject this review?')) return
    await updateReviewStatus(id, 'rejected')
  }

  const pendingReviews = reviews.filter(r => r.status === 'pending')
  const approvedReviews = reviews.filter(r => r.status === 'approved')
  const rejectedReviews = reviews.filter(r => r.status === 'rejected')

  if (loading) {
    return <div className="text-center py-12">Loading reviews...</div>
  }

  const ReviewItem = ({ review }: { review: Review }) => {
    const date = new Date(review.createdAt)
    const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

    return (
      <Card className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="font-semibold text-lg text-neutral-900">{review.name}</h4>
            <Rating rating={review.rating} size="sm" />
          </div>
          <span className="text-sm text-neutral-500">{formattedDate}</span>
        </div>
        <p className="text-neutral-700 mb-4">{review.comment}</p>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            review.status === 'approved' ? 'bg-green-100 text-green-800' :
            review.status === 'rejected' ? 'bg-red-100 text-red-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
          </span>
          {review.status === 'pending' && (
            <>
              <Button variant="primary" size="sm" onClick={() => handleApprove(review.id!)}>
                Approve
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleReject(review.id!)}>
                Reject
              </Button>
            </>
          )}
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      {pendingReviews.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Pending Reviews ({pendingReviews.length})</h2>
          <div className="space-y-4">
            {pendingReviews.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </div>
        </div>
      )}

      {approvedReviews.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Approved Reviews ({approvedReviews.length})</h2>
          <div className="space-y-4">
            {approvedReviews.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </div>
        </div>
      )}

      {rejectedReviews.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Rejected Reviews ({rejectedReviews.length})</h2>
          <div className="space-y-4">
            {rejectedReviews.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </div>
        </div>
      )}

      {reviews.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-neutral-500">No reviews yet.</p>
        </Card>
      )}
    </div>
  )
}

