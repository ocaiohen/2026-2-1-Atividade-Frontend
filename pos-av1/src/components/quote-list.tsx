"use client";

import type { Quote } from "@/types/quote";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type QuoteListProps = {
  quotes: Quote[];
  onEdit: (quote: Quote) => void;
  onDelete: (id: number) => void;
};

export function QuoteList({ quotes, onEdit, onDelete }: QuoteListProps) {
  if (quotes.length === 0) {
    return (
      <Card>
        <CardContent className="p-4">
          <p>Nenhuma frase encontrada.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {quotes.map((quote) => (
        <Card key={quote.id}>
          <CardContent className="space-y-3 p-4">
            <p className="text-base leading-relaxed">"{quote.quote}"</p>
            <p className="text-sm text-slate-600">— {quote.author}</p>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onEdit(quote)}>
                Editar
              </Button>
              <Button variant="destructive" onClick={() => onDelete(quote.id)}>
                Apagar
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}