import React from "react";
import { Text } from "@chakra-ui/react";

interface PriceProps {
  currency: string;
  price: number;
}

export const Price: React.FC<PriceProps> = ({ currency, price }) => {
  return (
    <>
      <Text fontSize={"md"}>
        {price} {currency}
      </Text>
    </>
  );
};
