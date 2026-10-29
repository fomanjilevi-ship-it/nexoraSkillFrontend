import { Link, Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-[#262626] bg-[#09090b]">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="shrink-0 text-lg font-semibold tracking-tight text-zinc-100">
            nexora<span className="text-zinc-500">Learn</span>
          </Link>
          <div className="flex items-center gap-3 text-xs font-medium text-zinc-400 sm:gap-6 sm:text-sm">
            <Link to="/courses" className="transition-colors hover:text-white">Cours</Link>
            <Link to="/atelier" className="hidden transition-colors hover:text-white sm:inline">Atelier</Link>
            <Link to="/login" className="transition-colors hover:text-white">Connexion</Link>
            <Link
              to="/register"
              className="rounded-lg bg-zinc-100 px-3 py-2 text-xs font-semibold text-black transition-colors hover:bg-white sm:px-4 sm:text-sm"
            >
              S’inscrire
            </Link>
          </div>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
        <Outlet />
      </main>

      <footer className="mt-6 border-t border-[#262626] bg-[#09090b] py-6 text-center text-xs text-zinc-600">
        © 2026 nexora. Tous droits réservés.
      </footer>
    </div>
  );
}
