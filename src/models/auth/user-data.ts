interface LocationData {
    longitude: number;
    latitude: number;
    address?: string;
}

export default interface UserData {
  active?: boolean;
  id: string;
  internal?: boolean;
  status: string;
  role: string;
  gender: string;
  email?: string;
  phone?: string;
  points?: string;
  position?: LocationData;
  age?: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  lang?: string;
  sponsorCode?: string;
}
