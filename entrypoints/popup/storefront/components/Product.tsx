import React from "react";
import {
  Discount,
  PriceWithOffer,
} from "@/entrypoints/popup/storefront/components/price/PriceWithOffer.tsx";
import { Td, Tr } from "@chakra-ui/react";
import { ProductName } from "@/entrypoints/popup/storefront/components/ProductName.tsx";
import { Price } from "@/entrypoints/popup/storefront/components/price/Price.tsx";
import { DiscountPercent } from "@/entrypoints/popup/storefront/components/DiscountPercent.tsx";
import { StorefrontPayloadSubscription } from "@/src/storefront/storefront.type.ts";

interface ProductProps {
  image: string | null;
  currency: string;
  price: number;
  display: string;
  sku: string;
  discount: Discount;
  subscription: StorefrontPayloadSubscription;
}

export const Product: React.FC<ProductProps> = ({
  currency,
  discount,
  display,
  price,
  image,
  sku,
  subscription,
}) => {
  const interval = subscription?.intervalUnit
    ? `/ ${subscription?.intervalUnit}`
    : "";

  const offer =
    discount.percent > 0 ? (
      <PriceWithOffer
        currency={currency}
        price={price}
        interval={interval}
        discount={{
          percent: discount.percent,
          total: discount.total,
        }}
      />
    ) : (
      <Price currency={currency} price={price} interval={interval} />
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
