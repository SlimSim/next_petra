import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeToDisp(time:number):string {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  return hours > 0 ? `${hours}:${minutes < 10 ? '0' : ''}${minutes}` : `${minutes}m`;
}