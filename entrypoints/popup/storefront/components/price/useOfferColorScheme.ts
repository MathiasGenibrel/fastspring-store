import { colorsScheme } from "@/entrypoints/popup/theme/colors.ts";

export const useOfferColorScheme = (percent: number) => {
  if (percent > 75) return colorsScheme.priority[1];
  if (percent > 50) return colorsScheme.priority[2];
  if (percent > 25) return colorsScheme.priority[3];
  return colorsScheme.priority[4];
};
