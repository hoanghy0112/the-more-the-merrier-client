import { getAuth, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import app from './configuration';

const provider = new GithubAuthProvider();

export const auth = getAuth(app);

export default async function signInWithGithubAPI() {
  return new Promise((resolve) => {
    signInWithPopup(auth, provider).then((result) => {
      const { user } = result;

      resolve(user);
    });
  });
}
