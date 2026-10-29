import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { getAuthErrorMessage, register } from "@/api/auth";

const registerSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .required("Le nom est obligatoire"),
  email: yup
    .string()
    .trim()
    .email("Adresse e-mail invalide")
    .required("L’adresse e-mail est obligatoire"),
  password: yup
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .required("Le mot de passe est obligatoire"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Les mots de passe ne correspondent pas")
    .required("Veuillez confirmer votre mot de passe"),
});

export default function Register() {
  const navigate = useNavigate();

  return (
    <section className="mx-auto grid min-h-[min(680px,calc(100vh-12rem))] w-full max-w-5xl items-center gap-10 py-8 md:grid-cols-2 md:gap-16">
      <div className="hidden md:block">
        <p className="mb-4 text-sm font-semibold uppercase text-indigo-300">
          NexoraSkill
        </p>
        <h1 className="max-w-md text-4xl font-bold leading-tight text-white">
          Faites de votre prochaine compétence un nouveau départ.
        </h1>
        <p className="mt-5 max-w-md text-base leading-7 text-gray-400">
          Créez votre compte et découvrez des formations conçues pour vous faire
          progresser.
        </p>
      </div>

      <div className="w-full max-w-md justify-self-center rounded-lg border border-white/10 bg-white/4 p-6 shadow-2xl shadow-black/20 sm:p-8">
        <p className="text-sm font-semibold uppercase text-indigo-300 md:hidden">
          NexoraSkill
        </p>
        <h2 className="mt-2 text-2xl font-bold text-white">Créer un compte</h2>
        <p className="mt-2 text-sm text-gray-400">
          Quelques informations pour commencer.
        </p>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={registerSchema}
          onSubmit={async ({ name, email, password }, { setStatus }) => {
            setStatus(undefined);
            try {
              await register({ name, email, password });
              navigate("/login", {
                state: {
                  notice:
                    "Votre compte a été créé. Vous pouvez maintenant vous connecter.",
                },
              });
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
                id="register-name"
                label="Nom complet"
                autoComplete="name"
                placeholder="Votre nom"
                error={form.touched.name ? form.errors.name : undefined}
                {...form.getFieldProps("name")}
              />
              <Input
                id="register-email"
                label="Adresse e-mail"
                type="email"
                autoComplete="email"
                placeholder="vous@exemple.com"
                error={form.touched.email ? form.errors.email : undefined}
                {...form.getFieldProps("email")}
              />
              <Input
                id="register-password"
                label="Mot de passe"
                type="password"
                autoComplete="new-password"
                placeholder="8 caractères minimum"
                error={form.touched.password ? form.errors.password : undefined}
                {...form.getFieldProps("password")}
              />
              <Input
                id="register-confirm-password"
                label="Confirmer le mot de passe"
                type="password"
                autoComplete="new-password"
                placeholder="Répétez votre mot de passe"
                error={
                  form.touched.confirmPassword
                    ? form.errors.confirmPassword
                    : undefined
                }
                {...form.getFieldProps("confirmPassword")}
              />
              <Button
                type="submit"
                size="lg"
                loading={form.isSubmitting}
                className="w-full"
              >
                Créer mon compte
              </Button>
            </form>
          )}
        </Formik>

        <p className="mt-6 text-center text-sm text-gray-400">
          Vous avez déjà un compte ?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-300 hover:text-indigo-200"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </section>
  );
}
