import User from "./user";

export default class Admin implements User {
    type?: string;
    phoneNumber?: string;
    password?: string;
    age?: string;
    avatar?: File;
    carInfos?: File;
    deviceToken?: string;
    firstName?: string;
    lastName?: string;
    lang?: string;
    gender?: string;
    email?: string;
    connected?: boolean;
}
