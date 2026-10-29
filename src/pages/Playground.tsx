import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AlertCircle, Code2, Play, RotateCcw, Save, ShieldCheck } from "lucide-react";
import {
  readCodeProjects,
  saveCodeProject,
  starterCode,
} from "@/lib/codeProjects";

const initialHtml = `<main class="card">
  <span class="tag">Mon premier test</span>
  <h1>Bonjour le web !</h1>
  <p>Modifiez le HTML, le CSS ou le JavaScript puis lancez l'aperçu.</p>
  <button id="action">Cliquez ici</button>
  <p id="result" aria-live="polite"></p>
</main>`;

const initialCss = `body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #f1f5f9;
  font-family: system-ui, sans-serif;
}
.card {
  max-width: 420px;
  padding: 2rem;
  border-radius: 1rem;
  background: white;
  box-shadow: 0 16px 40px #0f172a20;
}
.tag { color: #4f46e5; font-weight: 700; }
button {
  padding: .7rem 1rem;
  border: 0;
  border-radius: .6rem;
  background: #4f46e5;
  color: white;
  cursor: pointer;
}`;

const initialJavaScript = `document.querySelector("#action").addEventListener("click", () => {
  document.querySelector("#result").textContent = "Bravo, votre JavaScript fonctionne !";
});`;

