import React from "react";
import { Button, Flex, Tag } from "@chakra-ui/react";
import { StorefrontPayloadProduct } from "@/src/storefront/storefront.type.ts";
import { getPriceWithCurrency } from "@/entrypoints/popup/storefront/components/price/getPriceWithCurrency.ts";
import { useProducts } from "@/entrypoints/popup/header/hooks/useProducts.ts";
import { useProductsStore } from "@/entrypoints/popup/stores/product.store.ts";

interface HeaderProps {
  currency: string;
  existingProducts: StorefrontPayloadProduct[];
}

export const Header: React.FC<HeaderProps> = ({
  existingProducts,
  currency,
}) => {
  const products = useProducts(existingProducts);
  const resetProducts = useProductsStore((state) => state.reset);

  return (
    <Flex
      paddingX={4}
      paddingY={2}
      marginX={4}
      marginY={2}
      borderRadius={12}
      zIndex={999}
      backgroundColor={"#f0f0f0de"}
      style={{ backdropFilter: "blur(4px)" }}
      position={"sticky"}
      top={2}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Flex gap={4} alignItems={"center"}>
        <Tag size={"sm"} colorScheme={"teal"}>
          {products.length} products
        </Tag>
        <Tag size={"sm"} colorScheme={"cyan"}>
          {products.quantity} quantity
        </Tag>
        <Tag size={"sm"} colorScheme={"purple"}>
          {getPriceWithCurrency(currency, products.price)}
        </Tag>
      </Flex>

      <Flex gap={4} alignItems={"center"}>
        <Button size={"sm"} onClick={resetProducts}>
          Clean up
        </Button>
        <Button colorScheme={"purple"} size={"sm"}>
          Build it!
        </Button>
      </Flex>
    </Flex>
  );
};
