import axios from 'axios';

import { GET_USER_PROFILE_API_LINK } from '../../constants/apiURL';
import { auth } from '../../firebase/signInWithGoogleAPI';

export async function getUserProfileAPI() {
  try {
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
