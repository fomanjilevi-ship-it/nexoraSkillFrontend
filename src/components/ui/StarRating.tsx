import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  reviewsCount?: number
}

export default function StarRating({ rating, reviewsCount }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1 text-sm">
      <span className="font-bold text-amber-700">{rating.toFixed(1)}</span>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={14}
            className={i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
          />
        ))}
      </div>
      {reviewsCount !== undefined && (
        <span className="text-gray-500">({reviewsCount.toLocaleString('fr-FR')})</span>
      )}
    </div>
  )
}