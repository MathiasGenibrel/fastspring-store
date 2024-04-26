import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useEffect,
  useState,
} from "react";

/**
 * Controlled search logic, with debounce
 * @param handleSearchContent - function to handle search content
 * @param debounceTime - debounce time in ms, default 500ms
 * @returns search and handleSearch
 */
export const useControlledSearch = (
  handleSearchContent: (search: string) => void,
  debounceTime = 500,
) => {
  const [search, setSearch] = useState("");

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      handleSearchContent(search);
      console.log(search);
    }
  };

  // Debounce search
  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log(search);
      handleSearchContent(search);
    }, debounceTime);

    return () => clearTimeout(timeout);
  }, [search]);

  return { search, handleSearch, handleKeyDown };
};
