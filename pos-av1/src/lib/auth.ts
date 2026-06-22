import type { AuthUser, LoginFormData } from "@/types/auth";

export async function loginRequest(data: LoginFormData): Promise<AuthUser> {
  const response = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: data.username,
      password: data.password,
    }),
  });

  if (!response.ok) {
    throw new Error("Usuário ou senha inválidos.");
  }

  const user = (await response.json()) as AuthUser;
  return user;
}