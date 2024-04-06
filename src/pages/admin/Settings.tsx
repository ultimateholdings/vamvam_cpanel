import { useLoaderData } from "react-router-dom";
import {
  DeliverySettingsData,
  OTPSettingsData,
} from "../../models/admin/settings";
import { Box, Heading, VStack } from "@chakra-ui/react";
import DeliverySettingsForm from "../../components/Settings/DeliverySettingsForm";
import OTPSettingsForm from "../../components/Settings/OTPSettingsForm";
import { useTranslation } from "react-i18next";

const SettingsPage = () => {
  const { settings } = useLoaderData() as {
    settings: (OTPSettingsData | DeliverySettingsData)[];
  };
  const { t } = useTranslation();

  if ((settings ?? []).length === 0) {
    return <div>{t("settings.not_found")}</div>;
  }

  const otpSettings = settings.find((s) => s.type === "otp") as OTPSettingsData;
  const deliverySettings = settings.find(
    (s) => s.type === "delivery"
  ) as DeliverySettingsData;
  const deliveryData = deliverySettings.value;

  return (
    <Box p="6">
      <VStack spacing="6" align="center" justify="start">
        <Heading size="xl" textAlign="left">
          {t("settings.title")}
        </Heading>
        <OTPSettingsForm ttl={otpSettings.value.ttl} />
        <DeliverySettingsForm {...deliveryData} />
      </VStack>
    </Box>
  );
};

export default SettingsPage;
