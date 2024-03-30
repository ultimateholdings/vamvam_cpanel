import { axios } from "../../helper/http";
import LoginData from "../../models/auth/login-data";
import { handleApiError } from "../../helper/utils";
import UserData from "../../models/auth/user-data";
import { STORAGE_KEY } from "../../helper/enums";

export async function login(data: LoginData) {
  try {
    const response = await axios.post("/auth/admin/login", data);
    const token = response.data.token;
    localStorage.setItem(STORAGE_KEY.token, token);
  } catch (error: any) {
    throw handleApiError({
      error,
      defaultMessage: {
        en: "Invalid credentials",
        fr: "Identifiants invalides",
      },
    });
  }
}

export async function sendResetOtp({
  phoneNumber,
  email,
}: {
  phoneNumber?: string;
  email?: string;
}) {
  try {
    const response = await axios.post("/auth/send-reset-otp", {
      phoneNumber,
      email,
    });
    const ttl = response.data.ttl;
    return ttl;
    // console.log(phoneNumber ?? "" + email);
    // await mockApiCall();
    return 180;
  } catch (error: any) {
    throw handleApiError({
      error,
      defaultMessage: {
        en: "Invalid credentials",
        fr: "Identifiants invalides",
      },
    });
  }
}

export async function verifyResetCode({
  phoneNumber,
  email,
  code,
}: {
  phoneNumber?: string;
  email?: string;
  code: string;
}) {
  try {
    const response = await axios.post("/auth/verify-reset", {
      phoneNumber,
      email,
      code,
    });
    const resetToken = response.data.resetToken;
    return resetToken;

    // console.log(phoneNumber ?? "" + email + " " + code);
    // await mockApiCall();
    // return "resetToken";
  } catch (error: any) {
    throw handleApiError({
      error,
      defaultMessage: {
        en: "Invalid credentials",
        fr: "Identifiants invalides",
      },
    });
  }
}

export async function resetPassword({
  password,
  resetToken,
}: {
  password: string;
  resetToken: string;
}) {
  try {
    await axios.post("/auth/reset-password", {
      password,
      key: resetToken,
    });
    // console.log(password + " " + resetToken);
    // await mockApiCall();
  } catch (error: any) {
    throw handleApiError({
      error,
      defaultMessage: {
        en: "Invalid credentials",
        fr: "Identifiants invalides",
      },
    });
  }
}

export async function changePassword({
  oldPassword,
  newPassword,
}: {
  oldPassword?: string;
  newPassword?: string;
}) {
  try {
    await axios.post("/auth/change-password", {
      oldPassword,
      newPassword,
    });
  } catch (error: any) {
    throw handleApiError({
      error,
      defaultMessage: {
        en: "Invalid credentials",
        fr: "Identifiants invalides",
      },
    });
  }
}

export async function getUserInfo(): Promise<UserData | undefined> {
  try {
    const response = await axios.get<UserData>("/user/infos");
    const userData = response.data;
    if (!localStorage.getItem(STORAGE_KEY.role)) {
      localStorage.setItem("role", userData.role);
    }
    return userData;
  } catch (error) {
    throw handleApiError({
      error,
      defaultMessage: {
        en: "Failed to get your info",
        fr: "Echec de la recuperation des donnees",
      },
    });
  }
}

export async function logout() {
  try {
    await axios.post("/user/logout");
    localStorage.removeItem(STORAGE_KEY.token);
    localStorage.removeItem(STORAGE_KEY.role);
  } catch (error) {
    throw handleApiError({
      error,
      defaultMessage: {
        en: "Failed to logout",
        fr: "Echec du logout",
      },
    });
  }
}
