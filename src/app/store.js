import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userManagementReducer from '../features/userManagement/ProfileSlice';
import tasksManagementReducer from '../features/tasksManagement/TasksSlice';
import tagsManagementReducer from '../features/tagsManagement/TagsSlice';
import groupsManagementSlice from '../features/groupsManagement/groupSlice';

export const store = configureStore({
  reducer: {
    userManagement: persistReducer(
      {
        key: 'userManagement',
        storage,
      },
      userManagementReducer,
    ),
    tasksManagement: persistReducer(
      {
        key: 'tasksManagement',
        storage,
      },
      tasksManagementReducer,
    ),
    // tasksManagement: tasksManagementReducer,
    tagsManagement: persistReducer(
      {
        key: 'tagsManagement',
        storage,
      },
      tagsManagementReducer,
    ),
    groupsManagement: persistReducer(
      {
        key: 'groupsManagement',
        storage,
      },
      groupsManagementSlice,
    ),
  },
});

export const persistor = persistStore(store);
