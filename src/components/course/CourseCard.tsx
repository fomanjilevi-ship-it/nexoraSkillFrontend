import { Link } from 'react-router-dom'
import { ArrowUpRight, BookOpen, Clock3, Users } from 'lucide-react'
import type { CourseContent } from '@/data/courses'
import Badge from '@/components/ui/Badge'
import StarRating from '@/components/ui/StarRating'
import { formatPrice } from '@/lib/utils'

export default function CourseCard({ course }: { course: CourseContent }) {
  return (
    <Link
      to={`/courses/${course.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#29292e] bg-[#101012] text-white transition-colors duration-200 hover:border-[#48484f] hover:bg-[#131316] focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
    >
      <div
        className="relative flex aspect-[1.8] w-full items-center justify-center overflow-hidden border-b border-[#262626] bg-[#151517]"
      >
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-70 transition-opacity duration-200 group-hover:opacity-85"
          />
        ) : null}
        <div className="relative flex flex-col items-center gap-3">
          {course.technologyLogos?.length ? (
            <div className="flex items-center justify-center gap-3">
              {course.technologyLogos.map((logo, index) => (
                <img
                  key={`${logo}-${index}`}
                  src={`https://cdn.simpleicons.org/${logo}/${course.technologyLogoColors?.[index] ?? course.technologyColor ?? "6366F1"}`}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="h-12 w-12 object-contain sm:h-14 sm:w-14"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#303036] bg-[#1c1c1f] text-zinc-300">
              <BookOpen size={26} strokeWidth={1.6} aria-hidden="true" />
            </div>
          )}
          <span className="rounded-md border border-[#303036] bg-[#101012] px-3 py-1 text-xs font-semibold text-zinc-200">
            {course.technology ?? course.category}
          </span>
        </div>
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <Badge className="border border-[#343439] bg-[#101012] text-zinc-300">{course.category}</Badge>
        </div>
        {course.bestseller && (
          <Badge className="absolute right-4 top-4 border border-[#48484f] bg-[#101012] text-zinc-200">
            Populaire
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <Badge className="border border-[#343439] bg-[#1a1a1d] text-zinc-300">{course.level}</Badge>
          <span className="text-sm font-semibold text-zinc-100">
            {formatPrice(course.price)}
          </span>
        </div>
        <h3 className="line-clamp-2 min-h-12 text-base font-semibold leading-snug text-zinc-100 transition-colors group-hover:text-white sm:text-lg">
          {course.title}
        </h3>
        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-relaxed text-zinc-500">
          {course.description}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#343439] bg-[#1c1c1f] text-xs font-semibold text-zinc-300">
              {course.instructor.split(/\s+/).map((part) => part[0]).slice(0, 2).join('').toUpperCase()}
            </span>
            <span className="truncate text-sm text-zinc-400">{course.instructor}</span>
          </div>
          <span className="flex shrink-0 items-center gap-1 text-xs text-zinc-500">
            <Clock3 size={13} aria-hidden="true" />
            {course.duration}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#262626] pt-4">
          <StarRating rating={course.rating} reviewsCount={course.reviewsCount} />
          <span className="flex items-center gap-1.5 text-xs text-zinc-500">
            <Users size={14} aria-hidden="true" />
            {course.studentsCount.toLocaleString('fr-FR')} élèves
          </span>
        </div>

        <span className="mt-5 flex items-center justify-between rounded-lg border border-[#343439] bg-[#17171a] px-4 py-3 text-sm font-medium text-zinc-300 transition group-hover:border-[#52525b] group-hover:text-white">
          Voir le programme
          <ArrowUpRight size={17} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  )
}