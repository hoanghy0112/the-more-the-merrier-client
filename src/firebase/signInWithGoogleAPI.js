import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import app from './configuration';

const provider = new GoogleAuthProvider();

export const auth = getAuth(app);

export default async function signInWithGoogleAPI() {
  return new Promise((resolve) => {
    signInWithPopup(auth, provider).then((result) => {
      const { user } = result;

      resolve(user);
    });
  });
}
