import { Button, Center, HStack, Text } from "@chakra-ui/react";
import { useState, useEffect, FC } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ResendSection: FC<{ ttl: number }> = ({ ttl }) => {
  const [timeLeft, setTimeLeft] = useState(ttl);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    let interval: number = 0;

    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  function handleResend() {
    if (timeLeft > 0) {
      toast.error("wait for the timer to finish", {
        position: "bottom-center",
      });
      return;
    }
    navigate(`/forgot-password`, {
      replace: true,
    });
  }

  return (
    <>
      <Center>
        <Text fontSize="md">{formatTime(timeLeft)}</Text>
      </Center>
      <HStack justify="space-between">
        <Text fontSize="md">{t("auth.dont_receive_code")}</Text>
        <Button onClick={handleResend} type="button" variant="ghost">
          {t("auth.resend")}
        </Button>
      </HStack>
    </>
  );
};

export default ResendSection;
