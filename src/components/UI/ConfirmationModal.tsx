import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { FC } from "react";
import toast from "react-hot-toast";
import { LoadingButton } from ".";
import { useTranslation } from "react-i18next";

type Props = {
  isOpen: boolean;
  onClose: VoidFunction;
  onConfirm?: VoidFunction;
  onSuccess?: VoidFunction;
  onAsyncConfirm?: () => Promise<void>;
  title: string;
  description: string;
  successMessage?: string;
  confirmColor?: string;
};

const ConfirmationModal: FC<Props> = ({ confirmColor = "red", ...props }) => {
  const { t } = useTranslation();
  const { mutate, isPending } = useMutation({
    mutationFn: props.onAsyncConfirm,
    onSuccess: () => {
      props.onClose();
      props.onSuccess && props.onSuccess();
      toast.success(props.successMessage!);
    },
    onError: (error) => {
      props.onClose();
      toast.error(error.message);
    },
  });

  function handleConfirm() {
    if (props.onConfirm) {
      props.onConfirm();
    } else {
      mutate();
    }
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{props.description}</ModalBody>
        <ModalFooter>
          <Button
            colorScheme="gray.600"
            variant="outline"
            mr={3}
            onClick={props.onClose}
          >
            {t("cancel")}
          </Button>
          {props.onConfirm && (
            <Button colorScheme={confirmColor} onClick={handleConfirm}>
              {t("confirm")}
            </Button>
          )}
          {props.onAsyncConfirm && (
            <LoadingButton
              colorScheme={confirmColor}
              loading={isPending}
              onClick={handleConfirm}
              title={t("confirm")}
            />
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
