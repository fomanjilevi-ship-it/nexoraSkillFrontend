import { Link } from 'react-router-dom'
import { Users } from 'lucide-react'
import type { Course } from '@/types/course'
import Badge from '@/components/ui/Badge'
import StarRating from '@/components/ui/StarRating'
import { formatPrice } from '@/lib/utils'

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      to={`/courses/${course.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-lg"
    >
      {/* Miniature */}
      {course.thumbnail ? (
        <img
          src={course.thumbnail}
          alt={course.title}
          className="aspect-video w-full object-cover"
        />
      ) : (
        <div className="aspect-video w-full bg-gradient-to-br from-brand-500 to-purple-500" />
      )}

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 font-bold leading-snug group-hover:text-brand-600">
          {course.title}
        </h3>
        <p className="text-sm text-gray-500">{course.instructor}</p>

        <StarRating rating={course.rating} reviewsCount={course.reviewsCount} />

        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Users size={14} />
          {course.studentsCount.toLocaleString('fr-FR')} étudiants
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-lg font-bold">{formatPrice(course.price)}</span>
          <div className="flex gap-1">
            <Badge tone="gray">{course.level}</Badge>
            {course.bestseller && <Badge tone="amber">Best-seller</Badge>}
          </div>
        </div>
      </div>
    </Link>
  )
}