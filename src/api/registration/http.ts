import { PAGE_LIMIT } from "../../helper";
import { axios } from "../../helper/http";
import {
  getAuthToken,
  handleApiError,
  parseFormData,
} from "../../helper/utils";
import { GetRegistrationArgs } from "../../models/registrations/registration-args";
import { RegistrationData } from "../../models/registrations/registration-data";

async function getNewRegistrations({
  name,
  pageToken,
  skip,
}: GetRegistrationArgs) {
  const urlQuery = `?maxPageSize=${PAGE_LIMIT}`
    .concat(skip ? `&skip=${skip}` : "")
    .concat(name ? `&name=${name}` : "");

  const response = await axios.get(
    `/driver/registrations${urlQuery}`,
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
    registrations: data.results as RegistrationData[],
    refreshed: data.refreshed,
    nextPageToken: data.nextPageToken,
  };
}

async function getSettledRegistrations({
  name,
  pageToken,
  skip,
  from,
  status,
  to,
}: GetRegistrationArgs) {
  const urlQuery = `?maxPageSize=${PAGE_LIMIT}`
    .concat(skip ? `&skip=${skip}` : "")
    .concat(name ? `&name=${name}` : "")
    .concat(from ? `&from=${from}` : "")
    .concat(to ? `&to=${to}` : "")
    .concat(status ? `&status=${status}` : "");

  const response = await axios.get(
    `/driver/all-settled${urlQuery}`,
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
    registrations: data.results as RegistrationData[],
    refreshed: data.refreshed,
    nextPageToken: data.nextPageToken,
  };
}

async function handleRegistration(id: string) {
  try {
    await axios.post("/driver/handle-registration", { id });
  } catch (error: any) {
    throw handleApiError({
      error,
      defaultMessage: {
        en: "Failed to handle registration",
        fr: "Échec de gestion de l'inscription",
      },
    });
  }
}

async function rejectRegistration(id: string) {
  await handleRegistration(id);
  try {
    await axios.post("/driver/reject-validation", { id });
  } catch (error: any) {
    throw handleApiError({
      error,
      defaultMessage: {
        en: "Failed to reject registration",
        fr: "Échec de rejet de l'inscription",
      },
    });
  }
}

async function validateRegistration(id: string) {
  await handleRegistration(id);
  try {
    await axios.post("/driver/validate-registration", { id });
  } catch (error: any) {
    throw handleApiError({
      error,
      defaultMessage: {
        en: "Failed to validate registration",
        fr: "Échec de validation de l'inscription",
      },
    });
  }
}

async function createInternalDriver(data: RegistrationData) {
  try {
    const formData = parseFormData(data);
    await axios.post("/driver/register-intern", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error: any) {
    throw handleApiError({
      error,
      defaultMessage: {
        en: "Failed to create internal driver",
        fr: "Échec de création du conducteur interne",
      },
    });
  }
}

async function createRegistration(data: RegistrationData) {
  try {
    const formData = parseFormData(data);
    await axios.post("/driver/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error: any) {
    throw handleApiError({
      error,
      defaultMessage: {
        en: "Failed to create registration",
        fr: "Échec de création de l'inscription",
      },
    });
  }
}

async function updateRegistration(data: Partial<RegistrationData>) {
  try {
    const formData = parseFormData(data);
    await axios.post("/driver/update-registration", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error: any) {
    throw handleApiError({
      error,
      defaultMessage: {
        en: "Failed to update registration",
        fr: "Échec de mise à jour de l'inscription",
      },
    });
  }
}

export {
  getNewRegistrations,
  getSettledRegistrations,
  handleRegistration,
  rejectRegistration,
  validateRegistration,
  updateRegistration,
  createRegistration,
  createInternalDriver,
};
