import React, { FC } from "react";
import { ActionType } from "@/src/storefront/storefront.reducer.ts";
import { Flex, Th } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

export interface HeaderProps {
  title: string;
  sortFunction?: {
    ascending: () => void;
    descending: () => void;
    reset: () => void;
  };
}

interface Sorter {
  type: ActionType | null;
  field: string | null;
}

let sorter: Sorter = { type: null, field: null };

export const Header: FC<HeaderProps> = ({ title, sortFunction }) => {
  if (!sortFunction) return <Th>{title}</Th>;

  const isAscending =
    sorter.type === ActionType.SORT_BY_ASCENDING && sorter.field === title;
  const isDescending =
    sorter.type === ActionType.SORT_BY_DESCENDING && sorter.field === title;

  const handleSort = () => {
    if (sorter.field !== title) sorter = { type: null, field: null };

    switch (sorter.type) {
      case ActionType.SORT_BY_ASCENDING:
        sortFunction.descending();
        sorter = { type: ActionType.SORT_BY_DESCENDING, field: title };
        break;

      case ActionType.SORT_BY_DESCENDING:
        sortFunction.reset();
        sorter = { type: null, field: null };
        break;

      default:
        sortFunction.ascending();
        sorter = { type: ActionType.SORT_BY_ASCENDING, field: title };
        break;
    }
  };

  return (
    <Th onClick={handleSort} cursor={"pointer"}>
      <Flex gap={8} alignItems={"center"} justifyContent={"space-between"}>
        {title}
        <Flex direction={"column"}>
          <ChevronUpIcon color={isDescending ? "blue" : undefined} />
          <ChevronDownIcon color={isAscending ? "blue" : undefined} />
        </Flex>
      </Flex>
    </Th>
  );
};
