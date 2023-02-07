/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import signInWithFacebookAPI from '../../firebase/signInWithFacebookAPI';
import signInWithGithubAPI from '../../firebase/signInWithGithubAPI';
import signInWithGoogleAPI from '../../firebase/signInWithGoogleAPI';
import { getUserProfileAPI, updateUserProfileAPI } from './profileAPI';
import signInAnonymouslyAPI from '../../firebase/signInAnonymousAPI';

const initialState = {
  authenticationStatus: 'loading',
  status: 'loading',
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

export const signInAnonymously = createAsyncThunk(
  'userManagement/signInAnonymously',
  async () => {
    const user = await signInAnonymouslyAPI();
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

export const updateUserProfile = createAsyncThunk(
  'userManagement/updateUserProfile',
  async (req) => {
    const response = await updateUserProfileAPI(req);
    return response;
  },
);

export const userManagementSlice = createSlice({
  name: 'userManagement',
  initialState,
  reducers: {
    signInSuccessful: (state) => {
      state.authenticationStatus = 'success';
    },
    signInLoading: (state) => {
      state.authenticationStatus = 'loading';
    },
    logout: (state) => {
      state.authenticationStatus = '';
    },
  },
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
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state = Object.assign(state, action.payload);
      })
      .addCase(signInWithGoogle.pending, (state) => {
        state.authenticationStatus = 'loading';
      })
      .addCase(signInWithFacebook.pending, (state) => {
        state.authenticationStatus = 'loading';
      })
      .addCase(signInWithGithub.pending, (state) => {
        state.authenticationStatus = 'loading';
      })
      .addCase(signInAnonymously.pending, (state) => {
        state.authenticationStatus = 'loading';
      });
  },
});

export const { signInSuccessful, signInLoading, logout } =
  userManagementSlice.actions;

export const selectUserProfile = (state) => state.userManagement;
export const selectFetchUserProfileStatus = (state) =>
  state.userManagement.status;
export const selectAuthenticationStatus = (state) =>
  state.userManagement.authenticationStatus;

export default userManagementSlice.reducer;
