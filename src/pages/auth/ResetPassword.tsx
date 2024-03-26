import { Box, Center, Heading, Stack } from "@chakra-ui/react";
import { LoadingButton, Logo, PasswordField } from "../../components/UI";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FormEvent } from "react";
import { resetPassword } from "../../api/auth/http";

export default function ResetPasswordPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state: locationState } = useLocation();

  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      navigate(`/signing`, { replace: true });
      toast.success(t("auth.password_update_success"), {
        position: "bottom-center",
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function handleSubmit(event: FormEvent) {
    const form = event.target as HTMLFormElement;
    event.preventDefault();
    if (form.checkValidity()) {
      const data = parseData(form.elements);
      const password = data.password;
      const cpassword = data.cpassword;
      if (password.length < 8) {
        toast.error(t("auth.password_length"), {
          position: "bottom-center",
        });
        return;
      }

      if (password != cpassword) {
        toast.error(t("auth.password_should_match"), {
          position: "bottom-center",
        });
        return;
      }
      mutate(password, locationState.resetToken);
    } else {
      form.reportValidity();
    }
  }

  function parseData(data: any) {
    const password = data.password?.value;
    const cpassword = data.cpassword?.value;
    return { password, cpassword };
  }

  return (
    <Center h="100vh">
      <Box w={{ md: "25rem", sm: "70%" }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing="9">
            <Stack justify="center" align="center" spacing="4">
              <Logo />
              <Heading size="md" textAlign="center">
                {t("auth.reset_password")}
              </Heading>
            </Stack>
            <PasswordField />
            <PasswordField
              name="cpassword"
              label={t("auth.confirm_password")}
            />
            <LoadingButton
              type="submit"
              title={t("auth.reset")}
              loading={isPending}
            />
          </Stack>
        </form>
      </Box>
    </Center>
  );
}
