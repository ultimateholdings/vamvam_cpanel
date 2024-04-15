import React, { useState } from "react";
import { Flex, Button } from "@chakra-ui/react";
import {
  handleRegistration,
  rejectRegistration,
  validateRegistration,
} from "../../api/registration/http";
import ConfirmationModal from "../UI/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "../UI";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

type ModalData = {
  title: string;
  description: string;
  handleFunction: (() => Promise<void>) | null;
  successMessage: string;
  isValidating: boolean;
};

const HandleRegistrationActions: React.FC<{
  id: string;
  status: string;
  onHandled: () => void;
}> = ({ id, status, onHandled }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalData>({
    title: "",
    description: "",
    handleFunction: null,
    successMessage: "",
    isValidating: false,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: handleRegistration,
    onSuccess: () => {
      onHandled();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleValidate = () => {
    setModalData({
      title: t("registrations.validate_request"),
      description: t("registrations.validate_warning"),
      handleFunction: () => validateRegistration(id),
      successMessage: t("registrations.registration_validated"),
      isValidating: true,
    });
    setIsOpen(true);
  };

  const handleReject = () => {
    setModalData({
      title: t("registrations.reject_request"),
      description: t("registrations.reject_warning"),
      handleFunction: () => rejectRegistration(id),
      successMessage: t("registrations.registration_rejected"),
      isValidating: false,
    });
    setIsOpen(true);
  };

  const onSuccess = () => {
    navigate("..");
  };

  const registrationRejected = status === "rejected";
  const registrationPending = status === "pending";
  return (
    <>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={handleClose}
        title={modalData.title}
        description={modalData.description}
        onAsyncConfirm={modalData.handleFunction!}
        successMessage={modalData.successMessage}
        onSuccess={onSuccess}
        confirmColor={modalData.isValidating ? "green" : "red"}
      />
      <Flex
        justifyContent={
          registrationRejected || registrationPending
            ? "center"
            : "space-between"
        }
        w={{ base: "full", md: "300px" }}
      >
        {registrationPending ? (
          <LoadingButton
            type="button"
            onClick={() => mutate(id)}
            mt="4"
            w={{ base: "full", md: "60%" }}
            colorScheme="blue"
            loading={isPending}
            title={t("registrations.handle")}
          />
        ) : (
          <>
            <Button
              colorScheme="green"
              onClick={handleValidate}
              w={registrationRejected ? "full" : "40%"}
            >
              {t("registrations.validate")}
            </Button>
            {!registrationRejected && (
              <Button colorScheme="red" onClick={handleReject} w="40%">
                {t("registrations.reject")}
              </Button>
            )}
          </>
        )}
      </Flex>
    </>
  );
};

export default HandleRegistrationActions;
