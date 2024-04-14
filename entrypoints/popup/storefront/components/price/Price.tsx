import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { getPriceWithCurrency } from "@/entrypoints/popup/storefront/components/price/getPriceWithCurrency.ts";

export interface PriceProps {
  currency: string;
  price: number;
  interval?: string;
}

export interface AdditionalProps {
  withLineThrough?: boolean;
}

export const Price: React.FC<PriceProps & AdditionalProps> = ({
  currency,
  price,
  withLineThrough,
  interval,
}) => {
  return (
    <Flex gap={2} alignItems={"center"}>
      <Text
        fontSize={"md"}
        textDecoration={withLineThrough ? "line-through" : undefined}
      >
        {getPriceWithCurrency(currency, price)}
      </Text>
      {!withLineThrough && interval && <Text opacity={0.6}>{interval}</Text>}
    </Flex>
  );
};
