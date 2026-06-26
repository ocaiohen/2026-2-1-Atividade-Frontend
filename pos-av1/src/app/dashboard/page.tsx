"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { QuoteForm } from "@/components/quote-form";
import { QuoteList } from "@/components/quote-list";
import {
  getAuthors,
  getLocalQuotes,
  getUser,
  removeUser,
  saveAuthors,
  saveLocalQuotes,
} from "@/lib/storage";
import { getQuotes } from "@/lib/quotes";
import type { Quote, QuoteFormData } from "@/types/quote";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const router = useRouter();

  const [apiQuotes, setApiQuotes] = useState<Quote[]>([]);
  const [localQuotes, setLocalQuotes] = useState<Quote[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = getUser();

    if (!user) {
      router.push("/auth");
      return;
    }

    const savedQuotes = getLocalQuotes();
    const savedAuthors = getAuthors();

    setLocalQuotes(savedQuotes);
    setAuthors(savedAuthors);

    async function loadQuotes() {
      try {
        const quotes = await getQuotes();
        setApiQuotes(quotes);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    loadQuotes();
  }, [router]);

  const allQuotes = useMemo(() => {
    const localIds = new Set(localQuotes.map((quote) => quote.id));
    const filteredApiQuotes = apiQuotes.filter((quote) => !localIds.has(quote.id));

    return [...localQuotes, ...filteredApiQuotes];
  }, [apiQuotes, localQuotes]);

  function updateAuthors(author: string) {
    const normalized = author.trim();
    if (!normalized) return;

    const alreadyExists = authors.some(
      (savedAuthor) => savedAuthor.toLowerCase() === normalized.toLowerCase(),
    );

    if (alreadyExists) return;

    const updatedAuthors = [...authors, normalized];
    setAuthors(updatedAuthors);
    saveAuthors(updatedAuthors);
  }

  function handleSaveQuote(data: QuoteFormData) {
    updateAuthors(data.author);

    if (selectedQuote) {
      const updatedQuotes = localQuotes.map((quote) =>
        quote.id === selectedQuote.id
          ? { ...quote, quote: data.quote, author: data.author }
          : quote,
      );

      setLocalQuotes(updatedQuotes);
      saveLocalQuotes(updatedQuotes);
      setSelectedQuote(null);
      return;
    }

    const newQuote: Quote = {
      id: Date.now(),
      quote: data.quote,
      author: data.author,
    };

    const updatedQuotes = [newQuote, ...localQuotes];
    setLocalQuotes(updatedQuotes);
    saveLocalQuotes(updatedQuotes);
  }

  function handleEditQuote(quote: Quote) {
    const existsInLocalQuotes = localQuotes.some((item) => item.id === quote.id);

    if (existsInLocalQuotes) {
        setSelectedQuote(quote);
        return;
    }

    const copiedQuote = { ...quote };
    const updatedQuotes = [copiedQuote, ...localQuotes];

    setLocalQuotes(updatedQuotes);
    saveLocalQuotes(updatedQuotes);
    setSelectedQuote(copiedQuote);
    }

  function handleDeleteQuote(id: number) {
    const updatedQuotes = localQuotes.filter((quote) => quote.id !== id);
    setLocalQuotes(updatedQuotes);
    saveLocalQuotes(updatedQuotes);

    if (selectedQuote?.id === id) {
      setSelectedQuote(null);
    }
  }

  function handleLogout() {
    removeUser();
    router.push("/auth");
  }

  if (isLoading) {
    return (
      <main className="p-6">
        <p>Carregando dashboard...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl p-6">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard de frases</h1>
          <p className="text-sm text-slate-600">
            CRUD local com quotes do DummyJSON
          </p>
        </div>

        <Button variant="outline" onClick={handleLogout}>
          Sair
        </Button>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <QuoteForm
          selectedQuote={selectedQuote}
          onSave={handleSaveQuote}
          onCancelEdit={() => setSelectedQuote(null)}
          authors={authors}
        />

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Lista de frases</h2>
          <QuoteList
            quotes={allQuotes}
            onEdit={handleEditQuote}
            onDelete={handleDeleteQuote}
          />
        </div>
      </section>
    </main>
  );
}