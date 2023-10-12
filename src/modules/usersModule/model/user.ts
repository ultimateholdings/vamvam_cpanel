export default interface User {
    age?: string;
    avatar?: File;
    firstName?: string;
    lastName?: string;
    lang?: string;
    phoneNumber?: string;
    gender?: string;
    password?: string;
    email?: string;
    connected?: boolean;
    
    // deviceToken?: string;
    // carInfos?: File;
}