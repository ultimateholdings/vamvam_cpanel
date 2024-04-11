import React, { useState } from "react";
import {
  VStack,
  HStack,
  Select,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";
import { DatePicker as AntDatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import SearchInput from "./SearchInput";

type Props = {
  onSelect: (value: string) => void;
  onSearch: (value: string) => void;
  onDateRangeChange: (
    startDate: string | undefined,
    endDate: string | undefined
  ) => void;
};

const SettledFilters: React.FC<Props> = ({
  onDateRangeChange,
  onSearch,
  onSelect,
}) => {
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
    null,
    null,
  ]);

  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleDateChange = (dates: any, dateStrings: [string, string]) => {
    const startDate =
      dateStrings[0] === ""
        ? undefined
        : dayjs(dateStrings[0]).format("YYYY-MM-DD");
    const endDate =
      dateStrings[1] === ""
        ? undefined
        : dayjs(dateStrings[1]).format("YYYY-MM-DD");
    setDateRange(dates);
    onDateRangeChange(startDate, endDate);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(e.target.value);
  };

  const status = [
    { value: "validated", label: "Active" },
    { value: "rejected", label: "Rejected" },
  ];

  const filterComponents = (
    <>
      <AntDatePicker.RangePicker
        value={dateRange}
        onChange={handleDateChange}
      />
      <Select
        maxW="200px"
        placeholder="Filter by status"
        fontSize="sm"
        onChange={handleSelect}
      >
        {status.map((s) => (
          <option key={s.value ?? "1"} value={s.value}>
            {s.label}
          </option>
        ))}
      </Select>
      <SearchInput placeholder="Search by name" onSearch={onSearch} />
    </>
  );

  return (
    <Box p={4}>
      {isMobile ? (
        <VStack spacing={4} align="center">
          {filterComponents}
        </VStack>
      ) : (
        <HStack spacing={4} align="center">
          {filterComponents}
        </HStack>
      )}
    </Box>
  );
};

export default SettledFilters;
