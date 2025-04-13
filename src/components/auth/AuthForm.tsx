"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon, LoaderCircle } from "lucide-react";
import { signInSchema, signUpSchema } from "@/lib/validators/authSchema";
import { useForm } from "@tanstack/react-form";
import { signIn, signUp } from "@/lib/actions/auth.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ROUTES from "@/constants/routes";

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "signin" | "signup";
}

export function AuthForm({ type, className, ...props }: AuthFormProps) {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isSignIn = type === "signin";

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const schema = isSignIn ? signInSchema : signUpSchema;

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      ...(isSignIn ? {} : { name: "" }),
      ...(isSignIn ? {} : { confirmPassword: "" }),
    },
    validators: {
      onChange: schema,
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        if (isSignIn) {
          const resultSignIn = (await signIn(value)) as ActionResponse;

          if (resultSignIn?.success) {
            toast.success("Login realizado com sucesso");
            router.push(ROUTES.DASHBOARD);
          } else {
            toast.error(`Erro: ${resultSignIn?.error?.message}`);
            setErrorMessage(
              resultSignIn?.error?.message ?? "Erro ao fazer login"
            );
          }
        } else {
          const signUpData: AuthCredentials = {
            name: value.name || "",
            email: value.email,
            password: value.password,
            confirmPassword: value.confirmPassword || "",
          };

          const resultSignUp = (await signUp(signUpData)) as ActionResponse;

          if (resultSignUp?.success) {
            toast.success("Conta criada com sucesso");
            router.push(ROUTES.DASHBOARD);
          } else {
            toast.error(`Erro: ${resultSignUp?.error?.message}`);
            setErrorMessage(
              resultSignUp?.error?.message ?? "Erro ao criar conta"
            );
          }
        }
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Ocorreu um erro. Tente novamente."
        );
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            {isSignIn ? "Bem-vindo de Volta" : "Criar Conta"}
          </CardTitle>
          <CardDescription>
            {isSignIn ? "Faça login com sua conta" : "Registre-se para começar"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <div className="grid gap-6">
              <div className="grid gap-6">
                {!isSignIn && (
                  <form.Field name="name">
                    {(field) => (
                      <div className="grid gap-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Seu nome completo"
                          autoCapitalize="none"
                          autoCorrect="off"
                          disabled={isLoading}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={
                            field.state.meta.isTouched &&
                            !!field.state.meta.errors.length
                          }
                        />

                        {field.state.meta.isTouched &&
                          field.state.meta.errors.length > 0 && (
                            <p className="text-sm text-destructive">
                              {(field.state.meta.errors[0] as any)?.message}
                            </p>
                          )}
                      </div>
                    )}
                  </form.Field>
                )}
                <form.Field name="email">
                  {(field) => (
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="exemplo@pucpr.edu.br"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={
                          field.state.meta.isTouched &&
                          !!field.state.meta.errors.length
                        }
                      />
                      {field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0 && (
                          <p className="text-sm text-destructive">
                            {field.state.meta.errors[0]?.message}
                          </p>
                        )}
                    </div>
                  )}
                </form.Field>
                <form.Field name="password">
                  {(field) => (
                    <div className="grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Senha</Label>
                        {isSignIn && (
                          <Link
                            href="#"
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                          >
                            Esqueceu sua senha?
                          </Link>
                        )}
                      </div>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          autoComplete={
                            isSignIn ? "current-password" : "new-password"
                          }
                          disabled={isLoading}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={
                            field.state.meta.isTouched &&
                            !!field.state.meta.errors.length
                          }
                        />

                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOffIcon className="h-4 w-4" />
                          ) : (
                            <EyeIcon className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      {field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0 && (
                          <p className="text-sm text-destructive">
                            {field.state.meta.errors[0]?.message}
                          </p>
                        )}
                    </div>
                  )}
                </form.Field>
                {!isSignIn && (
                  <form.Field name="confirmPassword">
                    {(field) => (
                      <div className="grid gap-2">
                        <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            autoComplete="new-password"
                            disabled={isLoading}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={
                              field.state.meta.isTouched &&
                              !!field.state.meta.errors.length
                            }
                          />
                          <button
                            type="button"
                            onClick={toggleConfirmPasswordVisibility}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? (
                              <EyeOffIcon className="h-4 w-4" />
                            ) : (
                              <EyeIcon className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                        {field.state.meta.isTouched &&
                          field.state.meta.errors.length > 0 && (
                            <p className="text-sm text-destructive">
                              {(field.state.meta.errors[0] as any)?.message}
                            </p>
                          )}
                      </div>
                    )}
                  </form.Field>
                )}

                {errorMessage && (
                  <p className="text-sm text-destructive">{errorMessage}</p>
                )}

                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                  children={([canSubmit, isSubmitting]) => (
                    <Button
                      disabled={!canSubmit}
                      type="submit"
                      className="w-full cursor-pointer"
                    >
                      {isSubmitting && (
                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {isSignIn ? "Entrar" : "Registrar"}
                    </Button>
                  )}
                />
              </div>
              <div className="text-center text-sm">
                {isSignIn ? "Não tem uma conta? " : "Já tem uma conta? "}
                <Link
                  href={isSignIn ? ROUTES.SIGN_UP : ROUTES.SIGN_IN}
                  className="underline underline-offset-4"
                >
                  {isSignIn ? "Criar conta" : "Fazer login"}
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        Ao continuar, você concorda com nossos <a href="#">Termos de Serviço</a>{" "}
        e <a href="#">Política de Privacidade</a>.
      </div>
    </div>
  );
}

export { AuthForm as LoginForm };
