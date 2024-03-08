import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { linearLoaderVisible: false, sidebarOpen: false },
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
