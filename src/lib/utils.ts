import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/** Prefix for GitHub Pages (empty in dev) */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

