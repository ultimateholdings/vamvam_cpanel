import React, { FormEvent, useRef, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Avatar,
  HStack,
  Select,
  VisuallyHidden,
  Heading,
} from "@chakra-ui/react";
import { getImagePath } from "../helper/utils";
import { LoadingButton } from "../components/UI";
import { useMutation } from "@tanstack/react-query";
import { deleteAvatar, updateProfile } from "../api/auth/http";
import toast from "react-hot-toast";
import ConfirmationModal from "../components/UI/ConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { profileActions } from "../store/profile/profile-slice";
import { useTranslation } from "react-i18next";

type ProfileDataType = {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string | undefined;
  gender: string;
  pickedFile: File | undefined;
};

const ProfilePage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { userData } = useSelector((state: RootState) => state.profile);
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileData, setProfileData] = useState<ProfileDataType>({
    firstName: userData?.firstName ?? "",
    lastName: userData?.lastName ?? "",
    email: userData?.email ?? "",
    avatar: userData?.avatar,
    gender: userData?.gender ?? "M",
    pickedFile: undefined,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      if (data.avatar) {
        dispatch(profileActions.updateAvatar(data.avatar));
        setProfileData((prev) => ({
          ...prev,
          avatar: data.avatar as string,
          pickedFile: undefined,
        }));
      }
      dispatch(profileActions.updateProfile({ userData: data }));
      toast.success(t("users.update_success"));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function handleSubmit(event: FormEvent) {
    const form = event.target as HTMLFormElement;
    event.preventDefault();
    if (form.checkValidity()) {
      const formData = new FormData();
      const data = form.elements as any;
      if (profileData.pickedFile) {
        formData.append("avatar", profileData.pickedFile);
      }
      formData.append("firstName", data.firstName.value);
      formData.append("lastName", data.lastName.value);
      formData.append("email", data.email.value);
      formData.append("gender", data.gender.value);

      mutate(formData);
    } else {
      form.reportValidity();
    }
  }

  function handleUpdateAvatar() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prev) => ({
          ...prev,
          pickedFile: file,
          avatar: reader.result! as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  }

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function onDeleteAvatarSuccess() {
    setProfileData((prev) => ({ ...prev, avatar: "" }));
    dispatch(profileActions.deleteAvatar());
    handleClose();
  }

  return (
    <Box p={4} maxWidth="500px" margin="auto">
      <Heading size="xl" textAlign="center" mb="8">
        {t("sidebar.update_profile")}
      </Heading>
      <form onSubmit={handleSubmit}>
        <ConfirmationModal
          isOpen={isOpen}
          onClose={handleClose}
          onSuccess={onDeleteAvatarSuccess}
          title={t("users.delete_photo")}
          description={t("users.delete_photo_warning")}
          successMessage={t("users.photo_delete_success")}
          onAsyncConfirm={deleteAvatar}
        />
        <VStack spacing={4}>
          <HStack>
            <Avatar
              src={
                profileData.pickedFile
                  ? profileData.avatar
                  : getImagePath(profileData.avatar as string)
              }
              boxSize="90"
            />
            <VStack>
              <>
                <Button
                  colorScheme="gray.600"
                  variant="ghost"
                  mr={3}
                  p={2}
                  size="sm"
                  onClick={handleUpdateAvatar}
                >
                  {t("users.edit_photo")}
                </Button>
                <VisuallyHidden>
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                  />
                </VisuallyHidden>
              </>
              {userData?.avatar && (
                <Button
                  colorScheme="red"
                  variant="ghost"
                  size="sm"
                  p={2}
                  onClick={handleOpen}
                >
                  {t("users.delete_photo")}
                </Button>
              )}
            </VStack>
          </HStack>

          <FormControl isRequired>
            <FormLabel>{t("users.first_name")}</FormLabel>
            <Input
              type="text"
              name="firstName"
              value={profileData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>{t("users.last_name")}</FormLabel>
            <Input
              type="text"
              name="lastName"
              value={profileData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>{t("users.gender")}</FormLabel>
            <Select
              name="gender"
              value={profileData.gender}
              onChange={handleChange}
            >
              <option value="M">{t("users.male")}</option>
              <option value="F">{t("users.female")}</option>
            </Select>
          </FormControl>

          <LoadingButton
            loading={isPending}
            type="submit"
            title={t("users.update")}
            colorScheme="blue"
            width="full"
          />
        </VStack>
      </form>
    </Box>
  );
};

export default ProfilePage;
