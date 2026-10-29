import { useMemo, useState } from "react";
import { BookOpen, Search, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import CourseCard from "@/components/course/CourseCard";
import { courses } from "@/data/courses";
import type { Course } from "@/types/course";

type SortOrder = "popular" | "rating" | "price-asc" | "price-desc";

export default function Courses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState("Toutes les catégories");
  const [level, setLevel] = useState("Tous les niveaux");
  const [sortOrder, setSortOrder] = useState<SortOrder>("popular");
  const [freeOnly, setFreeOnly] = useState(false);
  const query = searchParams.get("q") ?? "";
  const categories = [...new Set(courses.map((course) => course.category))];

  const visibleCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("fr");
    const filtered = courses.filter((course) => {
      const matchesQuery =
        !normalizedQuery ||
        `${course.title} ${course.instructor} ${course.category} ${course.description}`
          .toLocaleLowerCase("fr")
          .includes(normalizedQuery);

      return (
        matchesQuery &&
        (category === "Toutes les catégories" || course.category === category) &&
        (level === "Tous les niveaux" || course.level === level) &&
        (!freeOnly || course.price === 0)
      );
    });

    return filtered.sort((a, b) => {
      if (sortOrder === "rating") return b.rating - a.rating;
      if (sortOrder === "price-asc") return a.price - b.price;
      if (sortOrder === "price-desc") return b.price - a.price;
      return b.studentsCount - a.studentsCount;
    });
  }, [category, freeOnly, level, query, sortOrder]);

  function updateSearch(value: string) {
    const nextParams = new URLSearchParams(searchParams);
    if (value) nextParams.set("q", value);
    else nextParams.delete("q");
    setSearchParams(nextParams, { replace: true });
  }

  function resetFilters() {
    setCategory("Toutes les catégories");
    setLevel("Tous les niveaux");
    setFreeOnly(false);
    setSortOrder("popular");
    updateSearch("");
  }

  return (
    <div className="space-y-8 pb-12">
      <header className="rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-950 to-black px-6 py-10 sm:px-10">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-300">
          Apprendre à votre rythme
        </p>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Explorer les cours</h1>
        <p className="mt-3 max-w-2xl text-slate-300">
          Des parcours pratiques en développement web, mobile et en design,
          conçus pour vous faire progresser étape par étape.
        </p>
        <div className="mt-6 flex items-center gap-2 text-sm text-indigo-200">
          <BookOpen size={17} aria-hidden="true" />
          {courses.length} cours disponibles
        </div>
      </header>

      <section aria-label="Recherche et filtres" className="space-y-4">
        <div className="relative">
          <label htmlFor="catalog-search" className="sr-only">
            Rechercher par cours, catégorie ou formateur
          </label>
          <Search
            aria-hidden="true"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            id="catalog-search"
            type="search"
            value={query}
            onChange={(event) => updateSearch(event.target.value)}
            placeholder="Rechercher un cours, une catégorie ou un formateur…"
            className="w-full rounded-xl border border-gray-700 bg-gray-950 py-3 pl-11 pr-4 text-white placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-gray-800 bg-gray-950/70 p-4 lg:flex-row lg:items-center">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-300">
            <SlidersHorizontal size={17} aria-hidden="true" />
            Filtres
          </div>
          <div className="grid flex-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <label className="sr-only" htmlFor="category-filter">Catégorie</label>
            <select
              id="category-filter"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="rounded-lg border border-gray-700 bg-black px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
            >
              <option>Toutes les catégories</option>
              {categories.map((item) => <option key={item}>{item}</option>)}
            </select>

            <label className="sr-only" htmlFor="level-filter">Niveau</label>
            <select
              id="level-filter"
              value={level}
              onChange={(event) => setLevel(event.target.value)}
              className="rounded-lg border border-gray-700 bg-black px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
            >
              <option>Tous les niveaux</option>
              {(["Débutant", "Intermédiaire", "Avancé"] satisfies Course["level"][]).map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <label className="sr-only" htmlFor="sort-filter">Trier les cours</label>
            <select
              id="sort-filter"
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value as SortOrder)}
              className="rounded-lg border border-gray-700 bg-black px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
            >
              <option value="popular">Les plus suivis</option>
              <option value="rating">Les mieux notés</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
            </select>
          </div>
          <label className="flex shrink-0 cursor-pointer items-center gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={freeOnly}
              onChange={(event) => setFreeOnly(event.target.checked)}
              className="h-4 w-4 accent-indigo-500"
            />
            Cours gratuits
          </label>
        </div>
      </section>

      <section aria-live="polite">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-white">
            {visibleCourses.length} résultat{visibleCourses.length !== 1 ? "s" : ""}
          </h2>
          {visibleCourses.length !== courses.length && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-sm font-medium text-indigo-300 hover:text-indigo-200"
            >
              Effacer les filtres
            </button>
          )}
        </div>
        {visibleCourses.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleCourses.map((course) => <CourseCard key={course.id} course={course} />)}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-gray-700 px-6 py-12 text-center">
            <p className="font-semibold text-white">Aucun cours ne correspond à votre recherche.</p>
            <p className="mt-2 text-sm text-gray-400">Essayez d'autres mots-clés ou retirez un filtre.</p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Voir tous les cours
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
