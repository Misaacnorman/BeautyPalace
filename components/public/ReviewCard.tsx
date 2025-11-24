'use client'

import { Card } from '@/components/ui/Card'
import { Rating } from '@/components/ui/Rating'
import { Review } from '@/lib/types'

interface ReviewCardProps {
  review: Review
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const date = new Date(review.createdAt)
  const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 
            className="font-semibold text-lg"
            style={{ color: 'var(--heading-color)' }}
          >
            {review.name}
          </h4>
          <Rating rating={review.rating} size="sm" />
        </div>
        <span 
          className="text-sm"
          style={{ color: 'var(--text-color)', opacity: 0.7 }}
        >
          {formattedDate}
        </span>
      </div>
      <p style={{ color: 'var(--text-color)' }}>{review.comment}</p>
    </Card>
  )
}

