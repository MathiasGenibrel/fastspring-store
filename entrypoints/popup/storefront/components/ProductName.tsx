import React from "react";
import { Flex, Image, Text } from "@chakra-ui/react";

interface ProductProps {
  display: string;
  sku: string;
  image: string | null;
}

export const ProductName: React.FC<ProductProps> = ({
  display,
  sku,
  image,
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
      <Flex direction={"column"}>
        <Text noOfLines={1} fontSize={"md"}>
          {display}
        </Text>
        <Text opacity={0.6}>{sku}</Text>
      </Flex>
    </Flex>
  );
};
