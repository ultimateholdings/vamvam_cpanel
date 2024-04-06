import { FC, useState } from "react";
import { TypeItem } from "../../models/admin/settings";
import {
  Button,
  HStack,
  IconButton,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { useTranslation } from "react-i18next";
import ConfirmationModal from "../UI/ConfirmationModal";

const MultiTypesInputForm: FC<{
  title: string;
  type: string;
  code: string;
  items: TypeItem[];
  onChangeItem: (updatedItem: TypeItem, index: number) => void;
  onAddItem: (newPackage: TypeItem) => void;
  onDeleteItem: (index: number) => void;
}> = ({ title, items, code, type, onChangeItem, onAddItem, onDeleteItem }) => {
  const { t } = useTranslation();
  const [newItem, setNewItem] = useState<TypeItem>({
    code: "",
    en: "",
    fr: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState<number>(0);

  function handleClose() {
    setIsOpen(false);
  }

  function handleOpen(index: number) {
    setIsOpen(true);
    setIndex(index);
  }
  function handleNewItemChange(key: keyof TypeItem, value: string) {
    setNewItem((prev) => ({ ...prev, [key]: value }));
  }

  function handleAddItem() {
    const codes = items.map((item) => +item.code.split("_")[1]);
    const greatestCode = Math.max(...codes);
    const newCode = `${code}_${greatestCode + 1}`;
    onAddItem({ ...newItem, code: newCode });
    setNewItem({ code: "", en: "", fr: "" });
  }

  function handleDeleteItem() {
    onDeleteItem(index);
    setIsOpen(false);
  }

  return (
    <>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={handleClose}
        title={t("settings.delete")}
        description="Are you sure you want to delete this item ?"
        onConfirm={handleDeleteItem}
      />
      <VStack spacing={4} justify="start" align="start">
        <Text fontSize="xl">{title}</Text>
        {items.map((item, index) => (
          <HStack key={index}>
            <Input
              value={item.en}
              placeholder={t("settings.title_en")}
              onChange={(e) =>
                onChangeItem({ ...item, en: e.target.value }, index)
              }
              required
            />
            <Input
              value={item.fr}
              placeholder={t("settings.title_fr")}
              onChange={(e) =>
                onChangeItem({ ...item, fr: e.target.value }, index)
              }
              required
            />
            <IconButton
              aria-label={t("settings.delete")}
              icon={<MdDelete />}
              onClick={() => handleOpen(index)}
            />
          </HStack>
        ))}
        <Stack
          spacing="3"
          justify="start"
          w={{ md: "50%", base: "100%" }}
          mt="4"
        >
          <Text fontSize="lg">
            {t("settings.new")} {type}
          </Text>

          <Input
            placeholder={t("settings.title_en")}
            value={newItem.en}
            onChange={(e) => handleNewItemChange("en", e.target.value)}
          />
          <Input
            placeholder={t("settings.title_fr")}
            value={newItem.fr}
            my="3"
            onChange={(e) => handleNewItemChange("fr", e.target.value)}
          />
          <Button size="md" colorScheme="blue" onClick={handleAddItem}>
            {t("settings.add")} {type}
          </Button>
        </Stack>
      </VStack>
    </>
  );
};

export default MultiTypesInputForm;
