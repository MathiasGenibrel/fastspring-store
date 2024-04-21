import { StorefrontPayloadProduct } from "@/src/storefront/storefront.type.ts";
import { create } from "zustand";

interface ProductState {
  products: Record<StorefrontPayloadProduct["path"], number>; // path -> quantity
  change: (path: string, quantity: number) => void;
  reset: () => void;
}

export const useProductsStore = create<ProductState>()((set) => ({
  products: {},
  change: (path, quantity) =>
    set((state) => {
      return { products: { ...state.products, [path]: quantity } };
    }),
  reset: () =>
    set(() => {
      return { products: {} };
    }),
}));
