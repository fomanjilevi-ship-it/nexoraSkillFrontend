import { NavLink, Outlet } from "react-router-dom";
import {
  BookOpen,
  Code2,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Shield,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Mon apprentissage", icon: LayoutDashboard },
  { to: "/mes-codes", label: "Mes codes", icon: Code2 },
  { to: "/instructor", label: "Espace formateur", icon: BookOpen },
  { to: "/admin", label: "Administration", icon: Shield },
];

export default function DashboardLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 lg:flex">
      <aside className="hidden w-64 shrink-0 border-r border-[#262626] bg-[#0c0c0e] p-5 lg:flex lg:flex-col">
        <Link to="/" className="flex items-center gap-3 text-lg font-semibold tracking-tight">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#303036] bg-[#17171a] text-zinc-300">
            <GraduationCap size={23} aria-hidden="true" />
          </span>
          <span>nexora<span className="text-zinc-500">Learn</span></span>
        </Link>

        <p className="mb-3 mt-9 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-600">
          Espace de travail
        </p>
        <nav aria-label="Navigation du tableau de bord" className="space-y-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                  isActive
                    ? "border border-[#343439] bg-[#1a1a1e] text-white"
                    : "text-zinc-500 hover:bg-[#17171a] hover:text-zinc-100"
                }`
              }
            >
              <Icon size={18} aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto rounded-xl border border-[#262626] bg-[#111113] p-4">
          <p className="text-sm font-semibold text-white">Continuez à progresser</p>
          <p className="mt-1 text-xs leading-relaxed text-gray-400">
            Découvrez des cours et pratiquez dans l’atelier de code.
          </p>
          <Link to="/courses" className="mt-4 inline-flex text-sm font-semibold text-zinc-200 hover:text-white">
            Parcourir les cours →
          </Link>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-40 border-b border-[#262626] bg-[#09090b]">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
                className="rounded-lg p-2 text-zinc-400 hover:bg-[#17171a] lg:hidden"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <Link to="/" className="text-lg font-semibold text-white lg:hidden">
                nexora<span className="text-zinc-500">Learn</span>
              </Link>
              <span className="hidden text-sm text-gray-400 sm:inline">
                Espace personnel
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/courses"
                className="hidden items-center gap-2 rounded-lg border border-[#303036] px-3 py-2 text-sm text-zinc-400 transition hover:border-[#52525b] hover:text-white sm:inline-flex"
              >
                <BookOpen size={16} aria-hidden="true" />
                Catalogue
              </Link>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#303036] bg-[#17171a] text-zinc-300">
                <UserRound size={17} aria-hidden="true" />
              </span>
            </div>
          </div>
          {menuOpen && (
            <nav aria-label="Navigation mobile du tableau de bord" className="space-y-1 border-t border-[#262626] bg-[#0c0c0e] px-4 py-3 lg:hidden">
              {links.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium ${
                      isActive ? "bg-[#1a1a1e] text-white" : "text-zinc-400 hover:bg-[#17171a]"
                    }`
                  }
                >
                  <Icon size={18} aria-hidden="true" />
                  {label}
                </NavLink>
              ))}
              <Link to="/atelier" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-zinc-400 hover:bg-[#17171a]">
                Atelier de code
              </Link>
            </nav>
          )}
        </header>

        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
          <Outlet />
        </main>

        <footer className="flex items-center justify-between border-t border-[#262626] px-4 py-5 text-xs text-zinc-600 sm:px-6 lg:px-8">
          <span>© 2026 Nexora Learn</span>
          <Link to="/" className="inline-flex items-center gap-1.5 hover:text-gray-300">
            <LogOut size={14} aria-hidden="true" />
            Retour au site
          </Link>
        </footer>
      </div>
    </div>
  );
}
