import { USER_ROLE } from "../../helper/enums";

interface CreateAdminData {
  email: string;
  password: string;
  phoneNumber: string;
  type: USER_ROLE;
}

interface GetUserArgs {
  role?: string;
  pageToken?: string;
  skip?: number;
}

interface GetBundlesArgs {
  pageToken?: string;
  skip?: number;
}

interface BundleData {
  id: string;
  bonus: string;
  point: string;
  unitPrice: string;
}

export type { CreateAdminData, GetUserArgs, GetBundlesArgs, BundleData };
