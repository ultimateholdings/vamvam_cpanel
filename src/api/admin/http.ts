import { axios } from "../../helper/http";
import { getAuthToken, handleApiError } from "../../helper/utils";
import { CreateAdminData, GetUserArgs } from "../../models/admin/admin";
import {
  DeliverySettingsData,
  DeliverySettingsValue,
  OTPSettingsData,
  OTPSettingsValue,
} from "../../models/admin/settings";
import UserData from "../../models/auth/user-data";

async function updateSettingsData(
  data: OTPSettingsValue | DeliverySettingsValue
) {
  try {
    await axios.post("/admin/update-settings", {
      type: "search_radius" in data ? "delivery" : "otp",
      value: data,
    });
  } catch (error: any) {
    throw handleApiError({
      error,
      defaultMessage: {
        en: "Failed to update settings",
        fr: "Échec de la mise à jour des paramètres",
      },
    });
  }
}

async function getSettingsData(): Promise<
  (OTPSettingsData | DeliverySettingsData)[]
> {
  try {
    const response = await axios.get("/system/settings/");
    const settings = response.data;
    return settings;
  } catch (error: any) {
    throw handleApiError({
      error,
      defaultMessage: {
        en: "Failed to get settings",
        fr: "Échec de la récupération des paramètres",
      },
    });
  }
}

async function blockUser(id: string) {
  try {
    const response = await axios.post("/admin/block-user", { id });
    console.log(response.data);
  } catch (error: any) {
    throw handleApiError({
      error,
      defaultMessage: {
        en: "Failed to block user",
        fr: "Échec de blocage de l'utilisateur",
      },
    });
  }
}

async function activateUser(id: string) {
  try {
    const response = await axios.post("/admin/activate-user", { id });
    console.log(response);
  } catch (error: any) {
    throw handleApiError({
      error,
      defaultMessage: {
        en: "Failed to activate user",
        fr: "Échec de l'activation de l'utilisateur",
      },
    });
  }
}

async function blockAllUsers() {
  try {
    const response = await axios.post("/admin/revoke-all");
    console.log(response);
  } catch (error: any) {
    throw handleApiError({
      error,
      defaultMessage: {
        en: "Failed to block all users",
        fr: "Échec de blocage de tous les utilisateurs",
      },
    });
  }
}

async function createAdmin(data: CreateAdminData) {
  try {
    const response = await axios.post("/admin/create-admin", data);
    console.log(response);
  } catch (error: any) {
    throw handleApiError({
      error,
      defaultMessage: {
        en: "Failed to create admin",
        fr: "Échec de création de l'administrateur",
      },
    });
  }
}

async function getAllUsers({ skip, pageToken, role }: GetUserArgs) {
  const urlQuery = pageToken
    ? ""
    : skip
    ? `?maxPageSize=${skip}&skip=1`
    : `?maxPageSize=15`;

  const response = await axios.get(
    `/user/all${urlQuery}${role ? `&role=${role}` : ""}`,
    pageToken
      ? {
          headers: {
            "page-token": pageToken,
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      : {}
  );
  const data = response.data;
  return {
    users: data.results as UserData[],
    refreshed: data.refreshed,
    nextPageToken: data.nextPageToken,
  };
}

export {
  updateSettingsData,
  getSettingsData,
  blockUser,
  activateUser,
  blockAllUsers,
  createAdmin,
  getAllUsers,
};
