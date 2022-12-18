/* eslint-disable implicit-arrow-linebreak */
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userManagementReducer from '../features/userManagement/ProfileSlice';
import tasksManagementReducer from '../features/tasksManagement/TasksSlice';
import tagsManagementReducer from '../features/tagsManagement/TagsSlice';
import groupsManagementReducer from '../features/groupsManagement/groupSlice';
import calendarReducer from '../features/calendar/calendarSlice';

import { getGroupInformationByID } from '../features/groupsManagement/groupAPI';
import { getUserProfileByID } from '../features/userManagement/profileAPI';

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
      groupsManagementReducer,
    ),
    calendar: persistReducer(
      {
        key: 'calendar',
        storage,
      },
      calendarReducer,
    ),
    [getGroupInformationByID.reducerPath]: getGroupInformationByID.reducer,
    [getUserProfileByID.reducerPath]: getUserProfileByID.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(getGroupInformationByID.middleware)
      .concat(getUserProfileByID.middleware),
});

export const persistor = persistStore(store);
