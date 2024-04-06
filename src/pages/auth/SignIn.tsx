import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/auth/http";
import LoginData from "../../models/auth/login-data";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchUserData } from "../../store/profile/profile-actions";
import { getUserRole } from "../../helper/utils";
import { FormEvent } from "react";

import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
} from "@chakra-ui/react";
import { LoadingButton, Logo, PasswordField } from "../../components/UI";

export default function SignInPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: async () => {
      await dispatch(fetchUserData());
      navigate(`/${getUserRole()}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function parseLoginData(data: any) {
    const loginInput = data.phoneOrMail?.value;
    const dataToSend = { password: data?.password?.value };
    if (loginInput.includes("@")) {
      Object.assign(dataToSend, { email: loginInput });
    } else {
      Object.assign(dataToSend, { phoneNumber: loginInput });
    }
    return new LoginData(dataToSend);
  }

  function handleSubmit(event: FormEvent) {
    const form = event.target as HTMLFormElement;
    event.preventDefault();
    if (form.checkValidity()) {
      mutate(parseLoginData(form.elements));
    } else {
      form.reportValidity();
    }
  }

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing="8">
          <Stack spacing="6" align="center" justify="center">
            <Logo />
            <Heading size="md" textAlign="center">
              {t("auth.login_heading")}
            </Heading>
          </Stack>
          <Box
            py={{ base: "0", sm: "8" }}
            px={{ base: "4", sm: "10" }}
            bg={{ base: "transparent", sm: "bg.surface" }}
            boxShadow={{ base: "none", sm: "md" }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="email">{t("auth.phone")}</FormLabel>
                  <Input id="email" type="text" name="phoneOrMail" required />
                </FormControl>
                <PasswordField name="password" />
              </Stack>
              <HStack justify="space-between">
                <Checkbox defaultChecked>{t("auth.remember_me")}</Checkbox>
                <Button variant="text" size="sm" disabled={isPending}>
                  <Link to="/forgot-password">
                    {t("auth.forgot_password")} ?
                  </Link>
                </Button>
              </HStack>
              <LoadingButton
                type="submit"
                loading={isPending}
                title={t("auth.sign_in")}
              />
            </Stack>
          </Box>
        </Stack>
      </form>
    </Container>
  );
}
