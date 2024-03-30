import { axios } from "../../helper/http";
import { getAuthToken, handleApiError } from "../../helper/utils";
import { GetRegistrationArgs } from "../../models/registrations/registration-args";
import { RegistrationData } from "../../models/registrations/registration-data";

async function getAllRegistrations({
  name,
  pageToken,
  skip,
}: GetRegistrationArgs) {
  const urlQuery = pageToken
    ? ""
    : skip
    ? `?maxPageSize=${skip}&skip=1`
    : `?maxPageSize=15`;

  const response = await axios.get(
    `/driver/registrations${urlQuery}${name ? `&name=${name}` : ""}`,
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
    users: data.results as RegistrationData[],
    refreshed: data.refreshed,
    nextPageToken: data.nextPageToken,
  };
}

async function handleRegistration(id: string) {
  try {
    const response = await axios.post("/driver/handle-registration", { id });
    console.log(response);
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
  try {
    const response = await axios.post("/driver/reject-registration", { id });
    console.log(response);
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

export { getAllRegistrations, handleRegistration, rejectRegistration };
