import {DeliveryData, PaginatedResponse} from "../../models/delivery.ts";
import {axios, handleApiError} from "../../helper";

export async function getAllDeliveries(params: any): Promise<PaginatedResponse<DeliveryData> | undefined> {
    let result;
    try {
       result = await axios.get<PaginatedResponse<DeliveryData>>("/delivery/all" + params ?? "");
       return result.data;
    } catch (error) {
        throw handleApiError({
            error,
            defaultMessage: {
                en: "failed to retrieve the deliveries",
                fr: "Ooops, impossible de recupérer vos livraisons"
            }
        });
    }
}
