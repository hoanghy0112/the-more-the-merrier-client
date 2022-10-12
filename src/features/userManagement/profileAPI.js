import axios from 'axios';
import { auth } from '../../firebase/signInWithGoogleAPI';

export async function getUserProfileAPI() {
  const accessToken = await auth.currentUser.getIdToken();
  const data = await axios.get('https://localhost/api/v1/user', {
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
