import type { Quote } from "@/types/quote";

type QuotesResponse = {
  quotes: Quote[];
  total: number;
  skip: number;
  limit: number;
};

export async function getQuotes(): Promise<Quote[]> {
  const response = await fetch("https://dummyjson.com/quotes");
  if (!response.ok) {
    throw new Error("Erro ao buscar frases.");
  }

  const data = (await response.json()) as QuotesResponse;
  return data.quotes;
}