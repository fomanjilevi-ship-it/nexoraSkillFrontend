import axios from "axios";

const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "/api",
  headers: { "Content-Type": "application/json" },
});

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload extends LoginPayload {
  name: string;
}

export async function login(payload: LoginPayload): Promise<void> {
  await authApi.post("/auth/login", payload);
}

export async function register(payload: RegisterPayload): Promise<void> {
  await authApi.post("/auth/register", payload);
}

export function getAuthErrorMessage(error: unknown): string {
  if (axios.isAxiosError<{ message?: string; detail?: string }>(error)) {
    return (
      error.response?.data?.message ??
      error.response?.data?.detail ??
      "Une erreur est survenue. Réessayez."
    );
  }

  return error instanceof Error
    ? error.message
    : "Une erreur est survenue. Réessayez.";
}
