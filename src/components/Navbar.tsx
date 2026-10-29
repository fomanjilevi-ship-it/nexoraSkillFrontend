import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { GraduationCap, Menu, X } from 'lucide-react'
import SearchBar from '@/components/SearchBar'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-zinc-500 hover:text-white'}`

  return (
    <header className="sticky top-0 z-50 border-b border-[#262626] bg-[#09090b]">
      <nav className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight text-zinc-100">
          <GraduationCap size={24} className="text-zinc-400" />
          nexora<span className="text-zinc-500">Learn</span>
        </Link>

        <NavLink to="/courses" className={`${linkClass} hidden md:block`}>
          Cours
        </NavLink>

        <div className="hidden max-w-xl flex-1 md:block">
          <SearchBar />
        </div>

        <div className="ml-auto hidden items-center gap-3 md:flex">
          <Link to="/login" className="rounded-lg border border-[#303036] px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-[#17171a]">
            Connexion
          </Link>
          <Link to="/register" className="rounded-lg bg-zinc-100 px-4 py-2 text-sm font-semibold text-black hover:bg-white">
            S'inscrire
          </Link>
        </div>

        <button
          className="ml-auto cursor-pointer text-zinc-300 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="flex flex-col gap-4 border-t border-[#262626] bg-[#0c0c0e] px-6 py-4 text-zinc-300 md:hidden">
          <SearchBar />
          <Link to="/courses" onClick={() => setOpen(false)}>Cours</Link>
          <Link to="/login" onClick={() => setOpen(false)}>Connexion</Link>
          <Link to="/register" onClick={() => setOpen(false)} className="font-semibold text-white">
            S'inscrire
          </Link>
        </div>
      )}
    </header>
  )
}