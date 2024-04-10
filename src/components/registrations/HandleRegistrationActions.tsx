import React, { useState } from "react";
import { Flex, Button } from "@chakra-ui/react";
import {
  rejectRegistration,
  validateRegistration,
} from "../../api/registration/http";
import ConfirmationModal from "../UI/ConfirmationModal";
import { useNavigate } from "react-router-dom";

type ModalData = {
  title: string;
  description: string;
  handleFunction: (() => Promise<void>) | null;
  successMessage: string;
};

const HandleRegistrationActions: React.FC<{
  id: string;
}> = ({ id }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalData>({
    title: "",
    description: "",
    handleFunction: null,
    successMessage: "",
  });

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleValidate = () => {
    setModalData({
      title: "Validate Request",
      description: "Are you sure you want to validate the request?",
      handleFunction: () => validateRegistration(id),
      successMessage: "Request validated successfully",
    });
    setIsOpen(true);
  };

  const handleReject = () => {
    setModalData({
      title: "Reject Request",
      description: "Are you sure you want to reject the request?",
      handleFunction: () => rejectRegistration(id),
      successMessage: "Request rejected successfully",
    });
    setIsOpen(true);
  };

  const onSuccess = () => {
    navigate("..");
  };

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
        confirmColor="blue"
      />
      <Flex justifyContent="space-between" w={{ base: "full", md: "300px" }}>
        <Button colorScheme="green" onClick={handleValidate} px={8}>
          Validate
        </Button>
        <Button colorScheme="red" onClick={handleReject} px={8}>
          Reject
        </Button>
      </Flex>
    </>
  );
};

export default HandleRegistrationActions;
