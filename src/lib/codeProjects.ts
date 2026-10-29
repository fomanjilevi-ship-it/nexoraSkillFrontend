export interface CodeProject {
  id: string;
  title: string;
  html: string;
  css: string;
  javascript: string;
  updatedAt: string;
}

const storageKey = "nexora.codeProjects.v1";

export const starterCode = {
  html: `<main class="card">
  <h1>Mon nouveau projet</h1>
  <p>Écrivez votre idée ici, puis lancez l’aperçu.</p>
</main>`,
  css: `body {
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
}`,
  javascript: `// Écrivez votre JavaScript ici`,
};

function isCodeProject(value: unknown): value is CodeProject {
  if (!value || typeof value !== "object") return false;
  const project = value as Record<string, unknown>;
  return (
    typeof project.id === "string" &&
    typeof project.title === "string" &&
    typeof project.html === "string" &&
    typeof project.css === "string" &&
    typeof project.javascript === "string" &&
    typeof project.updatedAt === "string"
  );
}

export function readCodeProjects(): CodeProject[] {
  let stored: string | null;
  try {
    stored = window.localStorage.getItem(storageKey);
  } catch {
    throw new Error("Le stockage local est indisponible dans ce navigateur.");
  }
  if (!stored) return [];

  let parsed: unknown;
  try {
    parsed = JSON.parse(stored);
  } catch {
    throw new Error("Les projets enregistrés sont illisibles. Ils n’ont pas été supprimés.");
  }
  if (!Array.isArray(parsed) || !parsed.every(isCodeProject)) {
    throw new Error("Les projets enregistrés ont un format invalide.");
  }
  return parsed;
}

function writeCodeProjects(projects: CodeProject[]) {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(projects));
  } catch {
    throw new Error("Impossible d’enregistrer le projet. Vérifiez l’espace disponible du navigateur.");
  }
}

export function saveCodeProject(
  project: Omit<CodeProject, "id" | "updatedAt">,
  id?: string,
): CodeProject {
  const projects = readCodeProjects();
  const updatedAt = new Date().toISOString();
  const existingIndex = id ? projects.findIndex((item) => item.id === id) : -1;

  if (existingIndex >= 0) {
    const updatedProject = { ...projects[existingIndex], ...project, updatedAt };
    projects[existingIndex] = updatedProject;
    writeCodeProjects(projects);
    return updatedProject;
  }

  const newProject: CodeProject = {
    ...project,
    id: crypto.randomUUID(),
    updatedAt,
  };
  writeCodeProjects([newProject, ...projects]);
  return newProject;
}

export function deleteCodeProject(id: string) {
  const projects = readCodeProjects();
  writeCodeProjects(projects.filter((project) => project.id !== id));
}
