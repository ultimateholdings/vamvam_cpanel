import { AuthState } from "../../store/authentication/authentication.slice";
import { LocalStorage } from "../localStorage/localStorage.service";

let tokenBearer: any;

function getBearerAccessToken  (){
    return LocalStorage.getItem('token');
}

function localStoreAuthState(authState:AuthState){
    LocalStorage.setItem('authState', authState);
}

function getStoreAuthState(){
    return LocalStorage.getItem('authState') as AuthState;
}

function setBearerAccessToken(token: string) {
    LocalStorage.setItem('token', token);
    tokenBearer = token;
}

export { getBearerAccessToken, setBearerAccessToken, localStoreAuthState, getStoreAuthState }