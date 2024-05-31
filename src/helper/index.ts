import { PAGE_LIMIT } from "./constant.ts";
import { DELIVERY_STATUS, USER_ROLE, STORAGE_KEY } from "./enums.ts";
import { axios, queryClient } from "./http.ts";
import { getAuthToken, getUserRole, handleApiError, debouncer, getFormatter } from "./utils.ts";

function fullName(first?: string, last?: string) {
    return ((first ?? "") + " " + (last ?? "")).trim();
}

export {
  axios,
  debouncer,
  fullName,
  getAuthToken,
  getFormatter,
  getUserRole,
  handleApiError,
  queryClient,
  DELIVERY_STATUS,
  USER_ROLE,
  STORAGE_KEY,
  PAGE_LIMIT,
};
