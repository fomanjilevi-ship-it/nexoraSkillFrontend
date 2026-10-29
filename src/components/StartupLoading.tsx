import { BookOpenCheck } from "lucide-react";

export default function StartupLoading() {
  return (
    <main
      className="flex min-h-screen items-center justify-center overflow-hidden bg-[#09090b] px-6 text-white"
      role="status"
      aria-live="polite"
    >
      <section className="relative flex flex-col items-center text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl border border-[#303036] bg-[#17171a] text-zinc-300">
          <BookOpenCheck aria-hidden="true" size={32} strokeWidth={1.8} />
        </div>
        <p className="text-2xl font-bold tracking-tight">
          nexora<span className="text-zinc-500">Learn</span>
        </p>
        <p className="mt-3 text-sm text-slate-400">
          Votre espace d’apprentissage se prépare…
        </p>
        <div
          aria-hidden="true"
          className="mt-8 h-6 w-6 animate-spin rounded-full border-2 border-[#303036] border-t-zinc-200 motion-reduce:animate-none"
        />
        <span className="sr-only">Chargement de la plateforme</span>
      </section>
    </main>
  );
}
