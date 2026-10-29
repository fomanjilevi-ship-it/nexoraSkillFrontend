import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Flame,
  Play,
  Sparkles,
  Target,
} from "lucide-react";
import DashboardMetric from "@/components/dashboard/DashboardMetric";
import { courses } from "@/data/courses";

const enrolledCourses = [
  { course: courses[0], progress: 68, nextLesson: "Créer un hook personnalisé", studied: "Repris aujourd’hui" },
  { course: courses[1], progress: 32, nextLesson: "Form Requests et validation", studied: "Repris hier" },
  { course: courses[2], progress: 100, nextLesson: "Cours terminé", studied: "Terminé cette semaine" },
];

export default function StudentDashboard() {
  const completedCourses = enrolledCourses.filter((item) => item.progress === 100).length;
  const activeCourses = enrolledCourses.length - completedCourses;
  const averageProgress = Math.round(
    enrolledCourses.reduce((total, item) => total + item.progress, 0) / enrolledCourses.length,
  );

  return (
    <div className="space-y-8">
      <header className="rounded-xl border border-[#29292e] bg-[#101012] p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400">
              <Sparkles size={16} aria-hidden="true" />
              Votre espace d’apprentissage
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Bonjour, apprenant 👋
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-300 sm:text-base">
              Reprenez là où vous vous êtes arrêté et continuez à faire grandir vos compétences.
            </p>
          </div>
          <Link to="/courses" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-zinc-100 px-5 py-3 text-sm font-semibold text-black transition hover:bg-white">
            Explorer les cours
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <p className="mt-6 rounded-lg border border-[#303036] bg-[#17171a] px-4 py-3 text-xs leading-relaxed text-zinc-400">
          Aperçu de démonstration : les cours et la progression affichés sont des exemples et ne sont pas encore synchronisés avec un compte.
        </p>
      </header>

      <section aria-label="Résumé de l’apprentissage" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardMetric label="Cours suivis" value={`${enrolledCourses.length}`} detail="Dans votre parcours de démonstration" icon={<BookOpen size={20} aria-hidden="true" />} />
        <DashboardMetric label="En cours" value={`${activeCourses}`} detail="Reprenez une leçon quand vous le souhaitez" icon={<Play size={19} aria-hidden="true" />} />
        <DashboardMetric label="Cours terminés" value={`${completedCourses}`} detail="Une étape de plus vers vos objectifs" icon={<CheckCircle2 size={20} aria-hidden="true" />} />
        <DashboardMetric label="Progression moyenne" value={`${averageProgress}%`} detail="Sur les cours présentés ici" icon={<Target size={20} aria-hidden="true" />} />
      </section>

      <section>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">Votre parcours</p>
            <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">Reprendre l’apprentissage</h2>
          </div>
          <Link to="/courses" className="text-sm font-medium text-zinc-400 hover:text-white">
            Voir le catalogue →
          </Link>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          {enrolledCourses.map(({ course, progress, nextLesson, studied }) => (
            <article key={course.id} className="overflow-hidden rounded-xl border border-[#29292e] bg-[#101012]">
              <div className="flex gap-4 p-5 sm:p-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#303036] bg-[#19191c]">
                  {course.technologyLogos?.[0] ? (
                    <img
                      src={`https://cdn.simpleicons.org/${course.technologyLogos[0]}/${course.technologyColor ?? "6366F1"}`}
                      alt=""
                      aria-hidden="true"
                      className="h-8 w-8 object-contain"
                    />
                  ) : <BookOpen size={23} className="text-zinc-300" aria-hidden="true" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs font-medium text-zinc-500">{course.technology ?? course.category}</p>
                    <span className="text-xs text-gray-500">{studied}</span>
                  </div>
                  <h3 className="mt-1 line-clamp-2 font-semibold leading-snug text-white">{course.title}</h3>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
                    <Clock3 size={13} aria-hidden="true" />
                    {progress === 100 ? nextLesson : `Prochaine leçon : ${nextLesson}`}
                  </p>
                </div>
              </div>
              <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="text-gray-400">Progression</span>
                  <span className="font-semibold text-gray-200">{progress}%</span>
                </div>
                <div
                  role="progressbar"
                  aria-label={`Progression du cours ${course.title}`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={progress}
                  className="h-1.5 overflow-hidden rounded-full bg-[#29292e]"
                >
                  <div className="h-full rounded-full bg-zinc-300" style={{ width: `${progress}%` }} />
                </div>
                <Link
                  to={`/courses/${course.slug}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-white"
                >
                  {progress === 100 ? "Revoir le programme" : "Continuer le cours"}
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-xl border border-[#29292e] bg-[#101012] p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#303036] bg-[#19191c] text-zinc-300">
              <Flame size={20} aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-semibold text-white">Gardez votre élan</h2>
              <p className="text-xs text-gray-400">Un peu de pratique régulière fait la différence.</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-gray-300">
            Choisissez une leçon ou ouvrez l’atelier pour mettre en pratique vos connaissances en HTML, CSS et JavaScript.
          </p>
          <Link to="/atelier" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-white">
            Ouvrir l’atelier de code <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
        <div className="rounded-xl border border-[#29292e] bg-[#101012] p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">À découvrir</p>
          <h2 className="mt-2 text-lg font-bold text-white">Un nouveau projet vous attend</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-400">
            Parcourez les technologies web et mobile et trouvez un prochain sujet à apprendre.
          </p>
          <Link to="/courses" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-white">
            Trouver un cours <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
