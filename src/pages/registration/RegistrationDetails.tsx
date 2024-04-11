import { Location, useLocation, useNavigate } from "react-router-dom";
import { RegistrationData } from "../../models/registrations/registration-data";
import { FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { updateRegistration } from "../../api/registration/http";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { LoadingButton } from "../../components/UI";
import UploadFileBox from "../../components/registrations/UploadFileBox";
import PdfBox from "../../components/registrations/PdfBox";
import { getFilePath } from "../../helper/utils";
import HandleRegistrationActions from "../../components/registrations/HandleRegistrationActions";

type RegisStatus = "pending" | "reviewing" | "editing";
function RegistrationDetails() {
  const { t } = useTranslation();
  const { state: data } = useLocation() as Location<RegistrationData>;

  const [registrationData, setRegistrationData] = useState(data);
  const [actionState, setActionState] = useState<RegisStatus>(() => {
    if (registrationData.status === "pending" && data.contributorId) {
      return "reviewing";
    }
    return registrationData.status as RegisStatus;
  });
  const [file, setFile] = useState<File>();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: updateRegistration,
    onSuccess: async () => {
      toast.success(t("registrations.update_registration_success"));
      navigate("..");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function handleSubmit(event: FormEvent) {
    const form = event.target as HTMLFormElement;
    event.preventDefault();
    if (form.checkValidity()) {
      const data = form.elements as any;
      mutate({
        id: registrationData.id,
        email: data.email.value,
        phoneNumber: data.phoneNumber.value,
        age: data.age.value,
        firstName: data.firstName.value,
        lastName: data.lastName.value,
        gender: data.gender.value,
        carInfos: file,
        sponsorCode: data.sponsorCode.value,
      });
    } else {
      form.reportValidity();
    }
  }

  function handleChangeRegistrationData(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setRegistrationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleChangeEdit() {
    setActionState("editing");
  }

  function handleCancelEdit() {
    setActionState("pending");
    setRegistrationData(data);
    setFile(undefined);
  }

  const isEditing = actionState === "editing";

  const headerButton = isEditing ? (
    <Button colorScheme="gray.600" variant="outline" onClick={handleCancelEdit}>
      {t("cancel")}
    </Button>
  ) : (
    <Button
      colorScheme="blue"
      py={1}
      px={5}
      variant="outline"
      onClick={handleChangeEdit}
    >
      {t("registrations.edit")}
    </Button>
  );

  return (
    <Box p={2} maxWidth={{ base: "100%", md: "700px" }} margin="auto">
      <HStack spacing={7} align="center" justify="center" mb={9}>
        <Heading size="lg" textAlign="center">
          {t("registrations.registration_details")}
        </Heading>
        {registrationData.status === "rejected" && headerButton}
      </HStack>
      <form onSubmit={handleSubmit}>
        <VStack spacing={8}>
          <HStack spacing={8} w="full" align="space-between">
            <FormControl isRequired={isEditing}>
              <FormLabel>{t("users.first_name")}</FormLabel>
              {isEditing && (
                <Input
                  type="text"
                  name="firstName"
                  value={registrationData.firstName}
                  onChange={handleChangeRegistrationData}
                />
              )}
              {!isEditing && (
                <Box
                  w="full"
                  borderRadius={8}
                  borderColor="gray.600"
                  p={2}
                  pl={4}
                  borderWidth={1}
                >
                  <Text>{registrationData.firstName}</Text>
                </Box>
              )}
            </FormControl>
            <FormControl isRequired={isEditing}>
              <FormLabel> {t("users.last_name")}</FormLabel>
              {isEditing && (
                <Input
                  type="text"
                  name="lastName"
                  value={registrationData.lastName}
                  onChange={handleChangeRegistrationData}
                />
              )}
              {!isEditing && (
                <Box
                  w="full"
                  borderRadius={8}
                  borderColor="gray.600"
                  p={2}
                  pl={4}
                  borderWidth={1}
                >
                  <Text>{registrationData.lastName}</Text>
                </Box>
              )}
            </FormControl>
          </HStack>
          <HStack spacing={8} w="full" align="space-between">
            <FormControl isRequired={isEditing}>
              <FormLabel>Email</FormLabel>
              {isEditing && (
                <Input
                  type="email"
                  name="email"
                  value={registrationData.email}
                  onChange={handleChangeRegistrationData}
                />
              )}
              {!isEditing && (
                <Box
                  w="full"
                  borderRadius={8}
                  borderColor="gray.600"
                  p={2}
                  pl={4}
                  borderWidth={1}
                >
                  <Text>{registrationData.email}</Text>
                </Box>
              )}
            </FormControl>
            <FormControl isRequired={isEditing}>
              <FormLabel> {t("users.phone")}</FormLabel>
              {isEditing && (
                <Input
                  type="tel"
                  name="phoneNumber"
                  value={registrationData.phoneNumber}
                  onChange={handleChangeRegistrationData}
                />
              )}
              {!isEditing && (
                <Box
                  w="full"
                  borderRadius={8}
                  borderColor="gray.600"
                  p={2}
                  pl={4}
                  borderWidth={1}
                >
                  <Text>{registrationData.phoneNumber}</Text>
                </Box>
              )}
            </FormControl>
          </HStack>
          <HStack spacing={8} w="full" align="space-between">
            <FormControl isRequired={isEditing}>
              <FormLabel> {t("users.age_range")}</FormLabel>
              {isEditing && (
                <Select
                  name="age"
                  value={registrationData.age}
                  onChange={handleChangeRegistrationData}
                >
                  {["18-24", "25-34", "35-44", "45-54", "55-64", "64+"].map(
                    (age) => (
                      <option key={age} value={age}>
                        {age}
                      </option>
                    )
                  )}
                </Select>
              )}
              {!isEditing && (
                <Box
                  w="full"
                  borderRadius={8}
                  borderColor="gray.600"
                  p={2}
                  pl={4}
                  borderWidth={1}
                >
                  <Text>{registrationData.age}</Text>
                </Box>
              )}
            </FormControl>
            <FormControl>
              <FormLabel> {t("users.gender")}</FormLabel>
              {isEditing && (
                <Select
                  name="gender"
                  value={registrationData.gender}
                  onChange={handleChangeRegistrationData}
                >
                  <option value="M">{t("users.male")}</option>
                  <option value="F">{t("users.female")}</option>
                </Select>
              )}
              {!isEditing && (
                <Box
                  w="full"
                  borderRadius={8}
                  borderColor="gray.600"
                  p={2}
                  pl={4}
                  borderWidth={1}
                >
                  <Text>{registrationData.gender ?? "--"}</Text>
                </Box>
              )}
            </FormControl>
          </HStack>
          <HStack spacing={8} w="full" align="space-between">
            <FormControl>
              <FormLabel> {t("registrations.sponsor_code")}</FormLabel>
              {isEditing && (
                <Input
                  mr={8}
                  type="text"
                  name="sponsorCode"
                  value={registrationData.sponsorCode}
                  onChange={handleChangeRegistrationData}
                />
              )}
              {!isEditing && (
                <Box
                  w="full"
                  borderRadius={8}
                  borderColor="gray.600"
                  p={2}
                  pl={4}
                  borderWidth={1}
                >
                  <Text>{registrationData.sponsorCode ?? "--"}</Text>
                </Box>
              )}
            </FormControl>
            <FormControl>
              <FormLabel> {t("registrations.bike_infos")}</FormLabel>
              {!isEditing && (
                <PdfBox
                  pdfUrl={getFilePath(registrationData.carInfos! as string)}
                  title={t("registrations.pdf_document")}
                />
              )}
              {isEditing && <UploadFileBox file={file} onSetFile={setFile} />}
            </FormControl>
          </HStack>

          {isEditing && (
            <LoadingButton
              type="submit"
              mt="4"
              w={{ base: "full", md: "30%" }}
              colorScheme="blue"
              loading={isPending}
              title={t("registrations.update_registration")}
            />
          )}

          {!isEditing && registrationData.status !== "active" && (
            <HandleRegistrationActions
              id={registrationData.id!}
              status={
                actionState === "reviewing"
                  ? "reviewing"
                  : registrationData.status!
              }
              onHandled={() => setActionState("reviewing")}
            />
          )}
        </VStack>
      </form>
    </Box>
  );
}

export default RegistrationDetails;
