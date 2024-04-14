import { colorsScheme } from "@/entrypoints/popup/theme/colors.ts";

export const useOfferColorScheme = (percent: number) => {
  if (percent > 80) return colorsScheme.priority[1];
  if (percent > 60) return colorsScheme.priority[2];
  if (percent > 40) return colorsScheme.priority[3];
  if (percent > 20) return colorsScheme.priority[4];
  return colorsScheme.priority[5];
};
