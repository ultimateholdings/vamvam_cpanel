import { Box, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { IoLanguageOutline } from "react-icons/io5";
import i18n from "../../../i18n";
import { useTranslation } from "react-i18next";

const LangSwitcher = () => {
  const { t } = useTranslation();

  function handleChangeLang(lng: string) {
    i18n.changeLanguage(lng);
  }

  const languages = [
    {
      title: `🇬🇧  ${t("appbar.english")}`,
      value: "en",
    },
    {
      title: `🇫🇷  ${t("appbar.french")}`,
      value: "fr",
    },
  ];

  return (
    <Menu>
      <MenuButton>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="full"
          bg="gray.400"
          w="30px"
          h="30px"
          boxShadow="lg"
        >
          <IoLanguageOutline size={18} color="white" />
        </Box>
      </MenuButton>
      <MenuList className="dark:bg-boxdark-2">
        {languages.map((lang) => (
          <MenuItem
            key={lang.value}
            className="dark:bg-boxdark-2"
            onClick={() => handleChangeLang(lang.value)}
          >
            {lang.title}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default LangSwitcher;
