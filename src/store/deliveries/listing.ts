import { Dispatch } from "redux";
import { createSlice } from "@reduxjs/toolkit";
import {
    PaginatedResponse,
    DeliveryData,
    RequestState,
    RequestResult,
    RequestError,
    RequestSuccess
} from "../../models/delivery.ts";
import { getAllDeliveries } from "../../api/deliveries/http.ts";

const initialListing: RequestState = {
    result: RequestResult.initial
};

const listingSlice = createSlice({
    name: "delivery-listing",
    initialState: initialListing,
    reducers: {
        fulfill(state, action) {
            const result: RequestSuccess<PaginatedResponse<DeliveryData>> = {
                data: action.payload,
                result: RequestResult.resolved
            };
            state = result;
        },
        raiseError(state, action) {
            const result: RequestError<Error> = {
                result: RequestResult.error,
                data: action.payload
            };
            state = result;
        },
        waitResponse(state) {
            const result: RequestState = {
                result: RequestResult.pending
            };
            state = result;
        }
    }
});

export function fetchDeliveries() {
    const actions = listingSlice.actions;
    return async function deliveryFetcher(dispatch: Dispatch) {
        let results;
        try {
            dispatch(actions.waitResponse());
            results = await getAllDeliveries("");
            dispatch(actions.fulfill(results));
        } catch (error) {
            dispatch(actions.raiseError(error));
        }
    }
}
export default listingSlice.reducer;
