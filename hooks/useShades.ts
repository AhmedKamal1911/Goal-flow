import { shadeColor } from "@/lib/utils";

// hook يرجع لك تدرجات اللون
export function useShades(color: string) {
  const base = color || "#3498db";
  const lighter = shadeColor(base, 20);
  const darker = shadeColor(base, -20);

  return { base, lighter, darker };
}
