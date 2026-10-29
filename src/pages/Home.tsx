import CourseCard from "@/components/course/CourseCard";
import { courses } from "@/data/courses";

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="space-y-3 py-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-500">
          Nexora Learn
        </p>
        <h1 className="max-w-3xl text-4xl font-bold text-white sm:text-5xl">
          Apprenez une compétence. Ouvrez de nouvelles possibilités.
        </h1>
        <p className="max-w-2xl text-base text-gray-300">
          Des cours pratiques en développement et en design, conçus pour vous
          faire progresser à votre rythme.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-white">Cours populaires</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {courses.slice(0, 4).map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </section>
    </div>
  );
}
