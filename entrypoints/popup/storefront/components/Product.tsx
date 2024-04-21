import React from "react";
import {
  Discount,
  PriceWithOffer,
} from "@/entrypoints/popup/storefront/components/price/PriceWithOffer.tsx";
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
  price: number;
  display: string;
  path: string;
  discount: Discount;
  subscription: StorefrontPayloadSubscription;
  description: IProduct["description"];
}

export const Product: React.FC<ProductProps> = ({
  currency,
  discount,
  display,
  price,
  image,
  path,
  subscription,
  description,
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
        <DiscountPercent percent={discount.percent} />
      </Td>
      <Td>
        <Action />
      </Td>
    </Tr>
  );
};
