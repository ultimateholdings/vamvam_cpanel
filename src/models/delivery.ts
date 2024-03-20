import {DELIVERY_STATUS} from "../helper/enums.ts";
interface UserDesc {
    avatar?: string;
    id: string;
    firstName?: string;
    lastName?: string;
    phone: string;
};
interface LocationData {
    longitude: number;
    latitude: number;
    address?: string;
}
interface recipientData {
    name: string;
    otherPhones: Array<string | UserDesc>;
    phone: string;
}

export interface DeliveryData {
    client: UserDesc;
    departure: LocationData;
    destination: LocationData;
    id: string;
    packageType: string;
    price: number;
    recientInfos: recipientData;
    status: DELIVERY_STATUS;
}

export interface PaginatedResponse<T> {
    nextPageToken: string;
    refreshed: boolean;
    results: Array<T>;
}
