import { useMemo, useState } from "react";
import { BookOpen, Code2, Search, SlidersHorizontal, Sparkles } from "lucide-react";
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
    <div className="space-y-9 pb-16">
      <header className="rounded-xl border border-[#29292e] bg-[#101012] px-6 py-9 sm:px-10 sm:py-12">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
            <Sparkles size={14} aria-hidden="true" />
            Nexora Learn / Catalogue
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Apprendre, construire, <span className="text-zinc-500">progresser.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            Explorez des cours pratiques en développement web, mobile et design.
            Apprenez les outils du métier et créez des projets concrets.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-lg border border-[#303036] bg-[#17171a] px-3 py-2 text-sm font-medium text-zinc-300">
              <BookOpen size={16} className="text-zinc-400" aria-hidden="true" />
              {courses.length} cours
            </span>
            <span className="inline-flex items-center gap-2 rounded-lg border border-[#303036] bg-[#17171a] px-3 py-2 text-sm font-medium text-zinc-300">
              <Code2 size={16} className="text-zinc-400" aria-hidden="true" />
              Web & mobile
            </span>
          </div>
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
            className="w-full rounded-xl border border-[#303036] bg-[#101012] py-3.5 pl-12 pr-4 text-white placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20"
          />
        </div>

        <div className="flex flex-col gap-4 rounded-xl border border-[#29292e] bg-[#101012] p-4 sm:p-5 lg:flex-row lg:items-center">
          <div className="flex shrink-0 items-center gap-2 text-sm font-medium text-zinc-300">
            <SlidersHorizontal size={17} className="text-zinc-500" aria-hidden="true" />
            Affiner les résultats
          </div>
          <div className="grid flex-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <label className="sr-only" htmlFor="category-filter">Catégorie</label>
            <select
              id="category-filter"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="rounded-lg border border-[#303036] bg-[#09090b] px-3 py-2.5 text-sm text-zinc-300 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20"
            >
              <option>Toutes les catégories</option>
              {categories.map((item) => <option key={item}>{item}</option>)}
            </select>

            <label className="sr-only" htmlFor="level-filter">Niveau</label>
            <select
              id="level-filter"
              value={level}
              onChange={(event) => setLevel(event.target.value)}
              className="rounded-lg border border-[#303036] bg-[#09090b] px-3 py-2.5 text-sm text-zinc-300 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20"
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
              className="rounded-lg border border-[#303036] bg-[#09090b] px-3 py-2.5 text-sm text-zinc-300 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20"
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
              className="h-4 w-4 accent-zinc-300"
            />
            Cours gratuits
          </label>
        </div>
      </section>

      <section aria-live="polite">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-600">Le catalogue</p>
            <h2 className="mt-1 text-xl font-bold text-white">
            {visibleCourses.length} résultat{visibleCourses.length !== 1 ? "s" : ""}
            </h2>
          </div>
          {visibleCourses.length !== courses.length && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-sm font-medium text-zinc-400 hover:text-white"
            >
              Effacer les filtres
            </button>
          )}
        </div>
        {visibleCourses.length ? (
          <div className="grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {visibleCourses.map((course) => <CourseCard key={course.id} course={course} />)}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-gray-700 px-6 py-12 text-center">
            <p className="font-semibold text-white">Aucun cours ne correspond à votre recherche.</p>
            <p className="mt-2 text-sm text-gray-400">Essayez d'autres mots-clés ou retirez un filtre.</p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 rounded-lg bg-zinc-100 px-4 py-2 text-sm font-semibold text-black hover:bg-white"
            >
              Voir tous les cours
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
