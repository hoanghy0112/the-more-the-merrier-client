/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserProfileAPI } from './profileAPI';

const initialState = {
  authenticationStatus: '',
  status: '',
  errorMessage: '',
  givenName: '',
  familyName: '',
  photo: '',
  email: '',
  friends: [],
  tags: [],
  tasks: [],
  groups: [],
};

export const getUserProfile = createAsyncThunk(
  'userManagement/getUserProfile',
  async () => {
    const response = await getUserProfileAPI();
    return response.data;
  },
);

export const userManagementSlice = createSlice({
  name: 'userManagement',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.status = 'idle';
        state = Object.assign(state, action.payload);
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.status = 'fail';
        state.errorMessage = action.payload;
      });
  },
});

export const selectUserProfile = (state) => state.userManagement;
export const selectFetchUserProfileStatus = (state) => state.userManagement.status;
export const selectAuthenticationStatus = (state) => state.userManagement.authenticationStatus;

export default userManagementSlice.reducer;
