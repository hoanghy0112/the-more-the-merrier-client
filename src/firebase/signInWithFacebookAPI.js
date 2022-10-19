import {
  getAuth,
  FacebookAuthProvider,
  signInWithRedirect,
} from 'firebase/auth';
import app from './configuration';

const provider = new FacebookAuthProvider();

export const auth = getAuth(app);

export default async function signInWithFacebookAPI() {
  return new Promise((resolve) => {
    signInWithRedirect(auth, provider).then((result) => {
      console.log({ result });
      const { user } = result;

      resolve(user);
    });
  });
}
