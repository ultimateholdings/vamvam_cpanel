export interface RegistrationData {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  carInfos: string | File;
  age: string[];
  sponsorCode?: string;
  gender?: string;
  lang?: string;
  registrationDate?: string;
  status?: "rejected" | "pending" | "validated";
}
