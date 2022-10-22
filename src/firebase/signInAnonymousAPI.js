import { getAuth, GithubAuthProvider, signInWithRedirect } from 'firebase/auth';

import app from './configuration';

const provider = new GithubAuthProvider();

export const auth = getAuth(app);

export default async function signInWithGithubAPI() {
  return new Promise((resolve) => {
    signInWithRedirect(auth, provider).then((result) => {
      console.log({ result });

      const { user } = result;

      resolve(user);
    });
  });
}
