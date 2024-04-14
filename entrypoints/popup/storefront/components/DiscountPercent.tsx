import React from "react";
import { useOfferColorScheme } from "@/entrypoints/popup/storefront/components/price/useOfferColorScheme.ts";
import { Center, Tag } from "@chakra-ui/react";

interface DiscountPercentProps {
  percent: number;
}

export const DiscountPercent: React.FC<DiscountPercentProps> = ({
  percent,
}) => {
  const scheme = useOfferColorScheme(percent);

  const content = percent > 0 ? `-${percent}%` : "-";

  return (
    <Center>
      <Tag size={"sm"} colorScheme={scheme}>
        {content}
      </Tag>
    </Center>
  );
};
