import { Formik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { getAuthErrorMessage, login } from "@/api/auth";

const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Adresse e-mail invalide")
    .required("L’adresse e-mail est obligatoire"),
  password: yup.string().required("Le mot de passe est obligatoire"),
});

interface LoginLocationState {
  notice?: string;
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const notice = (location.state as LoginLocationState | null)?.notice;

  return (
    <section className="mx-auto grid min-h-[min(680px,calc(100vh-12rem))] w-full max-w-5xl items-center gap-10 py-8 md:grid-cols-2 md:gap-16">
      <div className="hidden md:block">
        <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          NexoraSkill
        </p>
        <h1 className="max-w-md text-4xl font-bold leading-tight text-white">
          Reprenez votre apprentissage là où vous l’avez laissé.
        </h1>
        <p className="mt-5 max-w-md text-base leading-7 text-gray-400">
          Connectez-vous pour retrouver vos cours et suivre votre progression.
        </p>
      </div>

      <div className="w-full max-w-md justify-self-center rounded-xl border border-[#29292e] bg-[#101012] p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500 md:hidden">
          NexoraSkill
        </p>
        <h2 className="mt-2 text-2xl font-bold text-white">Connexion</h2>
        <p className="mt-2 text-sm text-gray-400">
          Accédez à votre espace d’apprentissage.
        </p>

        {notice && (
          <p
            role="status"
            className="mt-5 rounded-md border border-[#3a3a40] bg-[#19191c] px-3 py-2 text-sm text-zinc-300"
          >
            {notice}
          </p>
        )}

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={async (values, { setStatus }) => {
            setStatus(undefined);
            try {
              await login(values);
              navigate("/dashboard");
            } catch (error) {
              setStatus(getAuthErrorMessage(error));
            }
          }}
        >
          {(form) => (
            <form
              className="mt-6 space-y-5"
              onSubmit={form.handleSubmit}
              noValidate
            >
              {form.status && (
                <p
                  role="alert"
                  className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200"
                >
                  {form.status}
                </p>
              )}
              <Input
                id="login-email"
                label="Adresse e-mail"
                type="email"
                autoComplete="email"
                placeholder="vous@exemple.com"
                error={form.touched.email ? form.errors.email : undefined}
                {...form.getFieldProps("email")}
              />
              <Input
                id="login-password"
                label="Mot de passe"
                type="password"
                autoComplete="current-password"
                placeholder="Votre mot de passe"
                error={form.touched.password ? form.errors.password : undefined}
                {...form.getFieldProps("password")}
              />
              <Button
                type="submit"
                size="lg"
                loading={form.isSubmitting}
                className="w-full"
              >
                Se connecter
              </Button>
            </form>
          )}
        </Formik>

        <p className="mt-6 text-center text-sm text-gray-400">
          Vous n’avez pas encore de compte ?{" "}
          <Link
            to="/register"
            className="font-semibold text-zinc-300 hover:text-white"
          >
            Créer un compte
          </Link>
        </p>
      </div>
    </section>
  );
}
