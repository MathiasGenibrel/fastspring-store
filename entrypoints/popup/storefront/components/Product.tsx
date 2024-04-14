import React from "react";
import {
  Discount,
  PriceWithOffer,
} from "@/entrypoints/popup/storefront/components/price/PriceWithOffer.tsx";
import { Td, Tr } from "@chakra-ui/react";
import { ProductName } from "@/entrypoints/popup/storefront/components/ProductName.tsx";
import { Price } from "@/entrypoints/popup/storefront/components/price/Price.tsx";
import { DiscountPercent } from "@/entrypoints/popup/storefront/components/DiscountPercent.tsx";

interface ProductProps {
  image: string | null;
  currency: string;
  price: number;
  display: string;
  sku: string;
  discount: Discount;
}

export const Product: React.FC<ProductProps> = ({
  currency,
  discount,
  display,
  price,
  image,
  sku,
}) => {
  const offer =
    discount.percent > 0 ? (
      <PriceWithOffer
        currency={currency}
        price={price}
        discount={{
          percent: discount.percent,
          total: discount.total,
        }}
      />
    ) : (
      <Price currency={currency} price={price} />
    );

  return (
    <Tr>
      <Td pr={12}>
        <ProductName display={display} sku={sku} image={image} />
      </Td>
      <Td>{offer}</Td>
      <Td>
        <DiscountPercent percent={discount.percent} />
      </Td>
    </Tr>
  );
};
