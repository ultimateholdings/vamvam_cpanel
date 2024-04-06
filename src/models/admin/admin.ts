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

export type { CreateAdminData, GetUserArgs };
