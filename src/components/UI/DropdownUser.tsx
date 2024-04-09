import { Link } from "react-router-dom";
import { getFilePath, getUserRole, toCapitalize } from "../../helper/utils";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import {
  HStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
} from "@chakra-ui/react";
import { IoPersonOutline } from "react-icons/io5";
import { SlArrowDown } from "react-icons/sl";
import { CiLogout } from "react-icons/ci";
import { PiPasswordLight } from "react-icons/pi";
import { useTranslation } from "react-i18next";

const DropdownUser = () => {
  const { userData } = useSelector((state: RootState) => state.profile);
  const { t } = useTranslation();

  const profileMenuItems = [
    {
      link: `${getUserRole()}/profile`,
      title: t("appbar.edit_profile"),
      icon: <IoPersonOutline />,
    },
    {
      link: `${getUserRole()}/change-password`,
      title: t("appbar.change_password"),
      icon: <PiPasswordLight />,
    },
    {
      link: "/logout",
      title: t("appbar.logout"),
      icon: <CiLogout />,
    },
  ];

  return (
    <HStack className="relative">
      <span className="hidden text-right lg:block">
        <span className="block text-sm font-medium text-black dark:text-white">
          {toCapitalize(userData?.firstName ?? "")}{" "}
          {toCapitalize(userData?.lastName ?? "")}
        </span>
        <span className="block text-xs">{toCapitalize(userData?.role ?? "")}</span>
      </span>
      <Menu>
        <MenuButton>
          <HStack _hover={{ cursor: "pointer" }}>
            <Avatar
              src={getFilePath((userData?.avatar ?? "") as string | undefined)}
              boxSize="10"
            />
            <SlArrowDown size={12} />
          </HStack>
        </MenuButton>
        <MenuList className="dark:bg-boxdark-2">
          {profileMenuItems.map((item) => (
            <MenuItem key={item.link} className="dark:bg-boxdark-2">
              <Link to={item.link}>
                <HStack>
                  {item.icon}
                  <Text
                    color="black"
                    size="12px"
                    className="text-black dark:text-white"
                  >
                    {item.title}
                  </Text>
                </HStack>
              </Link>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </HStack>
  );
};

export default DropdownUser;
