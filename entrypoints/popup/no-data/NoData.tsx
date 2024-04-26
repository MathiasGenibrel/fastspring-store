import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { Bag } from "@/entrypoints/popup/icons/Bag.tsx";

interface NoDataProps {
  reloadStore: () => void;
}

export const NoData: React.FC<NoDataProps> = ({ reloadStore }) => {
  return (
    <Flex direction={"column"} alignItems={"center"} gap={4} paddingY={24}>
      <Bag fontSize={64} color={"teal"} />
      <Text fontSize={"4xl"} fontWeight={600}>
        No storefront detected
      </Text>
      <Flex gap={4} alignItems={"center"}>
        <Text fontSize={"lg"}>Do you have a store ? </Text>
        <Button size={"sm"} colorScheme={"purple"} onClick={reloadStore}>
          Reload store
        </Button>
      </Flex>
      <Text fontSize={"xs"} position={"absolute"} bottom={4} opacity={0.6}>
        *The first load must be from a page containing a store, after which it
        can be loaded anywhere in your domain.
      </Text>
    </Flex>
  );
};
