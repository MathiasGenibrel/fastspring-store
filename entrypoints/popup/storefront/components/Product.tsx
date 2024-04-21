import React from "react";
import { PriceWithOffer } from "@/entrypoints/popup/storefront/components/price/PriceWithOffer.tsx";
import { Td, Tr } from "@chakra-ui/react";
import { ProductName } from "@/entrypoints/popup/storefront/components/ProductName.tsx";
import { Price } from "@/entrypoints/popup/storefront/components/price/Price.tsx";
import { DiscountPercent } from "@/entrypoints/popup/storefront/components/DiscountPercent.tsx";
import {
  Product as IProduct,
  StorefrontPayloadSubscription,
} from "@/src/storefront/storefront.type.ts";
import { Action } from "@/entrypoints/popup/storefront/components/Action.tsx";

interface ProductProps {
  image: string | null;
  currency: string;
  display: string;
  amount: {
    price: number;
    discount: number;
    total: number;
  };
  path: string;
  subscription: StorefrontPayloadSubscription;
  description: IProduct["description"];
}

export const Product: React.FC<ProductProps> = ({
  currency,
  display,
  amount,
  image,
  path,
  subscription,
  description,
}) => {
  const interval = subscription?.intervalUnit
    ? `/ ${subscription?.intervalUnit}`
    : "";

  const offer =
    amount.discount > 0 ? (
      <PriceWithOffer
        currency={currency}
        amount={{ initial: amount.price, total: amount.total }}
        interval={interval}
      />
    ) : (
      <Price currency={currency} price={amount.price} interval={interval} />
    );

  return (
    <Tr>
      <Td>
        <ProductName
          display={display}
          path={path}
          image={image}
          description={description}
        />
      </Td>
      <Td>{offer}</Td>
      <Td>
        <DiscountPercent percent={amount.discount} />
      </Td>
      <Td>
        <Action path={path} />
      </Td>
    </Tr>
  );
};
