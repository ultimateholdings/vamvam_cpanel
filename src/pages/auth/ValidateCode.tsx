import {
  Box,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { Logo } from "../../components/UI";
import { useTranslation } from "react-i18next";
import { FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { verifyResetCode } from "../../api/auth/http";
import toast from "react-hot-toast";
import { LoadingButton } from "../../components/UI";
import ResendSection from "../../components/auth/ResendSection";

export default function ValidateCodePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state: locationState } = useLocation();

  const { mutate, isPending } = useMutation({
    mutationFn: verifyResetCode,
    onSuccess: (resetToken: string) => {
      navigate(`/reset-password`, {
        state: { resetToken },
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
      const code = parseData(form.elements);
      const { phoneNumber, email } = locationState;
      mutate({ phoneNumber, email, code });
    } else {
      form.reportValidity();
    }
  }

  function parseData(data: any) {
    return data.code?.value;
  }

  return (
    <Center h="100vh">
      <Box w={{ md: "22rem", sm: "70%" }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing="9">
            <Stack justify="center" align="center" spacing="4">
              <Logo />
              <Heading size="md" textAlign="center">
                {t("auth.validate_code")}
              </Heading>
            </Stack>
            <FormControl>
              <FormLabel htmlFor="code">Code</FormLabel>
              <Input id="code" type="text" name="code" required />
            </FormControl>
            <LoadingButton
              type="submit"
              loading={isPending}
              title={t("auth.validate")}
            />
            <ResendSection ttl={locationState.ttl} />
          </Stack>
        </form>
      </Box>
    </Center>
  );
}
