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

export function updateUserProfileAPI() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 500);
  });
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
