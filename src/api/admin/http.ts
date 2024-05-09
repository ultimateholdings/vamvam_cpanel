import { PAGE_LIMIT, STORAGE_KEY } from "../../helper";
import { axios } from "../../helper/http";
import { getAuthToken, handleApiError } from "../../helper/utils";
import { CreateAdminData, BundleData, GetBundlesArgs, GetUserArgs } from "../../models/admin/admin";
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

async function updateBonus({
  bonus,
  driverId,
  type,
}: {
  bonus: number;
  driverId: string;
  type: string;
}) {
  try {
    const response = await axios.post("/transaction/handle-bonus", {
      bonus,
      driverId,
      type,
    });
    console.log(response);
  } catch (error: any) {
    throw handleApiError({
      error,
      defaultMessage: {
        en: "Failed to update driver bonus",
        fr: "Échec de la mise à jour du bonus du conducteur",
      },
    });
  }
}

async function revokeAllUsersToken() {
  try {
    await axios.post("/admin/revoke-all");
    localStorage.removeItem(STORAGE_KEY.token);
    localStorage.removeItem(STORAGE_KEY.role);
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
    const response = await axios.post("/admin/new-admin", data);
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
  const urlQuery = `?maxPageSize=${PAGE_LIMIT}`
    .concat(skip ? `&skip=${skip}` : "")
    .concat(role ? `&role=${role}` : "");

  const response = await axios.get(
    `/user/all${urlQuery}`,
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

async function getAllBundles({ skip, pageToken }: GetBundlesArgs) {
  const urlQuery = `?maxPageSize=${PAGE_LIMIT}`
    .concat(skip ? `&skip=${skip}` : "");

  const response = await axios.get(
    `/bundle/${urlQuery}`,
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
    bundles: data.data as BundleData[],
    refreshed: data.refreshed,
    nextPageToken: data.nextPageToken,
  };
}

async function createBundle(data: BundleData) {
  try {
    const response = await axios.post("/bundle/new-bundle", data);
    console.log(response);
  } catch (error: any) {
    throw handleApiError({
      error,
      defaultMessage: {
        en: "Failed to create bundle",
        fr: "Échec de création du pack",
      },
    });
  }
}

async function editBundle(data: BundleData) {
  try {
    const response = await axios.post("/bundle/update", data);
    console.log(response);
  } catch (error: any) {
    throw handleApiError({
      error,
      defaultMessage: {
        en: "Failed to create bundle",
        fr: "Échec de création du pack",
      },
    });
  }
}

async function deleteBundle(id:string) {
  try {
    await axios.post("/bundle/delete",{id:id});
  } catch (error) {
    throw handleApiError({
      error,
      defaultMessage: {
        en: "Failed to delete bundle",
        fr: "Echec de la suppression du pack",
      },
    });
  }
}

export {
  updateSettingsData,
  getSettingsData,
  blockUser,
  activateUser,
  updateBonus,
  revokeAllUsersToken,
  createAdmin,
  getAllUsers,
  getAllBundles,
  createBundle,
  editBundle,
  deleteBundle
};
