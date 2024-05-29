import { FormEvent, useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { LoadingButton } from "../../../components/UI";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createSponsor, deleteSponsor, editSponsor } from "../../../api/admin/http";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../components/UI/ConfirmationModal";

function CreateSponsorPage() {
  const { t } = useTranslation();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: location.state == null ? createSponsor : editSponsor,
    onSuccess: async () => {
      toast.success(location.state == null ? t("sponsor.create_sponsor_success") : t("sponsor.edit_sponsor_success"));
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
        code: data.code.value,
        name: data.name.value,
        phone: data.phone.value,
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

  function onDeleteSponsorSuccess() {
    handleClose();
    navigate('/admin/sponsors');
  }

  return (
    <Box p={2} maxWidth="500px" margin="auto">
      <Heading size="xl" mb={4} textAlign="left">
        {location.state == null ? t("sponsor.create_sponsor") : t("sponsor.edit_sponsor")}
      </Heading>
      <ConfirmationModal
          isOpen={isOpen}
          onClose={handleClose}
          onSuccess={onDeleteSponsorSuccess}
          title={t("sponsor.delete_sponsor")}
          description={t("sponsor.delete_sponsor_warning")}
          successMessage={t("sponsor.sponsor_delete_success")}
          onAsyncConfirm={()=>deleteSponsor(location.state?.id)}
        />
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Code</FormLabel>
            <Input type="text" name="code"  defaultValue={location.state?.sponsor?.code} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel> {t("sponsor.name")}</FormLabel>
            <Input type="text" name="name" defaultValue={location.state?.sponsor?.name} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel> {t("sponsor.phone")}</FormLabel>
            <Input type="tel" name="phone" defaultValue={location.state?.sponsor?.phone} />
          </FormControl>
          {location.state == null  && 
            <div className="fullWidth">
            <Flex minWidth='max-content' justifyContent="center" gap={6}>
                <LoadingButton
                  type="submit"
                  mt="4"
                  w={location.state == null ? "100%" : ""}
                  colorScheme="blue"
                  loading={isPending}
                  title={t("sponsor.save")}
                />
                {
                  location.state != null ? 
                  <LoadingButton
                  mt="4"
                  colorScheme="red"
                  loading={isPending}
                  title={t("sponsor.delete")}
                  onClick={handleOpen}
                />
                : <></>
                }
              
            </Flex>
          </div>
          }
          
        </VStack>
      </form>
    </Box>
  );
}

export default CreateSponsorPage;
