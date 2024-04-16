import React from "react";
import { Badge, Flex, Tooltip } from "@chakra-ui/react";

interface NameTooltipProps {
  name: string;
  type: string;
  children: React.ReactNode;
}

const LabelTooltip: React.FC<Omit<NameTooltipProps, "children">> = ({
  name,
  type,
}) => {
  return (
    <Flex gap={2} alignItems={"center"}>
      <Badge>{type}</Badge>
      {name}
    </Flex>
  );
};

export const NameTooltip: React.FC<NameTooltipProps> = ({
  name,
  type,
  children,
}) => {
  return (
    <Tooltip
      label={<LabelTooltip name={name} type={type} />}
      openDelay={500}
      cursor={"help"}
    >
      {children}
    </Tooltip>
  );
};
