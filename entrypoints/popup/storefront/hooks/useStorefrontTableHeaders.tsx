import { useMemo } from "react";
import {
  ResetMethod,
  SortMethod,
} from "@/entrypoints/popup/storefront/hooks/useStorefrontTable.tsx";
import { HeaderProps } from "@/entrypoints/popup/storefront/components/Header.tsx";

/**
 * Hook to get the headers for the storefront table
 * @param asc - function to sort by ascending
 * @param desc - function to sort by descending
 * @param reset - function to reset the sorting
 */
export const useStorefrontTableHeaders = (
  asc: SortMethod,
  desc: SortMethod,
  reset: ResetMethod,
): HeaderProps[] => {
  return useMemo(() => {
    return [
      { title: "Product" },
      {
        title: "Price",
        sortFunction: {
          ascending: () => asc("totalValue"),
          descending: () => desc("totalValue"),
          reset: reset,
        },
      },
      {
        title: "Discount",
        sortFunction: {
          ascending: () => desc("discountPercentValue"),
          descending: () => asc("discountPercentValue"),
          reset: reset,
        },
      },
      {
        title: "Quantity",
      },
    ];
  }, []);
};
