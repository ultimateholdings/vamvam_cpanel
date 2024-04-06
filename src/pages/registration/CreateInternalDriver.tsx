import { FormEvent } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import { LoadingButton, PasswordField } from "../../components/UI";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createAdmin } from "../../api/admin/http";

function CreateInternalDriverPage() {
  const { t } = useTranslation();

  const { mutate, isPending } = useMutation({
    mutationFn: createAdmin,
    onSuccess: async () => {
      toast.success(t("users.create_user_success"));
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
      const password = data.password.value;
      const cpassword = data.cpassword.value;

      if (password !== cpassword) {
        toast.error(t("auth.password_should_match"));
        return;
      }

      mutate({
        email: data.email.value,
        phoneNumber: data.phoneNumber.value,
        password,
        type: data.type.value,
      });
    } else {
      form.reportValidity();
    }
  }

  return (
    <Box p={2} maxWidth="500px" margin="auto">
      <Heading size="xl" mb={4} textAlign="left">
        {t("users.create_admin_user")}
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel> {t("users.phone")}</FormLabel>
            <Input type="tel" name="phoneNumber" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel> {t("users.age_range")}</FormLabel>
            <Select name="type">
              {["18-24", "25-34", "35-44", "45-54", "55-64", "64+"].map(
                (age) => (
                  <option key={age} value={age}>
                    {age}
                  </option>
                )
              )}
            </Select>
          </FormControl>
          <PasswordField name="password" label={t("auth.password")} />
          <PasswordField name="cpassword" label={t("auth.confirm_password")} />
          <FormControl>
            <FormLabel> {t("users.gender")}</FormLabel>
            <Select name="gender">
              <option value="M">{t("users.male")}</option>
              <option value="F">{t("users.female")}</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel> {t("users.sponsor_code")}</FormLabel>
            <Input type="text" name={t("users.sponsor_code")} />
          </FormControl>
          <LoadingButton
            type="submit"
            mt="4"
            w="100%"
            colorScheme="blue"
            loading={isPending}
            title="Create driver"
          />
        </VStack>
      </form>
    </Box>
  );
}

export default CreateInternalDriverPage;
