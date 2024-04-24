import { StorefrontPayloadProduct } from "@/src/storefront/storefront.type.ts";
import { useProductsStore } from "@/entrypoints/popup/stores/product.store.ts";

export const useProducts = (existingProducts: StorefrontPayloadProduct[]) => {
  const productsStore = useProductsStore((state) => state.products);

  const productsPath = Object.keys(productsStore);
  const productsLength = productsPath.length;
  const productsQuantity =
    productsLength > 0
      ? Object.values(productsStore).reduce((a, b) => a + b)
      : 0;
  const productsPrice = existingProducts
    .map((product) =>
      productsPath.includes(product.path)
        ? product.priceTotalValue * productsStore[product.path]
        : 0,
    )
    .reduce((a, b) => a + b, 0);

  return {
    store: productsStore,
    length: productsLength,
    quantity: productsQuantity,
    price: productsPrice,
  };
};
