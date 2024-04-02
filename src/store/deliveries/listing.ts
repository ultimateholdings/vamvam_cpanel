import { Dispatch } from "redux";
import { createSlice } from "@reduxjs/toolkit";
import {
    PaginatedResponse,
    DeliveryData,
    RequestState,
    RequestResult
} from "../../models/delivery.ts";
import { getAllDeliveries } from "../../api/deliveries/http.ts";

const initialListing: RequestState<PaginatedResponse<DeliveryData>, Error> = {
    result: RequestResult.initial
};

const listingSlice = createSlice({
    name: "delivery-listing",
    initialState: initialListing,
    reducers: {
        fulfill(state, action) {
            state.result = RequestResult.resolved;
            state.data = action.payload;
        },
        raiseError(state, action) {
            state.result = RequestResult.error;
            state.error = action.payload;
            state.data = undefined;
        },
        waitResponse(state) {
            state.result = RequestResult.pending;
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
