import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

import {
  GET_USER_PROFILE_API_LINK,
  GET_USER_PROFILE_BY_ID,
} from '../../constants/apiURL';

export async function getUserProfileAPI() {
  try {
    const auth = getAuth();
    const accessToken = await auth.currentUser.getIdToken();
    console.log({ accessToken });
    const response = await axios.get(GET_USER_PROFILE_API_LINK, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function updateUserProfileAPI(newProfile) {
  try {
    const auth = getAuth();
    const accessToken = await auth.currentUser.getIdToken();
    const response = await axios.put(
      GET_USER_PROFILE_API_LINK,
      { ...newProfile },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return null;
  }
}

export const getUserProfileByID = createApi({
  reducerPath: 'userProfile',
  baseQuery: fetchBaseQuery({ baseUrl: GET_USER_PROFILE_BY_ID }),
  endpoints: (builder) => ({
    userProfileByID: builder.query({
      query: (userID) => `?id=${userID}`,
    }),
  }),
});

export const { useUserProfileByIDQuery } = getUserProfileByID;
