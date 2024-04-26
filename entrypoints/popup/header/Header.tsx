import React from "react";
import { Button, ButtonGroup, Flex, IconButton, Tag } from "@chakra-ui/react";
import { StorefrontPayloadProduct } from "@/src/storefront/storefront.type.ts";
import { getPriceWithCurrency } from "@/entrypoints/popup/storefront/components/price/getPriceWithCurrency.ts";
import { useProducts } from "@/entrypoints/popup/header/hooks/useProducts.ts";
import { useProductsStore } from "@/entrypoints/popup/stores/product.store.ts";
import { useMutation } from "@tanstack/react-query";
import { StorefrontPopupRepository } from "@/src/storefront/storefront-popup.repository.ts";
import { DeleteIcon } from "@chakra-ui/icons";
import { Search } from "@/entrypoints/popup/header/components/search/Search.tsx";

interface HeaderProps {
  currency: string;
  handleSearch: (search: string) => void;
  existingProducts: StorefrontPayloadProduct[];
}

const storefrontPopupRepository = new StorefrontPopupRepository(browser.tabs);

export const Header: React.FC<HeaderProps> = ({
  existingProducts,
  handleSearch,
  currency,
}) => {
  const products = useProducts(existingProducts);
  const resetProducts = useProductsStore((state) => state.reset);
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      storefrontPopupRepository.build(products.store).then(() => {
        console.log("Storefront sent");
      });
    },
  });

  const canBuild: boolean = !!products.length && products.quantity > 0;

  return (
    <Flex
      paddingX={2}
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
      <Search handleSearchContent={handleSearch} />
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

      <ButtonGroup
        isAttached
        colorScheme={"purple"}
        opacity={canBuild ? 1 : 0.5}
      >
        <IconButton
          size={"sm"}
          aria-label={"Reset products store"}
          onClick={() => canBuild && resetProducts()}
          cursor={canBuild ? "pointer" : "not-allowed"}
          variant={"outline"}
          icon={<DeleteIcon />}
          borderRadius={6}
        />
        <Button
          size={"sm"}
          isLoading={isPending}
          onClick={() => canBuild && mutate()}
          cursor={canBuild ? "pointer" : "not-allowed"}
          borderRadius={6}
          disabled={!canBuild}
        >
          Build it!
        </Button>
      </ButtonGroup>
    </Flex>
  );
};
