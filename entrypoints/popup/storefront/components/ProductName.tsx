import React from "react";
import { Flex, Image, Text, Tooltip } from "@chakra-ui/react";

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
      <Flex direction={"column"} maxWidth={64} overflow={"hidden"}>
        <NameTooltip name={display}>
          <Text fontSize={"md"} {...TextStyle}>
            {display}
          </Text>
        </NameTooltip>
        <NameTooltip name={sku}>
          <Text opacity={0.6} {...TextStyle}>
            {sku}
          </Text>
        </NameTooltip>
      </Flex>
    </Flex>
  );
};
