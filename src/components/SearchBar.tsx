import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const search = query.trim();
    navigate(search ? `/courses?q=${encodeURIComponent(search)}` : "/courses");
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <label htmlFor="course-search" className="sr-only">
        Rechercher un cours
      </label>
      <input
        id="course-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Rechercher un cours"
        className="w-full rounded-lg border border-gray-700 bg-gray-950 py-2 pl-4 pr-11 text-sm text-white placeholder:text-gray-400 focus:border-brand-500 focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Rechercher"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
      >
        <Search size={18} aria-hidden="true" />
      </button>
    </form>
  );
}
