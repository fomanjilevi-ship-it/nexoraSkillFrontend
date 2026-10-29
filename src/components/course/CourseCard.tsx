import { Link } from 'react-router-dom'
import { BookOpen, Users } from 'lucide-react'
import type { Course } from '@/types/course'
import Badge from '@/components/ui/Badge'
import StarRating from '@/components/ui/StarRating'
import { formatPrice } from '@/lib/utils'

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      to={`/courses/${course.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white text-gray-900 transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      {/* Miniature */}
      {course.thumbnail ? (
        <img
          src={course.thumbnail}
          alt={course.title}
          className="aspect-video w-full object-cover"
        />
      ) : (
        <div className="relative flex aspect-video w-full items-center justify-center bg-gradient-to-br from-gray-950 to-gray-800 text-white">
          {course.technologyLogos?.length ? (
            <div className="flex items-center justify-center gap-5">
              {course.technologyLogos.map((logo, index) => (
                <img
                  key={logo}
                  src={`https://cdn.simpleicons.org/${logo}/${course.technologyLogoColors?.[index] ?? course.technologyColor ?? "6366F1"}`}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="h-14 w-14 object-contain"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              ))}
            </div>
          ) : (
            <BookOpen size={36} strokeWidth={1.5} aria-hidden="true" />
          )}
          {course.technology && (
            <span className="absolute bottom-3 left-0 right-0 text-center text-sm font-semibold text-white/90">
              {course.technology}
            </span>
          )}
        </div>
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