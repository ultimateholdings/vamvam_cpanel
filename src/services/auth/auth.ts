import { AuthState } from "../../store/authentication/authentication.slice";
import { LocalStorage } from "../localStorage/localStorage.service";


const authStorage = {
    getBearerAccessToken() {
        console.log('getBearerAccessToken',LocalStorage.getItem('token'));
        
        return LocalStorage.getItem('token');
    },

    localStoreAuthState(authState: AuthState) {
        LocalStorage.setItem('authState', authState);
    },

    getStoreAuthState() {
        return LocalStorage.getItem('authState') as AuthState;
    }
    ,
    removeStoreAuthState() {
        return LocalStorage.removeItem('authState');
    },

    setBearerAccessToken(token: string) {
        LocalStorage.setItem('token', token);
        console.log('setBearerAccessToken',token);
    }
}



export {authStorage};