function createPreviewDocument(html: string, css: string, javascript: string) {
  const safeCss = css.replace(/<\/style/gi, "<\\/style");
  const safeJavaScript = javascript.replace(/<\/script/gi, "<\\/script");
  const scriptEnd = ["<", "/script>"].join("");
  return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src data:; connect-src 'none'; form-action 'none'; base-uri 'none'">
  <style>${safeCss}</style>
</head>
<body>
${html}
<script>${safeJavaScript}${scriptEnd}
</body>
</html>`;
}

function loadProject(projectId: string | null) {
  if (!projectId) return { project: null, error: "" };

  try {
    const project = readCodeProjects().find((item) => item.id === projectId);
    return project
      ? { project, error: "" }
      : { project: null, error: "Ce projet est introuvable dans le stockage de ce navigateur." };
  } catch (caught) {
    return {
      project: null,
      error: caught instanceof Error ? caught.message : "Impossible de charger le projet.",
    };
  }
}

export default function Playground() {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("project");

  return <PlaygroundEditor key={projectId ?? "new-project"} projectId={projectId} />;
}

function PlaygroundEditor({ projectId }: { projectId: string | null }) {
  const [, setSearchParams] = useSearchParams();
  const [loadedProject, setLoadedProject] = useState(() => loadProject(projectId));
  const [html, setHtml] = useState(() => loadedProject.project?.html ?? initialHtml);
  const [css, setCss] = useState(() => loadedProject.project?.css ?? initialCss);
  const [javascript, setJavascript] = useState(() => loadedProject.project?.javascript ?? initialJavaScript);
  const [title, setTitle] = useState(() => loadedProject.project?.title ?? "Mon projet sans titre");
  const [saveMessage, setSaveMessage] = useState("");
  const [saveError, setSaveError] = useState(loadedProject.error);
  const [previewDocument, setPreviewDocument] = useState(() =>
    createPreviewDocument(
      loadedProject.project?.html ?? initialHtml,
      loadedProject.project?.css ?? initialCss,
      loadedProject.project?.javascript ?? initialJavaScript,
    ),
  );
  function runCode() {
    setPreviewDocument(createPreviewDocument(html, css, javascript));
    setSaveMessage("");
  }

  function resetCode() {
    setHtml(starterCode.html);
    setCss(starterCode.css);
    setJavascript(starterCode.javascript);
    setPreviewDocument(createPreviewDocument(starterCode.html, starterCode.css, starterCode.javascript));
    setSaveMessage("Modèle réinitialisé. Enregistrez pour conserver ces changements.");
    setSaveError("");
  }

  function saveCurrentProject() {
    const projectTitle = title.trim();
    if (!projectTitle) {
      setSaveError("Donnez un nom au projet avant de l’enregistrer.");
      return;
    }

    try {
      const savedProject = saveCodeProject(
        { title: projectTitle, html, css, javascript },
        projectId ?? undefined,
      );
      setLoadedProject({ project: savedProject, error: "" });
      setTitle(savedProject.title);
      if (!projectId) {
        setSearchParams({ project: savedProject.id }, { replace: true });
      }
      setSaveMessage("Projet enregistré dans ce navigateur.");
      setSaveError("");
    } catch (caught) {
      setSaveError(caught instanceof Error ? caught.message : "Impossible d’enregistrer le projet.");
      setSaveMessage("");
    }
  }

  return (
    <div className="space-y-8 pb-12">
      <header className="rounded-xl border border-[#29292e] bg-[#101012] px-6 py-9 sm:px-10">
        <div className="flex items-center gap-3 text-zinc-300">
          <Code2 size={22} aria-hidden="true" />
          <p className="text-sm font-semibold uppercase tracking-widest">Atelier pratique</p>
        </div>
        <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Testez votre code</h1>
        <p className="mt-3 max-w-2xl text-slate-300">
          Écrivez du HTML, du CSS et du JavaScript, puis lancez votre aperçu
          directement dans la page.
        </p>
        <p className="mt-4 flex items-center gap-2 text-sm text-zinc-400">
          <ShieldCheck size={17} aria-hidden="true" />
          L’aperçu est isolé et ne peut pas accéder à vos données ni au réseau.
        </p>
        <p className="mt-3 text-xs text-gray-400">
          Vos projets sont sauvegardés dans ce navigateur uniquement.
          <Link to="/mes-codes" className="ml-1 font-semibold text-zinc-300 hover:text-white">
            Voir mes codes
          </Link>
        </p>
      </header>

      <div className="flex flex-col gap-3 rounded-xl border border-[#29292e] bg-[#101012] p-4 sm:flex-row sm:items-end">
        <div className="min-w-0 flex-1">
          <label htmlFor="project-title" className="mb-2 block text-sm font-medium text-gray-300">
            Nom du projet
          </label>
          <input
            id="project-title"
            value={title}
            maxLength={80}
            onChange={(event) => {
              setTitle(event.target.value);
              setSaveMessage("");
            }}
            placeholder="Ex. Ma page portfolio"
            className="w-full rounded-lg border border-[#303036] bg-[#09090b] px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500/20"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={saveCurrentProject}
            className="inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2.5 text-sm font-semibold text-black hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
          >
            <Save size={16} aria-hidden="true" />
            {loadedProject.project ? "Enregistrer" : "Enregistrer le projet"}
          </button>
        <button
          type="button"
          onClick={runCode}
          className="inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-5 py-2.5 font-semibold text-black hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
        >
          <Play size={17} aria-hidden="true" />
          Exécuter le code
        </button>
        <button
          type="button"
          onClick={resetCode}
          className="inline-flex items-center gap-2 rounded-lg border border-[#303036] px-5 py-2.5 font-semibold text-zinc-300 hover:bg-[#17171a] focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"
        >
          <RotateCcw size={17} aria-hidden="true" />
          Réinitialiser
        </button>
        </div>
      </div>

      {saveMessage && <p role="status" className="text-sm text-zinc-300">{saveMessage}</p>}
      {saveError && (
        <p role="alert" className="flex items-start gap-2 rounded-lg border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-200">
          <AlertCircle size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
          {saveError}
        </p>
      )}

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="space-y-5">
          <CodeEditor id="playground-html" label="HTML" value={html} onChange={setHtml} />
          <CodeEditor id="playground-css" label="CSS" value={css} onChange={setCss} />
          <CodeEditor id="playground-js" label="JavaScript" value={javascript} onChange={setJavascript} />
        </div>

        <section className="overflow-hidden rounded-xl border border-gray-800 bg-white">
          <h2 className="bg-gray-950 px-4 py-3 text-sm font-semibold text-white">Aperçu</h2>
          <iframe
            title="Aperçu isolé du code"
            sandbox="allow-scripts"
            referrerPolicy="no-referrer"
            srcDoc={previewDocument}
            className="min-h-[560px] w-full bg-white"
          />
        </section>
      </div>

      <aside className="rounded-xl border border-[#29292e] bg-[#101012] p-5 text-sm text-zinc-400">
        <h2 className="font-semibold text-zinc-200">À propos des autres technologies</h2>
        <p className="mt-2 leading-relaxed">
          Cet atelier exécute du HTML, du CSS et du JavaScript dans un aperçu
          isolé. Pour lancer du PHP, Python, Java, Swift, Kotlin, Flutter ou
          d’autres frameworks, un environnement serveur ou un SDK dédié est
          nécessaire. Les leçons de chaque cours expliquent ces notions et
          proposent des exercices adaptés.
        </p>
        <Link to="/courses" className="mt-3 inline-block font-semibold text-zinc-300 hover:text-white">
          Explorer les cours →
        </Link>
      </aside>
    </div>
  );
}

function CodeEditor({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-[#303036] bg-[#101012]">
      <label htmlFor={id} className="block border-b border-[#262626] px-4 py-3 text-sm font-semibold text-zinc-300">
        {label}
      </label>
      <textarea
        id={id}
        spellCheck={false}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-48 w-full resize-y bg-[#0c0c0e] p-4 font-mono text-sm leading-6 text-zinc-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-zinc-500"
      />
    </section>
  );
}
