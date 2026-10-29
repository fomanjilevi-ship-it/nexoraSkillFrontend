import { useState } from "react";
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Globe2,
  PlayCircle,
  Users,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Badge from "@/components/ui/Badge";
import StarRating from "@/components/ui/StarRating";
import { courses } from "@/data/courses";
import { formatPrice } from "@/lib/utils";
import NotFound from "@/pages/NotFound";

export default function CourseDetail() {
  const { slug } = useParams();
  const course = courses.find((item) => item.slug === slug);
  const [expandedModules, setExpandedModules] = useState<number[]>([0]);

  if (!course) return <NotFound />;

  const lessonCount = course.curriculum.reduce(
    (total, module) => total + module.lessons.length,
    0,
  );

  function toggleModule(index: number) {
    setExpandedModules((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  }

  return (
    <div className="pb-12">
      <section className="bg-gradient-to-br from-indigo-950 via-slate-950 to-black">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:py-14">
          <div>
            <nav aria-label="Fil d’Ariane" className="mb-6 text-sm text-gray-400">
              <Link to="/courses" className="hover:text-white">Cours</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-200">{course.category}</span>
            </nav>
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge className="bg-indigo-400/15 text-indigo-200">{course.category}</Badge>
              {course.technology && (
                <Badge className="bg-white/10 text-gray-200">{course.technology}</Badge>
              )}
              <Badge className="bg-white/10 text-gray-200">{course.level}</Badge>
              {course.bestseller && <Badge className="bg-amber-400/15 text-amber-200">Populaire</Badge>}
            </div>
            <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white sm:text-4xl">
              {course.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-300">
              {course.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-gray-300">
              <StarRating rating={course.rating} reviewsCount={course.reviewsCount} />
              <span className="inline-flex items-center gap-1.5">
                <Users size={16} aria-hidden="true" />
                {course.studentsCount.toLocaleString("fr-FR")} apprenants
              </span>
            </div>
            <p className="mt-4 text-sm text-gray-300">
              Créé par <span className="font-semibold text-white">{course.instructor}</span>
            </p>
          </div>

          <aside className="h-fit overflow-hidden rounded-2xl border border-white/10 bg-gray-950 shadow-2xl lg:sticky lg:top-24">
            <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-indigo-600/40 via-violet-900/40 to-slate-900">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20">
                <PlayCircle size={34} aria-hidden="true" />
              </div>
            </div>
            <div className="space-y-5 p-6">
              <p className="text-3xl font-bold text-white">{formatPrice(course.price)}</p>
              <Link
                to="/register"
                className="block rounded-lg bg-indigo-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                S’inscrire à ce cours
              </Link>
              <p className="text-center text-xs text-gray-400">
                Créez un compte pour commencer votre apprentissage.
              </p>
              <div className="border-t border-gray-800 pt-4">
                <h2 className="mb-3 font-semibold text-white">Ce cours comprend</h2>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-center gap-2"><Clock3 size={16} className="text-indigo-300" aria-hidden="true" /> {course.duration} de contenu</li>
                  <li className="flex items-center gap-2"><PlayCircle size={16} className="text-indigo-300" aria-hidden="true" /> {lessonCount} leçons réparties en {course.curriculum.length} modules</li>
                  <li className="flex items-center gap-2"><Globe2 size={16} className="text-indigo-300" aria-hidden="true" /> Cours en {course.language}</li>
                  <li className="flex items-center gap-2"><Award size={16} className="text-indigo-300" aria-hidden="true" /> Niveau {course.level.toLowerCase()}</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-10">
          <section className="rounded-2xl border border-gray-800 bg-gray-950/60 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white">Ce que vous allez apprendre</h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {course.outcomes.map((outcome) => (
                <li key={outcome} className="flex gap-3 text-sm leading-relaxed text-gray-300">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-400" aria-hidden="true" />
                  {outcome}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="mb-5 flex flex-wrap items-end justify-between gap-2">
              <div>
                <h2 className="text-2xl font-bold text-white">Programme du cours</h2>
                <p className="mt-1 text-sm text-gray-400">
                  {course.curriculum.length} modules · {lessonCount} leçons · {course.duration} au total
                </p>
              </div>
              <button
                type="button"
                onClick={() => setExpandedModules(
                  expandedModules.length === course.curriculum.length
                    ? []
                    : course.curriculum.map((_, index) => index),
                )}
                className="text-sm font-medium text-indigo-300 hover:text-indigo-200"
              >
                {expandedModules.length === course.curriculum.length ? "Tout réduire" : "Tout développer"}
              </button>
            </div>
            <div className="overflow-hidden rounded-xl border border-gray-800">
              {course.curriculum.map((module, index) => {
                const isExpanded = expandedModules.includes(index);
                return (
                  <div key={module.title} className="border-b border-gray-800 last:border-b-0">
                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      onClick={() => toggleModule(index)}
                      className="flex w-full items-center justify-between gap-4 bg-gray-950 px-5 py-4 text-left hover:bg-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500"
                    >
                      <span className="font-semibold text-white">{module.title}</span>
                      <span className="flex shrink-0 items-center gap-3 text-xs text-gray-400">
                        {module.lessons.length} leçons
                        <ChevronDown
                          size={18}
                          className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                          aria-hidden="true"
                        />
                      </span>
                    </button>
                    {isExpanded && (
                      <ul className="space-y-3 bg-black/40 px-5 py-4">
                        {module.lessons.map((lesson) => (
                          <li key={lesson.title} className="flex items-center justify-between gap-4 text-sm">
                            <span className="flex items-center gap-3 text-gray-300">
                              <PlayCircle size={16} className="shrink-0 text-gray-500" aria-hidden="true" />
                              {lesson.title}
                            </span>
                            <span className="shrink-0 text-xs text-gray-500">{lesson.duration}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">Prérequis</h2>
            <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-indigo-400">
              {course.requirements.map((requirement) => <li key={requirement}>{requirement}</li>)}
            </ul>
          </section>

          <section className="rounded-2xl border border-gray-800 bg-gray-950/60 p-6">
            <h2 className="text-2xl font-bold text-white">Votre formateur</h2>
            <p className="mt-1 font-semibold text-indigo-300">{course.instructor}</p>
            <p className="mt-3 leading-relaxed text-gray-300">{course.instructorBio}</p>
          </section>
        </div>

        <aside className="h-fit rounded-xl border border-gray-800 bg-gray-950/60 p-5 text-sm text-gray-400 lg:mt-2">
          <p className="flex items-center gap-2 font-semibold text-gray-200">
            <BookOpen size={16} className="text-indigo-300" aria-hidden="true" />
            Informations du cours
          </p>
          <p className="mt-3">Dernière mise à jour : {course.updatedAt}</p>
          <Link to="/courses" className="mt-4 inline-block font-medium text-indigo-300 hover:text-indigo-200">
            ← Retour au catalogue
          </Link>
        </aside>
      </div>
    </div>
  );
}
