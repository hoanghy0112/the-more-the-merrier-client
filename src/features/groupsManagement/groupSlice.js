/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  createNewGroupAPI,
  getAllGroupsOfUserAPI,
  getTaskOfGroupAPI,
} from './groupAPI';

const initialState = {
  groups: [],
  currentGroupID: '',
  groupBusyTime: [],
  status: 'idle',
  fetchGroupBusyTimeStatus: 'idle',
  error: null,
};

export const getAllGroups = createAsyncThunk(
  'groupsManagement/getAllGroups',
  async () => {
    const response = await getAllGroupsOfUserAPI();
    return response;
  },
);

export const createNewGroup = createAsyncThunk(
  'groupsManagement/createNewGroup',
  async (req) => {
    const { name, description, users, admin } = req;
    const response = await createNewGroupAPI({
      name,
      description,
      users,
      admin,
    });

    return response;
  },
);

export const getTaskOfGroup = createAsyncThunk(
  'groupsManagement/getTaskOfGroup',
  async (req) => {
    const { groupID, from, to } = req;
    const response = await getTaskOfGroupAPI(groupID, from, to);

    return response;
  },
);

export const groupsManagementSlice = createSlice({
  name: 'groupsManagement',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getAllGroups.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllGroups.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.groups = action.payload;
      })
      .addCase(getAllGroups.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createNewGroup.pending, (state, action) => {
        state.status = 'loading';

        const data = action.meta.arg;

        state.groups = [...state.groups, data];
      })
      .addCase(createNewGroup.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(createNewGroup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getTaskOfGroup.pending, (state, action) => {
        state.fetchGroupBusyTimeStatus = 'loading';

        const { groupID } = action.meta.arg;

        state.currentGroupID = groupID;
      })
      .addCase(getTaskOfGroup.fulfilled, (state, action) => {
        state.fetchGroupBusyTimeStatus = 'succeeded';
        state.groupBusyTime = action.payload;
      })
      .addCase(getTaskOfGroup.rejected, (state, action) => {
        state.fetchGroupBusyTimeStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAllGroups = (state) => state.groupsManagement.groups;

export const selectGroupByID = (groupID) => (state) =>
  state.groupsManagement.groups.find((group) => group._id === groupID);

export const selectCurrentGroupInfo = (state) =>
  state.groupsManagement.groups.find(
    (group) => group._id === state.groupsManagement.currentGroupID,
  );

export const selectGroupBusyTime = (state) =>
  state.groupsManagement.groupBusyTime;

export default groupsManagementSlice.reducer;
