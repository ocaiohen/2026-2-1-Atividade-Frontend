import type { AuthUser } from "@/types/auth";
import type { Quote } from "@/types/quote";

const USER_KEY = "pos:user";
const LOCAL_QUOTES_KEY = "pos:local_quotes";
const AUTHORS_KEY = "pos:authors";
const DELETED_API_QUOTES_KEY = "pos:deleted_api_quotes";

export function saveUser(user: AuthUser) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser(): AuthUser | null {
  const value = localStorage.getItem(USER_KEY);
  if (!value) return null;
  return JSON.parse(value) as AuthUser;
}

export function removeUser() {
  localStorage.removeItem(USER_KEY);
}

export function saveLocalQuotes(quotes: Quote[]) {
  localStorage.setItem(LOCAL_QUOTES_KEY, JSON.stringify(quotes));
}

export function getLocalQuotes(): Quote[] {
  const value = localStorage.getItem(LOCAL_QUOTES_KEY);
  if (!value) return [];
  return JSON.parse(value) as Quote[];
}

export function saveAuthors(authors: string[]) {
  localStorage.setItem(AUTHORS_KEY, JSON.stringify(authors));
}

export function getAuthors(): string[] {
  const value = localStorage.getItem(AUTHORS_KEY);
  if (!value) return [];
  return JSON.parse(value) as string[];
}

export function saveDeletedApiQuoteIds(ids: number[]) {
  localStorage.setItem(DELETED_API_QUOTES_KEY, JSON.stringify(ids));
}

export function getDeletedApiQuoteIds(): number[] {
  const value = localStorage.getItem(DELETED_API_QUOTES_KEY);
  if (!value) return [];
  return JSON.parse(value) as number[];
}