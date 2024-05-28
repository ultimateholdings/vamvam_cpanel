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

interface PaginationHeader {
    size: number;
    skip: number;
}

export interface DeliveryData {
    begin: Date;
    client: UserDesc;
    createdAt: Date
    departure: LocationData;
    destination: LocationData;
    end: Date;
    id: string;
    note: number;
    packageType: string;
    price: number;
    recientInfos: recipientData;
    status: string;
}

export interface PaginatedResponse<T> {
    nextPageToken: string;
    refreshed: boolean;
    results: Array<T>;
}
export interface ListingArgs {
    from?: Date;
    pageToken?: string;
    skip?:number;
    status?: string;
    to?: Date;
}


export enum RequestResult {
    error = "error in request",
        pending = "pending request",
        resolved = "request resolved",
        initial = "not requested"
}
export interface RequestState<T, E extends Error> {
    result: RequestResult;
    data?: T;
    error?: E;
}
export interface DeliveryFilter extends PaginationHeader {
    from: Date;
    status: string;
    to: Date;
}
