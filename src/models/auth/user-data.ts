export default interface UserData {
  id: string;
  status: string;
  role: string;
  gender: string;
  email?: string;
  phone?: string;
  age?: string;
  avatar?: File;
  firstName?: string;
  lastName?: string;
  lang?: string;
  sponsorCode?: string;
}
