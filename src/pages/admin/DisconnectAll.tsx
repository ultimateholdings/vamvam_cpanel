import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import RevokeAllButton from "../../components/Users/RevokeAllButton";

const DisconnectAllPage = () => {
  const { t } = useTranslation();
  return (
    <Box p="6">
      <VStack spacing="6" align="start" justify="start">
        <Heading size="xl" textAlign="left">
          {t("users.disconnect_all_users")}
        </Heading>
        <Box
          borderWidth="1px"
          borderColor="gray.600"
          borderRadius="md"
          w={{ base: "full", md: "md" }}
          p="6"
          mb="4"
          alignContent="center"
        >
          <Flex align="start" direction="column">
            <Text as="i" fontSize="md" mb={4}>
              {t("users.disconnect_warning")}
            </Text>
            <RevokeAllButton />
          </Flex>
        </Box>
      </VStack>
    </Box>
  );
};

export default DisconnectAllPage;
