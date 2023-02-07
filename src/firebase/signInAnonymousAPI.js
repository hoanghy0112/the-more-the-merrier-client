import { getAuth, signInAnonymously } from 'firebase/auth';

import app from './configuration';

export const auth = getAuth(app);

export default async function signInAnonymouslyAPI() {
  return new Promise((resolve) => {
    signInAnonymously(auth).then((result) => {
      console.log({ result });

      const { user } = result;

      resolve(user);
    });
  });
}
