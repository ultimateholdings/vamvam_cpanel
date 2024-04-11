import React, { useRef } from "react";
import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

type SearchInputProps = {
  onSearch: (query: string) => void;
  placeholder: string;
};

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, placeholder }) => {
  const lastChange = useRef<number | null>();

  // Custom implementation of debounce with 500ms delay
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (lastChange.current) {
      clearTimeout(lastChange.current);
    }

    lastChange.current = setTimeout(() => {
      lastChange.current = null;
      const query = event.target.value;
      onSearch(query);
    }, 500);
  };

  return (
    <Flex alignItems="center" width="300px">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<FaSearch color="gray.300" />}
        />
        <Input
          type="text"
          fontSize="sm"
          placeholder={placeholder}
          paddingRight="40px"
          onChange={handleChange}
        />
      </InputGroup>
    </Flex>
  );
};

export default SearchInput;
