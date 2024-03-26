import {
  Box,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Logo } from "../../components/UI";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { sendResetOtp } from "../../api/auth/http";
import { useMutation } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { LoadingButton } from "../../components/UI";

export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const { mutate, isPending } = useMutation({
    mutationFn: sendResetOtp,
    onSuccess: (ttl: number) => {
      navigate(`/validate-code`, {
        state: { ttl, ...formData },
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        position: "bottom-center",
      });
    },
  });

  function handleSubmit(event: FormEvent) {
    const form = event.target as HTMLFormElement;
    event.preventDefault();
    if (form.checkValidity()) {
      const data = parseData(form.elements);
      setFormData(data);
      mutate(data);
    } else {
      form.reportValidity();
    }
  }

  function parseData(data: any) {
    const input = data.phoneOrMail?.value;
    let dataToSend = {};
    if (input.includes("@")) {
      dataToSend = { email: input };
    } else {
      dataToSend = { phoneNumber: input };
    }
    return dataToSend;
  }

  return (
    <Center h="100vh">
      <Box w={{ md: "20rem", sm: "70%" }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing="9">
            <Stack justify="center" align="center" spacing="4">
              <Logo />
              <Heading size="md">{t("auth.forgot_password")}</Heading>
            </Stack>
            <FormControl>
              <FormLabel htmlFor="email">{t("auth.phone_or_email")}</FormLabel>
              <Input id="email" type="text" name="phoneOrMail" required />
            </FormControl>
            <LoadingButton
              type="submit"
              loading={isPending}
              title={t("auth.send")}
            />
          </Stack>
        </form>
      </Box>
    </Center>
  );
}
