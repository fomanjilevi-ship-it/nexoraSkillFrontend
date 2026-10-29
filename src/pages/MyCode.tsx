import { useState } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, Code2, ExternalLink, Plus, Trash2 } from "lucide-react";
import {
  deleteCodeProject,
  readCodeProjects,
  type CodeProject,
} from "@/lib/codeProjects";

export default function MyCode() {
  const [storedProjects, setStoredProjects] = useState(() => {
    try {
      return { projects: readCodeProjects(), error: "" };
    } catch (caught) {
      return {
        projects: [] as CodeProject[],
        error: caught instanceof Error ? caught.message : "Impossible de lire les projets.",
      };
    }
  });
  const { projects, error } = storedProjects;

  function refreshProjects() {
    try {
      setStoredProjects({ projects: readCodeProjects(), error: "" });
    } catch (caught) {
      setStoredProjects({
        projects: [],
        error: caught instanceof Error ? caught.message : "Impossible de lire les projets.",
      });
    }
  }

  function removeProject(project: CodeProject) {
    if (!window.confirm(`Supprimer « ${project.title} » ? Cette action est définitive.`)) return;
    try {
      deleteCodeProject(project.id);
      refreshProjects();
    } catch (caught) {
      setStoredProjects((current) => ({
        ...current,
        error: caught instanceof Error ? caught.message : "Impossible de supprimer ce projet.",
      }));
    }
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-col justify-between gap-5 rounded-xl border border-[#29292e] bg-[#101012] p-6 sm:flex-row sm:items-end sm:p-8">
        <div>
          <p className="text-sm font-medium text-zinc-500">Espace de pratique</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Mes codes</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-300">
            Retrouvez vos projets HTML, CSS et JavaScript, puis reprenez-les dans l’atelier.
          </p>
        </div>
        <Link to="/atelier" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-zinc-100 px-5 py-3 text-sm font-semibold text-black transition hover:bg-white">
          <Plus size={17} aria-hidden="true" />
          Nouveau projet
        </Link>
      </header>

      <p className="rounded-lg border border-[#303036] bg-[#17171a] px-4 py-3 text-xs leading-relaxed text-zinc-400">
        Vos projets sont sauvegardés dans le stockage local de ce navigateur. Ils ne sont pas encore synchronisés avec un compte et ne sont pas accessibles sur un autre appareil.
      </p>

      {error && (
        <p role="alert" className="flex items-start gap-2 rounded-xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-200">
          <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}

      {projects.length > 0 ? (
        <section aria-label="Projets enregistrés" className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <article key={project.id} className="flex flex-col rounded-xl border border-[#29292e] bg-[#101012] p-5 transition-colors hover:border-[#48484f]">
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#303036] bg-[#19191c] text-zinc-300">
                  <Code2 size={21} aria-hidden="true" />
                </span>
                <button
                  type="button"
                  onClick={() => removeProject(project)}
                  aria-label={`Supprimer ${project.title}`}
                  className="rounded-lg p-2 text-gray-500 hover:bg-red-500/10 hover:text-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                >
                  <Trash2 size={17} aria-hidden="true" />
                </button>
              </div>
              <h2 className="mt-4 line-clamp-1 text-lg font-semibold text-white">{project.title}</h2>
              <p className="mt-1 text-xs text-gray-500">
                Modifié le {new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(project.updatedAt))}
              </p>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-gray-400">
                <span className="rounded-lg border border-[#303036] bg-[#17171a] px-2 py-2">HTML</span>
                <span className="rounded-lg border border-[#303036] bg-[#17171a] px-2 py-2">CSS</span>
                <span className="rounded-lg border border-[#303036] bg-[#17171a] px-2 py-2">JavaScript</span>
              </div>
              <Link
                to={`/atelier?project=${encodeURIComponent(project.id)}`}
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg border border-[#343439] bg-[#19191c] px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-[#52525b] hover:text-white"
              >
                Ouvrir dans l’atelier
                <ExternalLink size={15} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </section>
      ) : (
        <section className="rounded-xl border border-dashed border-[#3a3a40] bg-[#101012] px-6 py-14 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl border border-[#303036] bg-[#19191c] text-zinc-300">
            <Code2 size={26} aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-lg font-semibold text-white">Votre espace de projets est prêt</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-gray-400">
            Créez votre premier projet, testez votre code dans l’aperçu et enregistrez-le pour le retrouver ici.
          </p>
          <Link to="/atelier" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-5 py-3 text-sm font-semibold text-black hover:bg-white">
            <Plus size={17} aria-hidden="true" />
            Créer un projet
          </Link>
        </section>
      )}
    </div>
  );
}
