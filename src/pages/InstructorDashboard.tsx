import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CirclePlus,
  Eye,
  MessageSquareText,
  Star,
  Users,
} from "lucide-react";
import DashboardMetric from "@/components/dashboard/DashboardMetric";
import { courses } from "@/data/courses";

const instructorName = "Awa Diallo";
const instructorCourses = courses.filter((course) => course.instructor === instructorName);
const studentTotal = instructorCourses.reduce((total, course) => total + course.studentsCount, 0);
const averageRating = instructorCourses.length
  ? instructorCourses.reduce((total, course) => total + course.rating, 0) / instructorCourses.length
  : 0;

export default function InstructorDashboard() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col justify-between gap-5 rounded-xl border border-[#29292e] bg-[#101012] p-6 sm:flex-row sm:items-end sm:p-8">
        <div>
          <p className="text-sm font-medium text-zinc-500">Espace formateur</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Bonjour, {instructorName}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-300">
            Retrouvez vos cours publiés et suivez leur activité depuis un seul endroit.
          </p>
        </div>
        <Link to="/courses" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-zinc-100 px-5 py-3 text-sm font-semibold text-black transition hover:bg-white">
          <CirclePlus size={17} aria-hidden="true" />
          Découvrir le catalogue
        </Link>
      </header>

      <p className="rounded-lg border border-[#303036] bg-[#17171a] px-4 py-3 text-xs leading-relaxed text-zinc-400">
        Aperçu de démonstration : les indicateurs reprennent les données du catalogue. La création de cours, les avis et les statistiques réelles ne sont pas encore connectés à un service.
      </p>

      <section aria-label="Activité des cours" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardMetric label="Cours publiés" value={`${instructorCourses.length}`} detail="Cours associés à ce profil de démonstration" icon={<BookOpen size={20} aria-hidden="true" />} />
        <DashboardMetric label="Apprenants" value={studentTotal.toLocaleString("fr-FR")} detail="Effectifs d’exemple du catalogue" icon={<Users size={20} aria-hidden="true" />} />
        <DashboardMetric label="Note moyenne" value={averageRating.toFixed(1)} detail="Notes d’exemple des cours publiés" icon={<Star size={20} aria-hidden="true" />} />
        <DashboardMetric label="Avis reçus" value={instructorCourses.reduce((total, course) => total + course.reviewsCount, 0).toLocaleString("fr-FR")} detail="Avis fictifs affichés dans le catalogue" icon={<MessageSquareText size={20} aria-hidden="true" />} />
      </section>

      <section>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600">Contenu pédagogique</p>
            <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">Vos cours</h2>
          </div>
          <span className="text-sm text-gray-400">{instructorCourses.length} cours</span>
        </div>

        {instructorCourses.length > 0 ? (
          <div className="space-y-3">
            {instructorCourses.map((course) => (
              <article key={course.id} className="flex flex-col gap-4 rounded-xl border border-[#29292e] bg-[#101012] p-5 sm:flex-row sm:items-center">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#303036] bg-[#19191c]">
                  {course.technologyLogos?.[0] ? (
                    <img
                      src={`https://cdn.simpleicons.org/${course.technologyLogos[0]}/${course.technologyColor ?? "6366F1"}`}
                      alt=""
                      aria-hidden="true"
                      className="h-7 w-7 object-contain"
                    />
                  ) : <BookOpen size={20} className="text-zinc-300" aria-hidden="true" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-zinc-500">{course.technology ?? course.category} · {course.level}</p>
                  <h3 className="mt-1 font-semibold text-white">{course.title}</h3>
                  <p className="mt-1 text-xs text-gray-500">Mis à jour : {course.updatedAt}</p>
                </div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-400">
                  <span className="inline-flex items-center gap-1.5"><Users size={15} aria-hidden="true" />{course.studentsCount.toLocaleString("fr-FR")}</span>
                  <span className="inline-flex items-center gap-1.5"><Star size={15} className="fill-zinc-300 text-zinc-300" aria-hidden="true" />{course.rating.toFixed(1)}</span>
                  <Link to={`/courses/${course.slug}`} className="inline-flex items-center gap-1.5 font-semibold text-zinc-300 hover:text-white">
                    <Eye size={15} aria-hidden="true" /> Voir
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-[#3a3a40] p-10 text-center">
            <BookOpen className="mx-auto text-gray-500" size={28} aria-hidden="true" />
            <p className="mt-3 font-semibold text-white">Aucun cours à afficher</p>
            <p className="mt-1 text-sm text-gray-400">Les cours publiés par ce profil apparaîtront ici.</p>
          </div>
        )}
      </section>

      <section className="rounded-xl border border-[#29292e] bg-[#101012] p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold text-white">Gérez votre contenu pédagogique</h2>
            <p className="mt-1 text-sm text-gray-400">La création et la modification des cours seront disponibles avec la gestion formateur.</p>
          </div>
          <Link to="/courses" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-white">
            Prévisualiser le catalogue <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
