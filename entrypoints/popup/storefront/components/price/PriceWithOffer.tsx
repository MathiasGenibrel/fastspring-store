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

interface PriceWithOfferProps extends PriceProps {
  discount: Discount;
}

export const PriceWithOffer: React.FC<PriceWithOfferProps> = ({
  currency,
  price,
  discount,
  interval,
}) => {
  const discountPrice = Math.round((price - discount.total) * 100) / 100;

  return (
    <Flex alignItems={"center"} gap={2}>
      <Flex direction={"column"}>
        <Price price={price} currency={currency} withLineThrough />
        <Price price={discountPrice} currency={currency} interval={interval} />
      </Flex>
    </Flex>
  );
};
