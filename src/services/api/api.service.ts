import axios from 'axios';
import { getBearerAccessToken } from '../auth/auth';

const BEARER_TOKEN = getBearerAccessToken();
const BASE_URL = import.meta.env.VITE_API_URL;


// axios base options
const OPTIONS = {
    url: BASE_URL,
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        "Authorization": "Bearer " + BEARER_TOKEN
    }
};

//request axios 
const requestApi = (customOptions: any) => axios({ ...OPTIONS, url: customOptions }).then(response => {
    if (response.status === 401) {
        throw new Error('You must log in!');
    }
    return response.data

}).catch((error) => {
    console.log(error);
    throw error;
});

const getUrl = (path: string) => BASE_URL + path;

enum Methods {
    POST, PUT, PATCH, GET, DELETE
}

const doRequest = {
    post: (path: string, data: any) => requestApi({ url: getUrl(path), method: Methods.POST, data: data }),
    get: (path: string) => requestApi({ url: path }),
    put: (path: string, data: any) => requestApi({ url: getUrl(path), method: Methods.PUT, data: data }),
    patch: (path: string, data: any) => requestApi({ url: getUrl(path), method: Methods.PATCH, data: data }),
    delete: (path: string) => requestApi({ url: getUrl(path), method: Methods.DELETE })
}

export {
    doRequest
};