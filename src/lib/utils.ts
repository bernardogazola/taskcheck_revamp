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

export function triggerClientDownload(
  arrayBuffer: ArrayBuffer,
  filename: string,
  contentType: string
): void {
  try {
    const blob = new Blob([arrayBuffer], { type: contentType });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error triggering client download:", error);
    throw new Error("Não foi possível iniciar o download no navegador.");
  }
}
