import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatarData(data: Date): string {
  return new Date(data).toLocaleDateString("pt-BR");
}

export function formatarHoras(horas: number): string {
  return `${horas} ${horas === 1 ? "hora" : "horas"}`;
}
