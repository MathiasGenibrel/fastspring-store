import React from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Kbd,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useControlledSearch } from "@/entrypoints/popup/header/components/search/useControlledSearch.tsx";

interface SearchProps {
  handleSearchContent: (search: string) => void;
}

export const Search: React.FC<SearchProps> = ({ handleSearchContent }) => {
  const { search, handleSearch, handleKeyDown } =
    useControlledSearch(handleSearchContent);

  return (
    <InputGroup maxWidth={64} size={"sm"}>
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.500" />
      </InputLeftElement>
      <Input
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        value={search}
        type="search"
        placeholder="product or path-name"
        borderRadius={6}
      />
      <InputRightElement pointerEvents="none" paddingRight={8}>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </InputRightElement>
    </InputGroup>
  );
};
