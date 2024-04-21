import React from "react";
import { Flex } from "@chakra-ui/react";
import {
  Price,
  PriceProps,
} from "@/entrypoints/popup/storefront/components/price/Price.tsx";

export interface Discount {
  percent: number;
  total: number;
}

interface PriceWithOfferProps extends Omit<PriceProps, "price"> {
  amount: {
    initial: number;
    total: number;
  };
}

export const PriceWithOffer: React.FC<PriceWithOfferProps> = ({
  currency,
  amount,
  interval,
}) => {
  return (
    <Flex alignItems={"center"} gap={2}>
      <Flex direction={"column"}>
        <Price price={amount.initial} currency={currency} withLineThrough />
        <Price price={amount.total} currency={currency} interval={interval} />
      </Flex>
    </Flex>
  );
};
