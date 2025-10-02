import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getContrastColor(hex: string): string {
  // Remove #
  hex = hex.replace("#", "");

  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // حساب السطوع (Luminance)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 128 ? "#000000" : "#FFFFFF"; // لو فاتح رجّع أسود، لو غامق رجّع أبيض
}


// دالة لتوليد لون أغمق أو أفتح من HEX
export function shadeColor(hex: string, percent: number) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  r = Math.min(255, Math.max(0, r + (r * percent) / 100));
  g = Math.min(255, Math.max(0, g + (g * percent) / 100));
  b = Math.min(255, Math.max(0, b + (b * percent) / 100));

  return `#${[r, g, b]
    .map((x) => Math.round(x).toString(16).padStart(2, "0"))
    .join("")}`;
}
