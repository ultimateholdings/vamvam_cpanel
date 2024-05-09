import { FormEvent, useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  VStack,
} from "@chakra-ui/react";
import { LoadingButton } from "../../../components/UI";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createBundle, deleteBundle, editBundle } from "../../../api/admin/http";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../components/UI/ConfirmationModal";

function CreateBundlePage() {
  const { t } = useTranslation();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: location.state == null ? createBundle : editBundle,
    onSuccess: async () => {
      toast.success(location.state == null ? t("bundle.create_bundle_success") : t("bundle.edit_bundle_success"));
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
      mutate({
        id: location.state?.id ?? null,
        bonus: data.bonus.value,
        point: data.point.value,
        unitPrice: data.unitPrice.value,
      });
    } else {
      form.reportValidity();
    }
  }

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function onDeleteBundleSuccess() {
    handleClose();
    navigate('/admin/bundles');
  }

  return (
    <Box p={2} maxWidth="500px" margin="auto">
      <Heading size="xl" mb={4} textAlign="left">
        {location.state == null ? t("bundle.create_bundle") : t("bundle.edit_bundle")}
      </Heading>
      <ConfirmationModal
          isOpen={isOpen}
          onClose={handleClose}
          onSuccess={onDeleteBundleSuccess}
          title={t("bundle.delete_bundle")}
          description={t("bundle.delete_bundle_warning")}
          successMessage={t("bundle.bundle_delete_success")}
          onAsyncConfirm={()=>deleteBundle(location.state?.id)}
        />
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel> {t("bundle.bonus")}</FormLabel>
            <NumberInput name="bonus" defaultValue={location.state?.bonus}>
              <NumberInputField defaultValue={location.state?.bonus}/>
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl isRequired>
            <FormLabel> {t("bundle.point")}</FormLabel>
            <NumberInput name="point" defaultValue={location.state?.point}>
              <NumberInputField defaultValue={location.state?.point}/>
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl isRequired>
            <FormLabel> {t("bundle.unitPrice")}</FormLabel>
            <NumberInput name="unitPrice" defaultValue={location.state?.unitPrice}>
              <NumberInputField defaultValue={location.state?.unitPrice}/>
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <Flex minWidth='max-content' gap={6}>
            <LoadingButton
              type="submit"
              mt="4"
              colorScheme="blue"
              loading={isPending}
              title={t("bundle.save")}
            />
            <LoadingButton
              mt="4"
              colorScheme="red"
              loading={isPending}
              title={t("bundle.delete")}
              onClick={handleOpen}
            />
          </Flex>
        </VStack>
      </form>
    </Box>
  );
}

export default CreateBundlePage;
