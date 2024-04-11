import { Button } from "@chakra-ui/react";
import { useState } from "react";
import ConfirmationModal from "../UI/ConfirmationModal";
import { revokeAllUsersToken } from "../../api/admin/http";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const RevokeAllButton = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const logout = () => {
    navigate("/signing");
  };

  return (
    <>
      <Button
        px={4}
        mr={4}
        borderRadius={12}
        colorScheme="red"
        onClick={onOpen}
      >
        {t("users.disconnect_all")}
      </Button>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        title={t("users.disconnect_all_users")}
        description={t("users.disconnect_all_warning")}
        successMessage={t("users.disconnect_all_success")}
        onAsyncConfirm={revokeAllUsersToken}
        onSuccess={logout}
      />
    </>
  );
};

export default RevokeAllButton;
