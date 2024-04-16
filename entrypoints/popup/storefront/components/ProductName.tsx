import React from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
import { ComplementaryInformation } from "@/entrypoints/popup/storefront/components/ComplementaryInformation.tsx";
import { Product } from "@/src/storefront/storefront.type.ts";
import { NameTooltip } from "@/entrypoints/popup/storefront/components/tooltip/NameTooltip.tsx";

interface ProductProps {
  display: string;
  path: string;
  image: string | null;
  description: Product["description"];
}

export const ProductName: React.FC<ProductProps> = ({
  display,
  path,
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
          <NameTooltip name={display} type={"display"}>
            <Text fontSize={"md"} {...TextStyle}>
              {display}
            </Text>
          </NameTooltip>
          {Object.keys(description).length > 0 && (
            <ComplementaryInformation description={description} />
          )}
        </Flex>
        <NameTooltip name={path} type={"path"}>
          <Text opacity={0.6} {...TextStyle}>
            {path}
          </Text>
        </NameTooltip>
      </Flex>
    </Flex>
  );
};

const TextStyle = {
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
  cursor: "help",
};
