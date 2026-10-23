import CourseCard from "@/components/course/CourseCard";
import type { Course } from "@/types/course";

const mock: Course[] = [
  {
    id: 1,
    slug: "react-de-zero-a-expert",
    title: "React de zéro à expert : le guide complet",
    instructor: "Awa Diallo",
    rating: 4.7,
    reviewsCount: 2340,
    studentsCount: 15200,
    price: 29.99,
    level: "Débutant",
    category: "Développement web",
    bestseller: true,
  },
  {
    id: 2,
    slug: "laravel-api-rest",
    title: "Créer une API REST professionnelle avec Laravel",
    instructor: "Jean Martin",
    rating: 4.5,
    reviewsCount: 870,
    studentsCount: 6400,
    price: 39.99,
    level: "Intermédiaire",
    category: "Développement web",
  },
  {
    id: 3,
    slug: "introduction-ux-design",
    title: "Introduction au design UX/UI",
    instructor: "Sara Benali",
    rating: 4.8,
    reviewsCount: 1290,
    studentsCount: 9800,
    price: 0,
    level: "Débutant",
    category: "Design",
  },
  {
    id: 4,
    slug: "typescript-avance",
    title: "TypeScript avancé : types, génériques et patterns",
    instructor: "Marc Dupont",
    rating: 4.6,
    reviewsCount: 540,
    studentsCount: 3100,
    price: 49.99,
    level: "Avancé",
    category: "Développement web",
  },
];

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
          {mock.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </section>
    </div>
  );
}
