// src/lib/data.ts
export type User = {
  id: number;
  name: string;
  email: string;
};

export let users: User[] = [];

let counter = 1; // internal variable

export function getNextId() {
  return counter++;
}
