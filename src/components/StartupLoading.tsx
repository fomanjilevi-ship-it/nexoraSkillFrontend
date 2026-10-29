import { BookOpenCheck } from "lucide-react";

export default function StartupLoading() {
  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080b14] px-6 text-white"
      role="status"
      aria-live="polite"
    >
      <div
        aria-hidden="true"
        className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-indigo-600/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-violet-600/15 blur-3xl"
      />

      <section className="relative flex flex-col items-center text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-400 ring-1 ring-indigo-400/25">
          <BookOpenCheck aria-hidden="true" size={32} strokeWidth={1.8} />
        </div>
        <p className="text-2xl font-bold tracking-tight">
          nexora<span className="text-indigo-400">Learn</span>
        </p>
        <p className="mt-3 text-sm text-slate-400">
          Votre espace d’apprentissage se prépare…
        </p>
        <div
          aria-hidden="true"
          className="mt-8 h-6 w-6 animate-spin rounded-full border-2 border-indigo-400/25 border-t-indigo-400 motion-reduce:animate-none"
        />
        <span className="sr-only">Chargement de la plateforme</span>
      </section>
    </main>
  );
}
