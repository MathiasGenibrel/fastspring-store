import React from "react";
import { Flex, Text } from "@chakra-ui/react";

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
  return (
    <Flex alignItems={"center"} gap={2}>
      <Flex direction={"column"}>
        <Text decoration={"line-through"} opacity={0.6}>
          {price} {currency}
        </Text>
        <Text fontSize={"md"}>
          {Math.round((price - discount.total) * 100) / 100} {currency}
        </Text>
      </Flex>
    </Flex>
  );
};
