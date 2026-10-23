import { Link, Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-black">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-xl font-bold text-indigo-600">
            EduLearn
          </Link>
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link to="/courses">Cours</Link>
            <Link to="/login">Connexion</Link>
            <Link
              to="/register"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
            >
              S'inscrire
            </Link>
          </div>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
        <Outlet />
      </main>

      <footer className="border-t py-6 text-center text-sm text-gray-500">
        © 2026 nexora. Tous droits réservés.
      </footer>
    </div>
  );
}
