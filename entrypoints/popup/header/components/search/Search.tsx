import React, { useRef } from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Kbd,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useControlledSearch } from "@/entrypoints/popup/header/components/search/useControlledSearch.tsx";
import {
  IS_MAC,
  useSearchShortcut,
} from "@/entrypoints/popup/header/components/search/useSearchShortcut.ts";

interface SearchProps {
  handleSearchContent: (search: string) => void;
}

export const Search: React.FC<SearchProps> = ({ handleSearchContent }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { search, handleSearch, handleKeyDown } =
    useControlledSearch(handleSearchContent);

  // Load the search shortcut
  useSearchShortcut(inputRef);

  return (
    <InputGroup maxWidth={64} size={"sm"}>
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.500" />
      </InputLeftElement>
      <Input
        ref={inputRef}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        value={search}
        type="search"
        placeholder="product or path-name"
        borderRadius={6}
      />
      <InputRightElement pointerEvents="none" paddingRight={8}>
        <Kbd>{IS_MAC ? "⌘" : "ctrl"}</Kbd>
        <Kbd>K</Kbd>
      </InputRightElement>
    </InputGroup>
  );
};
