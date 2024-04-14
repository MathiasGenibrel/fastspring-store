import { Button, HStack, Input, useNumberInput } from "@chakra-ui/react";

export const Action = () => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 0,
      min: 0,
      max: 99,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  // TODO: add context to handle the state
  // - Use reducer to handle quantity selected, with "path" like unique identifier
  //  - This reducer should handle the increment, decrement
  // - Use context to share the state between components
  // To get value from the input, use input.value

  return (
    <HStack maxW="320px">
      <Button size={"sm"} {...dec}>
        -
      </Button>
      <Input
        size={"sm"}
        aspectRatio={"1.25 / 1"}
        textAlign={"center"}
        {...input}
      />
      <Button size={"sm"} {...inc}>
        +
      </Button>
    </HStack>
  );
};
