import { createSlice } from "@reduxjs/toolkit";

type UiState = {
  linearLoaderVisible: boolean;
  sidebarOpen: boolean;
};

const initialState: UiState = {
  linearLoaderVisible: false,
  sidebarOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    showLinearLoader(state, action) {
      state.linearLoaderVisible = action.payload;
    },

    showSidebar(state, action) {
      state.sidebarOpen = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
