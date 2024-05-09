import { createSlice } from "@reduxjs/toolkit";
import BundleData from "../../models/bundles/bundle-data";

interface BundleState {
  bundles: BundleData[];
  pageToken?: string;
  refreshed: boolean;
  prevRole?: string;
  currentPage: number;
  loading: boolean;
  initialReqSent: boolean;
}

const initialState: BundleState = {
  bundles: [],
  initialReqSent: false,
  refreshed: false,
  currentPage: 0,
  loading: false,
};

const bundleSlice = createSlice({
  name: "bundles",
  initialState,
  reducers: {
    changeData(state, action) {
      const { bundles, pageToken, refreshed } = action.payload;
      state.pageToken = pageToken;
      state.refreshed = refreshed;

      if (refreshed) {
        const newBundles = (bundles as BundleData[]).filter(
          (newBundle) =>
            state.bundles.findIndex((bundle) => bundle.id === newBundle.id) === -1
        );
        state.bundles = [...state.bundles, ...newBundles];
      } else {
        state.bundles = [...state.bundles, ...bundles];
      }
      state.currentPage = state.currentPage + 1;
    },
    changeBundles(state, action) {
      state.bundles = action.payload;
    },
    changeCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    changeInitialRequest(state, action) {
      state.initialReqSent = action.payload;
    },
    changeLoading(state, action) {
      state.loading = action.payload;
    },
    emptyState(state) {
      state.bundles = [];
      state.pageToken = undefined;
      state.refreshed = false;
      state.prevRole = undefined;
      state.currentPage = 0;
      state.loading = false;
      state.initialReqSent = false;
    },
  },
});

export const bundleActions = bundleSlice.actions;

export default bundleSlice.reducer;
