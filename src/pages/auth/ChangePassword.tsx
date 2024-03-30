import { Box, Center, Heading, Stack } from "@chakra-ui/react";
import { LoadingButton, Logo, PasswordField } from "../../components/UI";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { FormEvent } from "react";
import toast from "react-hot-toast";
import { changePassword } from "../../api/auth/http";

export default function ChangePasswordPage() {
  const { t } = useTranslation();

  const { mutate, isPending } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success(t("auth.password_update_success"), {
        position: "bottom-center",
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
      const password = data.password;
      const cpassword = data.confirmPassword;

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
      mutate({ oldPassword: data.currPassword, newPassword: password });
    } else {
      form.reportValidity();
    }
  }

  function parseData(data: any) {
    const password = data.password?.value;
    const confirmPassword = data.confirmPassword?.value;
    const currPassword = data.currPassword?.value;
    return { password, confirmPassword, currPassword };
  }

  return (
    <Center h="100vh">
      <Box w={{ md: "20rem", sm: "70%" }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing="9">
            <Stack justify="center" align="center" spacing="4">
              <Logo />
              <Heading size="md" textAlign="center">
                {t("auth.change_password")}
              </Heading>
            </Stack>
            <PasswordField
              name="currPassword"
              label={t("auth.current_password")}
            />
            <PasswordField label={t("auth.current_password")} />
            <PasswordField
              name="confirmPassword"
              label={t("auth.confirm_password")}
            />
            <LoadingButton
              type="submit"
              loading={isPending}
              title={t("auth.change")}
            />
          </Stack>
        </form>
      </Box>
    </Center>
  );
}
