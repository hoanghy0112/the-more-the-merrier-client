/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import signInWithFacebookAPI from '../../firebase/signInWithFacebookAPI';
import signInWithGithubAPI from '../../firebase/signInWithGithubAPI';
import signInWithGoogleAPI from '../../firebase/signInWithGoogleAPI';
import { getUserProfileAPI } from './profileAPI';

const initialState = {
  authenticationStatus: '',
  status: '',
  errorMessage: '',
  accessToken: '',
  givenName: '',
  familyName: '',
  displayName: '',
  photo: '',
  email: '',
  friends: [],
  tags: [],
  tasks: [],
  groups: [],
};

export const signInWithGoogle = createAsyncThunk(
  'userManagement/signInWithGoogle',
  async () => {
    const user = await signInWithGoogleAPI();
    const { accessToken } = user;

    return { accessToken };
  },
);

export const signInWithFacebook = createAsyncThunk(
  'userManagement/signInWithFacebook',
  async () => {
    const user = await signInWithFacebookAPI();
    const { accessToken } = user;

    return { accessToken };
  },
);

export const signInWithGithub = createAsyncThunk(
  'userManagement/signInWithGithub',
  async () => {
    const user = await signInWithGithubAPI();
    const { accessToken } = user;

    return { accessToken };
  },
);

export const getUserProfile = createAsyncThunk(
  'userManagement/getUserProfile',
  async () => {
    const response = await getUserProfileAPI();
    return response;
  },
);

export const userManagementSlice = createSlice({
  name: 'userManagement',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.status = 'success';
        state = Object.assign(state, action.payload);
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.status = 'fail';
        state.errorMessage = action.payload;
      })
      .addCase(signInWithGoogle.pending, (state) => {
        state.authenticationStatus = 'loading';
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.authenticationStatus = 'success';
        state = { ...Object.assign(state, action.payload) };
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.authenticationStatus = 'fail';
        state.errorMessage = action.payload;
      });
  },
});

export const selectUserProfile = (state) => state.userManagement;
export const selectFetchUserProfileStatus = (state) =>
  state.userManagement.status;
export const selectAuthenticationStatus = (state) =>
  state.userManagement.authenticationStatus;

export default userManagementSlice.reducer;
