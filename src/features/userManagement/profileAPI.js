import axios from 'axios';

import { GET_USER_PROFILE_API_LINK } from '../../constants/API_LINK';
import { auth } from '../../firebase/signInWithGoogleAPI';

export async function getUserProfileAPI() {
  try {
    const accessToken = await auth.currentUser.getIdToken();
    console.log({ accessToken });
    const data = await fetch(GET_USER_PROFILE_API_LINK, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return await data.json();
  } catch (error) {
    console.log({ error });
    return null;
  }
}

export function updateUserProfileAPI() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 500);
  });
}
