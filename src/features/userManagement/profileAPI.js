import axios from 'axios';
import { getAuth } from 'firebase/auth';

import { GET_USER_PROFILE_API_LINK } from '../../constants/apiURL';

export async function getUserProfileAPI() {
  try {
    const auth = getAuth();
    const accessToken = await auth.currentUser.getIdToken();
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
