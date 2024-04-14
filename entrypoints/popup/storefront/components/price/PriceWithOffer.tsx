import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { getPriceWithCurrency } from "@/entrypoints/popup/storefront/components/price/getPriceWithCurrency.ts";

export interface Discount {
  percent: number;
  total: number;
}

interface PriceWithOfferProps {
  price: number;
  currency: string;
  discount: Discount;
}

export const PriceWithOffer: React.FC<PriceWithOfferProps> = ({
  currency,
  price,
  discount,
}) => {
  const discountPrice = Math.round((price - discount.total) * 100) / 100;

  return (
    <Flex alignItems={"center"} gap={2}>
      <Flex direction={"column"}>
        <Text decoration={"line-through"} opacity={0.6}>
          {getPriceWithCurrency(currency, price)}
        </Text>
        <Text fontSize={"md"}>
          {getPriceWithCurrency(currency, discountPrice)}
        </Text>
      </Flex>
    </Flex>
  );
};
