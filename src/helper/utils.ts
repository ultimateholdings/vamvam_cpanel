import axios, { AxiosError } from "axios";
import { Lang } from "./types";
import { STORAGE_KEY } from "./enums";

interface ErrorParams {
  error: any;
  defaultMessage: Lang;
}

export function handleApiError({ error, defaultMessage }: ErrorParams) {
  let errorMessage = defaultMessage;

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<any, any>;
    if (axiosError && axiosError.response) {
      const { data, status } = axiosError.response;
      if (data?.message?.fr && data?.message?.en) {
        errorMessage = { ...data.message };
      } else {
        if (status === 401) {
          errorMessage = {
            en: "You need to login to access this feature",
            fr: "Vous devez vous connecter pour acceder a cette fonctionnalite",
          };
        } else if (status === 403) {
          errorMessage = {
            en: "You are unauthorized to access this feature",
            fr: "Vous n'avez pas les droits pour acceder a cette fonctionnalite",
          };
        } else if (status === 404) {
          errorMessage = {
            en: "Not found !",
            fr: "Pas trouve ",
          };
        } else if (status === 500) {
          errorMessage = {
            en: "The server is not responding. Please try again later.",
            fr: "Le serveur ne reponds pas veuillez reessayer plutard ",
          };
        }
      }

      if (status === 402) {
        localStorage.removeItem(STORAGE_KEY.token);
        localStorage.removeItem(STORAGE_KEY.role);
      }
    } else if (error.code === "ERR_NETWORK") {
      errorMessage = {
        en: "Please check your internet connection",
        fr: "Veuillez verifier votre connexion inernet",
      };
    }
  }

  const lang = localStorage.getItem(STORAGE_KEY.lang);
  const isFr = lang?.toLowerCase().includes("fr");
  const message = isFr ? errorMessage.fr : errorMessage.en;

  return Error(message);
}

export function getAuthToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function getUserRole() {
  const role = localStorage.getItem("role");
  return role;
}

export function toCapitalize(str: string) {
  return str.length === 0 ? "" : str.charAt(0).toUpperCase() + str.slice(1);
}
