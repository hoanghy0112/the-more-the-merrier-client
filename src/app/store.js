import { configureStore } from '@reduxjs/toolkit';

import userManagementReducer from '../features/userManagement/ProfileSlice';

const store = configureStore({
  reducer: {
    userManagement: userManagementReducer,
  },
});

export default store;
