import React from "react";
import { Text } from "@chakra-ui/react";
import { getPriceWithCurrency } from "@/entrypoints/popup/storefront/components/price/getPriceWithCurrency.ts";

interface PriceProps {
  currency: string;
  price: number;
}

export const Price: React.FC<PriceProps> = ({ currency, price }) => {
  return (
    <>
      <Text fontSize={"md"}>{getPriceWithCurrency(currency, price)}</Text>
    </>
  );
};
