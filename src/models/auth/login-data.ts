import { Payload } from '../common/payload';

interface args {
  phoneNumber?: string;
  email?: string;
  password: string;
}

class LoginData extends Payload {
  email?: string;
  phoneNumber?: string;
  password: string;

  constructor({ phoneNumber, password, email }: args) {
    super();
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.email = email;
  }
}

export default LoginData;
