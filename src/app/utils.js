import { getAuth } from 'firebase/auth';

export async function getAccessToken() {
  const auth = getAuth();
  const accessToken = await auth.currentUser.getIdToken();
  return accessToken;
}

export async function getAuthorizeHeader() {
  return {
    headers: {
      Authorization: `Bearer ${await getAccessToken()}`,
    },
  };
}
