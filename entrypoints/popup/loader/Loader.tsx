import React from "react";
import { Flex, Spinner, Text } from "@chakra-ui/react";

interface LoaderProps {}

export const Loader: React.FC<LoaderProps> = (props) => {
  return (
    <Flex direction={"column"} paddingY={12} alignItems={"center"} gap={4}>
      <Spinner size={"xl"} aspectRatio={1} />
      <Text fontSize={"xl"}>Store is loading</Text>
    </Flex>
  );
};
