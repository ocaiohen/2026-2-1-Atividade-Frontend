import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-2xl">POS Quotes App</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-lg">
            Aluno: <strong>Caio Henrique Cruz da Silva</strong>
          </p>

          <p className="text-sm text-slate-600">
            Aplicação desenvolvida para a atividade avaliativa de POS com Next.js,
            Tailwind, shadcn/ui, armazenamento local e DummyJSON.
          </p>

          <Link href="/auth">
            <Button>Acessar login</Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}