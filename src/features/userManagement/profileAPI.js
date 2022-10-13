import axios from 'axios';
import { GET_USER_PROFILE_API_LINK } from '../../constants/API_LINK';
import { auth } from '../../firebase/signInWithGoogleAPI';

export async function getUserProfileAPI() {
  const accessToken = await auth.currentUser.getIdToken();
  const data = await axios.get(GET_USER_PROFILE_API_LINK, {
    withCredentials: true,
    headers: {
      Authorization: accessToken,
    },
  });
  return data;
}

export function updateUserProfileAPI() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 500);
  });
}
