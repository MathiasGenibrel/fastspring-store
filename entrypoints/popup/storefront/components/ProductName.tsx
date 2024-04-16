import React from "react";
import { Flex, Image, Text, Tooltip } from "@chakra-ui/react";
import { ComplementaryInformation } from "@/entrypoints/popup/storefront/components/ComplementaryInformation.tsx";
import { Product } from "@/src/storefront/storefront.type.ts";

const TextStyle = {
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
};

interface NameTooltipProps {
  name: string;
  children: React.ReactNode;
}

const NameTooltip: React.FC<NameTooltipProps> = ({ name, children }) => {
  return (
    <Tooltip label={name} openDelay={500}>
      {children}
    </Tooltip>
  );
};

interface ProductProps {
  display: string;
  sku: string;
  image: string | null;
  description: Product["description"];
}

export const ProductName: React.FC<ProductProps> = ({
  display,
  sku,
  image,
  description,
}) => {
  return (
    <Flex gap={2} alignItems={"center"}>
      <Image
        src={image || "https://via.placeholder.com/48"}
        aspectRatio={1}
        objectFit={"cover"}
        width={12}
        borderRadius={8}
      />
      <Flex
        width={"100%"}
        direction={"column"}
        maxWidth={64}
        overflow={"hidden"}
      >
        <Flex
          direction={"row"}
          gap={4}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <NameTooltip name={display}>
            <Text cursor={"help"} fontSize={"md"} {...TextStyle}>
              {display}
            </Text>
          </NameTooltip>
          {Object.keys(description).length > 0 && (
            <ComplementaryInformation description={description} />
          )}
        </Flex>
        <NameTooltip name={sku}>
          <Text opacity={0.6} {...TextStyle}>
            {sku}
          </Text>
        </NameTooltip>
      </Flex>
    </Flex>
  );
};
