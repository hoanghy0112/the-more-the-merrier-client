import { FacebookAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import app from './configuration';

const provider = new FacebookAuthProvider();

export const auth = getAuth(app);

export default async function signInWithFacebookAPI() {
  return new Promise((resolve) => {
    signInWithPopup(auth, provider).then((result) => {
      const { user } = result;

      resolve(user);
    });
  });
}
