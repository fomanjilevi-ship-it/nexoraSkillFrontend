import { useState } from "react";
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Code2,
  Clock3,
  Globe2,
  Lightbulb,
  PlayCircle,
  Target,
  Users,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Badge from "@/components/ui/Badge";
import StarRating from "@/components/ui/StarRating";
import { courses } from "@/data/courses";
import { formatPrice } from "@/lib/utils";
import { getLessonExplanation } from "@/lib/lessonContent";
import NotFound from "@/pages/NotFound";

export default function CourseDetail() {
  const { slug } = useParams();
  const course = courses.find((item) => item.slug === slug);
  const [expandedModules, setExpandedModules] = useState<number[]>([0]);
  const [activeLesson, setActiveLesson] = useState<string | null>(null);

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
      <section className="border-b border-[#262626] bg-[#101012]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:py-14">
          <div>
            <nav aria-label="Fil d’Ariane" className="mb-6 text-sm text-gray-400">
              <Link to="/courses" className="hover:text-white">Cours</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-200">{course.category}</span>
            </nav>
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge className="border border-[#343439] bg-[#1a1a1d] text-zinc-300">{course.category}</Badge>
              {course.technology && (
                <Badge className="border border-[#343439] bg-[#1a1a1d] text-zinc-300">{course.technology}</Badge>
              )}
              <Badge className="border border-[#343439] bg-[#1a1a1d] text-zinc-300">{course.level}</Badge>
              {course.bestseller && <Badge className="border border-[#343439] bg-[#202024] text-zinc-200">Populaire</Badge>}
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

          <aside className="h-fit overflow-hidden rounded-xl border border-[#303036] bg-[#0c0c0e] lg:sticky lg:top-24">
            <div className="flex aspect-video items-center justify-center border-b border-[#262626] bg-[#17171a]">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#3a3a40] bg-[#202024] text-zinc-200">
                <PlayCircle size={34} aria-hidden="true" />
              </div>
            </div>
            <div className="space-y-5 p-6">
              <p className="text-3xl font-bold text-white">{formatPrice(course.price)}</p>
              <Link
                to="/register"
                className="block rounded-lg bg-zinc-100 px-5 py-3 text-center font-semibold text-black transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
              >
                S’inscrire à ce cours
              </Link>
              <p className="text-center text-xs text-gray-400">
                Créez un compte pour commencer votre apprentissage.
              </p>
              <div className="border-t border-gray-800 pt-4">
                <h2 className="mb-3 font-semibold text-white">Ce cours comprend</h2>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-center gap-2"><Clock3 size={16} className="text-zinc-500" aria-hidden="true" /> {course.duration} de contenu</li>
                  <li className="flex items-center gap-2"><PlayCircle size={16} className="text-zinc-500" aria-hidden="true" /> {lessonCount} leçons réparties en {course.curriculum.length} modules</li>
                  <li className="flex items-center gap-2"><Globe2 size={16} className="text-zinc-500" aria-hidden="true" /> Cours en {course.language}</li>
                  <li className="flex items-center gap-2"><Award size={16} className="text-zinc-500" aria-hidden="true" /> Niveau {course.level.toLowerCase()}</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-10">
          <section className="flex flex-col gap-4 rounded-xl border border-[#303036] bg-[#101012] p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-bold text-white">Apprendre en pratiquant</h2>
              <p className="mt-1 text-sm text-gray-300">
                Ouvrez les leçons pour leurs explications et exercices, puis testez HTML, CSS et JavaScript dans l’atelier.
              </p>
            </div>
            <Link
              to="/atelier"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-zinc-100 px-4 py-2.5 text-sm font-semibold text-black hover:bg-white"
            >
              <Code2 size={17} aria-hidden="true" />
              Ouvrir l’atelier
            </Link>
          </section>

          <section className="rounded-xl border border-[#29292e] bg-[#101012] p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-white">Ce que vous allez apprendre</h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {course.outcomes.map((outcome) => (
                <li key={outcome} className="flex gap-3 text-sm leading-relaxed text-gray-300">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-zinc-400" aria-hidden="true" />
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
                className="text-sm font-medium text-zinc-400 hover:text-white"
              >
                {expandedModules.length === course.curriculum.length ? "Tout réduire" : "Tout développer"}
              </button>
            </div>
            <div className="overflow-hidden rounded-xl border border-[#303036]">
              {course.curriculum.map((module, index) => {
                const isExpanded = expandedModules.includes(index);
                return (
                  <div key={module.title} className="border-b border-[#262626] last:border-b-0">
                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      onClick={() => toggleModule(index)}
                      className="flex w-full items-center justify-between gap-4 bg-[#111113] px-5 py-4 text-left hover:bg-[#18181b] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-zinc-500"
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
                      <ul className="divide-y divide-[#262626] bg-[#0c0c0e]">
                        {module.lessons.map((lesson, lessonIndex) => {
                          const lessonId = `${index}-${lessonIndex}`;
                          const isLessonActive = activeLesson === lessonId;
                          const explanation = getLessonExplanation(course, module.title, lesson.title);

                          return (
                            <li key={lesson.title}>
                              <button
                                type="button"
                                aria-expanded={isLessonActive}
                                onClick={() => setActiveLesson(isLessonActive ? null : lessonId)}
                                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500"
                              >
                                <span className="flex items-center gap-3 text-sm text-gray-300">
                                  <PlayCircle size={16} className="shrink-0 text-zinc-500" aria-hidden="true" />
                                  {lesson.title}
                                </span>
                                <span className="flex shrink-0 items-center gap-3 text-xs text-gray-500">
                                  {lesson.duration}
                                  <ChevronDown
                                    size={16}
                                    className={`transition-transform ${isLessonActive ? "rotate-180" : ""}`}
                                    aria-hidden="true"
                                  />
                                </span>
                              </button>
                              {isLessonActive && (
                                <div className="space-y-5 border-t border-[#262626] bg-[#101012] px-5 py-5 text-sm leading-relaxed text-zinc-400">
                                  <p>{explanation.introduction}</p>
                                  <div>
                                    <h3 className="flex items-center gap-2 font-semibold text-white">
                                      <BookOpen size={16} className="text-zinc-400" aria-hidden="true" />
                                      Explication
                                    </h3>
                                    <p className="mt-2">{explanation.details}</p>
                                  </div>
                                  <div>
                                    <h3 className="flex items-center gap-2 font-semibold text-white">
                                      <Lightbulb size={16} className="text-zinc-400" aria-hidden="true" />
                                      À retenir
                                    </h3>
                                    <ul className="mt-2 list-inside list-disc space-y-1 marker:text-zinc-500">
                                      {explanation.takeaways.map((takeaway) => (
                                        <li key={takeaway}>{takeaway}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="rounded-lg border border-[#303036] bg-[#17171a] p-4">
                                  <h3 className="flex items-center gap-2 font-semibold text-zinc-200">
                                      <Target size={16} aria-hidden="true" />
                                      Exercice pratique
                                    </h3>
                                    <p className="mt-2">{explanation.exercise}</p>
                                    <Link
                                      to="/atelier"
                                      className="mt-3 inline-flex items-center gap-2 font-semibold text-zinc-300 hover:text-white"
                                    >
                                      <Code2 size={15} aria-hidden="true" />
                                      Essayer dans l’atelier
                                    </Link>
                                  </div>
                                </div>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white">Prérequis</h2>
            <ul className="mt-4 list-inside list-disc space-y-2 text-gray-300 marker:text-zinc-500">
              {course.requirements.map((requirement) => <li key={requirement}>{requirement}</li>)}
            </ul>
          </section>

          <section className="rounded-xl border border-[#29292e] bg-[#101012] p-6">
            <h2 className="text-2xl font-bold text-white">Votre formateur</h2>
            <p className="mt-1 font-semibold text-zinc-300">{course.instructor}</p>
            <p className="mt-3 leading-relaxed text-gray-300">{course.instructorBio}</p>
          </section>
        </div>

        <aside className="h-fit rounded-xl border border-[#29292e] bg-[#101012] p-5 text-sm text-zinc-500 lg:mt-2">
          <p className="flex items-center gap-2 font-semibold text-zinc-200">
            <BookOpen size={16} className="text-zinc-400" aria-hidden="true" />
            Informations du cours
          </p>
          <p className="mt-3">Dernière mise à jour : {course.updatedAt}</p>
          <Link to="/courses" className="mt-4 inline-block font-medium text-zinc-300 hover:text-white">
            ← Retour au catalogue
          </Link>
        </aside>
      </div>
    </div>
  );
}
