"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginRequest } from "@/lib/auth";
import { saveUser } from "@/lib/storage";
import type { LoginFormData } from "@/types/auth";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormErrors = {
  username?: string;
  password?: string;
  general?: string;
};

const initialForm: LoginFormData = {
  username: "",
  password: "",
};

export function AuthForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<LoginFormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  function validate(data: LoginFormData) {
    const newErrors: FormErrors = {};

    if (!data.username.trim()) {
      newErrors.username = "Informe o apelido.";
    }

    if (!data.password.trim()) {
      newErrors.password = "Informe a senha.";
    }

    return newErrors;
  }

  function handleChange(field: keyof LoginFormData, value: string) {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setIsLoading(true);
      const user = await loginRequest(formData);
      saveUser(user);
      router.push("/dashboard");
    } catch (error) {
      setErrors({
        general:
          error instanceof Error
            ? error.message
            : "Erro ao autenticar usuário.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Apelido</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(event) => handleChange("username", event.target.value)}
              placeholder="Digite seu apelido"
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(event) => handleChange("password", event.target.value)}
              placeholder="Digite sua senha"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {errors.general && (
            <p className="text-sm text-red-500">{errors.general}</p>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}