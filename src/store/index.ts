import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './profile/profile-slice';
import uiReducer from './ui/ui-slice';

const store = configureStore({
  reducer: {
    profile: profileReducer,
    ui: uiReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
