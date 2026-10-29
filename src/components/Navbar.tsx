import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { GraduationCap, Menu, X } from 'lucide-react'
import SearchBar from '@/components/SearchBar'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium ${isActive ? 'text-brand-600' : 'text-gray-700 hover:text-brand-600'}`

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-3">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-brand-600">
          <GraduationCap size={28} />
          nexoralearn
        </Link>

        <NavLink to="/courses" className={`${linkClass} hidden md:block`}>
          Cours
        </NavLink>

        <div className="hidden max-w-xl flex-1 md:block">
          <SearchBar />
        </div>

        <div className="ml-auto hidden items-center gap-3 md:flex">
          <Link to="/login" className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold hover:bg-gray-50">
            Connexion
          </Link>
          <Link to="/register" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
            S'inscrire
          </Link>
        </div>

        <button
          className="ml-auto cursor-pointer md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="flex flex-col gap-4 border-t border-gray-200 px-6 py-4 md:hidden">
          <SearchBar />
          <Link to="/courses" onClick={() => setOpen(false)}>Cours</Link>
          <Link to="/login" onClick={() => setOpen(false)}>Connexion</Link>
          <Link to="/register" onClick={() => setOpen(false)} className="font-semibold text-brand-600">
            S'inscrire
          </Link>
        </div>
      )}
    </header>
  )
}