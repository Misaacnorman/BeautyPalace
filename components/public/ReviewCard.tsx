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

  // Generate initials for avatar
  const initials = review.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <Card className="p-6 relative overflow-hidden group">
      {/* Quote decoration */}
      <div 
        className="absolute top-4 right-4 text-6xl font-serif opacity-10 select-none transition-all duration-500 group-hover:opacity-20 group-hover:scale-110"
        style={{ color: 'var(--border-color)', fontFamily: 'Georgia, serif' }}
      >
        "
      </div>

      <div className="flex items-start gap-4 mb-4 relative z-10">
        {/* Avatar */}
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
          style={{
            background: 'linear-gradient(135deg, var(--primary-color), #d10037)',
            boxShadow: '0 4px 15px rgba(179, 0, 45, 0.3)',
          }}
        >
          <span className="text-white font-semibold text-sm">{initials}</span>
        </div>
        
        <div className="flex-grow">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 
                className="font-semibold text-lg transition-colors duration-300 group-hover:text-[var(--hover-color)]"
                style={{ color: 'var(--heading-color)' }}
              >
                {review.name}
              </h4>
              <Rating rating={review.rating} size="sm" />
            </div>
            <span 
              className="text-xs px-3 py-1 rounded-full whitespace-nowrap"
              style={{ 
                color: 'var(--text-color)', 
                opacity: 0.7,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
              }}
            >
              {formattedDate}
            </span>
          </div>
        </div>
      </div>
      
      <div className="relative z-10">
        <p 
          className="leading-relaxed italic"
          style={{ color: 'var(--text-color)', opacity: 0.9 }}
        >
          "{review.comment}"
        </p>
      </div>

      {/* Bottom accent line */}
      <div 
        className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500"
        style={{
          background: 'linear-gradient(90deg, var(--primary-color), var(--border-color), var(--primary-color))',
        }}
      />
    </Card>
  )
}

