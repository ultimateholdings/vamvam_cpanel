import { FormControl, FormLabel, Input, InputGroup } from "@chakra-ui/react";
import React from "react";

type Props = {
  onSelectDate: (date: string) => void;
  title: string;
  value:string 
};

const FilterByDateInput: React.FC<Props> = ({ onSelectDate, title, value }) => {

  return (
    <InputGroup maxW="xs">
      <FormControl>
        <FormLabel>{title}</FormLabel>
        <Input placeholder='Select Date and Time' value={value} size='md' type='datetime-local' onChange={(event) => onSelectDate!(event.target.value)} />
      </FormControl>
    </InputGroup>
  );
};

export default FilterByDateInput;
