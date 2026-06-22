import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "POS Quotes App - Caio Henrique",
  description: "Atividade avaliativa de POS com Next.js, shadcn/ui e DummyJSON",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}