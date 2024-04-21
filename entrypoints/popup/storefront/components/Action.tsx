import { FC } from "react";
import { Button, HStack, Input, useNumberInput } from "@chakra-ui/react";
import { StorefrontPayloadProduct } from "@/src/storefront/storefront.type.ts";
import { useProductsStore } from "@/entrypoints/popup/stores/product.store.ts";

interface ActionProps {
  path: StorefrontPayloadProduct["path"];
}

const MAX_QUANTITY = 99;
const MIN_QUANTITY = 0;

export const Action: FC<ActionProps> = ({ path }) => {
  const changeProductQuantity = useProductsStore((state) => state.change);
  const currentQuantity = useProductsStore((state) => state.products[path]);
  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
    value,
  } = useNumberInput({
    step: 1,
    value: currentQuantity ?? MIN_QUANTITY,
    min: MIN_QUANTITY,
    max: MAX_QUANTITY,
    onChange: (_, valueAsNumber: number) => {
      if (valueAsNumber < MIN_QUANTITY) {
        return;
      }
      if (valueAsNumber > MAX_QUANTITY) {
        return;
      }

      changeProductQuantity(path, valueAsNumber);
    },
  });

  return (
    <HStack maxW="320px">
      <Button size={"sm"} {...getDecrementButtonProps()}>
        -
      </Button>
      <Input
        size={"sm"}
        aspectRatio={"1.25 / 1"}
        textAlign={"center"}
        {...getInputProps()}
      />
      <Button size={"sm"} {...getIncrementButtonProps()}>
        +
      </Button>
    </HStack>
  );
};
