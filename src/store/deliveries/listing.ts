import { Dispatch } from "redux";
import { createSlice } from "@reduxjs/toolkit";
import { getAllDeliveries } from "../../api/deliveries/http.ts";
import {PAGE_LIMIT} from "../../helper";

const initialState = {
    currentPage: 0,
    status: "initial",
    pageToken: "",
    deliveries: <any>[],
    error: undefined,
    filter: {},
    pageSize: 1
};

function mergeDeliveries (initial: Array<any>, newDatas: Array<any>) :Array<any>{
    const result = initial.reduce(function (acc: any, delivery: any) {
        acc[delivery.id] = delivery;
        return acc;
    }, Object.create(null));
    newDatas.forEach(function (delivery: any) {
        result[delivery.id] = delivery;
    });
    return Object.values(result);
}

const listingSlice = createSlice({
    name: "delivery-listing",
    initialState,
    reducers: {
        appendResults(state, action) {
            const {results, nextPageToken } = action.payload;
            state.status = "resolved";
            state.pageToken = nextPageToken;
            if (results.length < 1) {
                state.status = "complete";
            }
            state.currentPage += 1;
            state.deliveries = mergeDeliveries(state.deliveries, results);
        },
        applyFilter(state, action) {
            if (state.filter !== action.payload) {
                state.currentPage = 0;
                state.deliveries = [];
            }
            state.filter = action.payload;
        },
        changePage(state, action) {
            state.currentPage = action.payload;
        },
        emptyState(state) {
            state = Object.assign({}, initialState);
        },
        raiseError(state, action) {
            state.status = "error";
            state.error = action.payload;
        },
        waitLoading(state) {
            state.status = "loading";
        }
    }
});

export const listingActions = listingSlice.actions;
const listingKeys = ["from", "to", "status"];
function parseParams(params: any, keys: Array<string>) : string {
    return keys.map(function (key) {
        if (params[key]) {
            return key + "=" + params[key];
        }
    }).filter((val) => val !== undefined).join("&");
}

export function fetchDeliveries(arg: any) {
    const actions = listingSlice.actions;
    return async function deliveryFetcher(dispatch: Dispatch) {
        let results;
        let filter = parseParams(arg ?? {}, listingKeys);
        try {
            dispatch(actions.waitLoading());
            if (filter.trim().length > 0) {
                dispatch(actions.applyFilter(filter));
            }
            results = await getAllDeliveries(Object.assign({filter}, arg ?? {}));
            dispatch(actions.appendResults(results));
        } catch (error) {
            dispatch(actions.raiseError(error));
        }
    }
}
export default listingSlice.reducer;
