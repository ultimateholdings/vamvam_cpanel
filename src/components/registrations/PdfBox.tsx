import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { FiFileText } from "react-icons/fi";

const PdfBox: React.FC<{ title: string; pdfUrl: string }> = ({
  title,
  pdfUrl,
}) => {
  const handleClick = () => {
    window.open(pdfUrl, "_blank");
  };

  return (
    <Box
      borderRadius="md"
      borderWidth="1px"
      borderColor="gray.200"
      p={4}
      cursor="pointer"
      onClick={handleClick}
    >
      <Flex align="center">
        <Box mr={2}>
          <FiFileText size={24} />
        </Box>
        <Text>{title}</Text>
      </Flex>
    </Box>
  );
};

export default PdfBox;
