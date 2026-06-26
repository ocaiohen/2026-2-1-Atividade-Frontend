"use client";

import { useEffect, useState } from "react";
import type { Quote, QuoteFormData } from "@/types/quote";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type QuoteFormProps = {
  selectedQuote: Quote | null;
  onSave: (data: QuoteFormData) => void;
  onCancelEdit: () => void;
  authors: string[];
};

type FormErrors = {
  quote?: string;
  author?: string;
};

const initialForm: QuoteFormData = {
  quote: "",
  author: "",
};

export function QuoteForm({
  selectedQuote,
  onSave,
  onCancelEdit,
  authors,
}: QuoteFormProps) {
  const [formData, setFormData] = useState<QuoteFormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (selectedQuote) {
      setFormData({
        quote: selectedQuote.quote,
        author: selectedQuote.author,
      });
      return;
    }

    setFormData(initialForm);
  }, [selectedQuote]);

  function validate(data: QuoteFormData) {
    const newErrors: FormErrors = {};

    if (!data.quote.trim()) {
      newErrors.quote = "Informe a frase.";
    }

    if (!data.author.trim()) {
      newErrors.author = "Informe o autor.";
    }

    return newErrors;
  }

  function handleChange(field: keyof QuoteFormData, value: string) {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    onSave({
      quote: formData.quote.trim(),
      author: formData.author.trim(),
    });

    if (!selectedQuote) {
      setFormData(initialForm);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border p-4">
      <div>
        <h2 className="text-lg font-semibold">
          {selectedQuote ? "Editar frase" : "Nova frase"}
        </h2>
      </div>

      <div className="space-y-2">
        <Label htmlFor="quote">Frase</Label>
        <Input
          id="quote"
          value={formData.quote}
          onChange={(event) => handleChange("quote", event.target.value)}
          placeholder="Digite a frase"
        />
        {errors.quote && <p className="text-sm text-red-500">{errors.quote}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="author">Autor</Label>
        <Input
          id="author"
          list="authors-list"
          value={formData.author}
          onChange={(event) => handleChange("author", event.target.value)}
          placeholder="Digite o autor"
        />
        <datalist id="authors-list">
          {authors.map((author) => (
            <option key={author} value={author} />
          ))}
        </datalist>
        {errors.author && (
          <p className="text-sm text-red-500">{errors.author}</p>
        )}
      </div>

      <div className="flex gap-2">
        <Button type="submit">
          {selectedQuote ? "Salvar edição" : "Adicionar frase"}
        </Button>

        {selectedQuote && (
          <Button type="button" variant="outline" onClick={onCancelEdit}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
}