import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  BookOpen,
  CircleDollarSign,
  GraduationCap,
  Layers3,
  Search,
  Users,
} from "lucide-react";
import DashboardMetric from "@/components/dashboard/DashboardMetric";
import { courses } from "@/data/courses";

const categories = [...new Set(courses.map((course) => course.category))];
const learnerCount = courses.reduce((total, course) => total + course.studentsCount, 0);
const freeCourses = courses.filter((course) => course.price === 0).length;
const paidCourses = courses.length - freeCourses;

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col justify-between gap-5 rounded-xl border border-[#29292e] bg-[#101012] p-6 sm:flex-row sm:items-end sm:p-8">
        <div>
          <p className="text-sm font-medium text-zinc-500">Administration</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Vue d’ensemble
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-300">
            Consultez le catalogue de formation et son organisation sur Nexora Learn.
          </p>
        </div>
        <Link to="/courses" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-[#3a3a40] bg-[#1a1a1d] px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:bg-[#222226]">
          <Search size={16} aria-hidden="true" />
          Ouvrir le catalogue
        </Link>
      </header>

      <p className="rounded-lg border border-[#303036] bg-[#17171a] px-4 py-3 text-xs leading-relaxed text-zinc-400">
        Aperçu de démonstration : les indicateurs sont calculés à partir des cours exemples du catalogue. Ils ne représentent pas des statistiques de production ou des comptes réels.
      </p>

      <section aria-label="Indicateurs de la plateforme" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardMetric label="Cours au catalogue" value={`${courses.length}`} detail="Cours exemples actuellement affichés" icon={<BookOpen size={20} aria-hidden="true" />} />
        <DashboardMetric label="Catégories" value={`${categories.length}`} detail={categories.join(" · ")} icon={<Layers3 size={20} aria-hidden="true" />} />
        <DashboardMetric label="Apprenants des cours" value={learnerCount.toLocaleString("fr-FR")} detail="Somme des effectifs d’exemple du catalogue" icon={<Users size={20} aria-hidden="true" />} />
        <DashboardMetric label="Cours gratuits" value={`${freeCourses}`} detail={`${paidCourses} cours payants dans le catalogue exemple`} icon={<CircleDollarSign size={20} aria-hidden="true" />} />
      </section>

      <section>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">Gestion du contenu</p>
            <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">Cours récents</h2>
          </div>
          <Link to="/courses" className="text-sm font-medium text-zinc-400 hover:text-white">
            Voir le catalogue →
          </Link>
        </div>

        <div className="overflow-hidden rounded-xl border border-[#29292e] bg-[#101012]">
          <div className="hidden grid-cols-[minmax(0,1.8fr)_1fr_0.7fr_0.6fr] gap-4 border-b border-[#262626] bg-[#17171a] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 md:grid">
            <span>Formation</span>
            <span>Catégorie</span>
            <span>Niveau</span>
            <span>Tarif</span>
          </div>
          <div className="divide-y divide-[#242427]">
            {courses.slice(0, 7).map((course) => (
              <Link
                key={course.id}
                to={`/courses/${course.slug}`}
                className="grid gap-3 px-5 py-4 transition hover:bg-[#17171a] md:grid-cols-[minmax(0,1.8fr)_1fr_0.7fr_0.6fr] md:items-center md:gap-4"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#303036] bg-[#19191c]">
                    {course.technologyLogos?.[0] ? (
                      <img
                        src={`https://cdn.simpleicons.org/${course.technologyLogos[0]}/${course.technologyColor ?? "6366F1"}`}
                        alt=""
                        aria-hidden="true"
                        className="h-6 w-6 object-contain"
                      />
                    ) : <GraduationCap size={19} className="text-zinc-400" aria-hidden="true" />}
                  </span>
                  <span className="min-w-0">
                    <span className="block line-clamp-1 text-sm font-semibold text-white">{course.title}</span>
                    <span className="mt-1 block text-xs text-gray-500">{course.instructor}</span>
                  </span>
                </span>
                <span className="text-xs text-gray-400 md:text-sm">{course.category}</span>
                <span className="text-xs text-gray-400 md:text-sm">{course.level}</span>
                <span className="flex items-center justify-between gap-2 text-sm font-semibold text-gray-200">
                  {course.price === 0 ? "Gratuit" : new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(course.price)}
                  <ArrowUpRight size={15} className="text-gray-500" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-xl border border-[#29292e] bg-[#101012] p-5 sm:p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#303036] bg-[#19191c] text-zinc-300">
            <Layers3 size={20} aria-hidden="true" />
          </div>
          <h2 className="mt-4 font-semibold text-white">Organisation du catalogue</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-400">
            Les cours sont classés par catégorie, niveau et technologie. La recherche et les filtres sont disponibles dans le catalogue public.
          </p>
          <Link to="/courses" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-white">
            Vérifier les filtres <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </article>
        <article className="rounded-xl border border-[#29292e] bg-[#101012] p-5 sm:p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#303036] bg-[#19191c] text-zinc-300">
            <GraduationCap size={20} aria-hidden="true" />
          </div>
          <h2 className="mt-4 font-semibold text-white">Expérience d’apprentissage</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-400">
            Les fiches incluent les programmes, les explications de leçons et un atelier de pratique HTML, CSS et JavaScript.
          </p>
          <Link to="/atelier" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-white">
            Ouvrir l’atelier <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </article>
      </section>
    </div>
  );
}
