import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import app from './configuration';

const provider = new GoogleAuthProvider();

export const auth = getAuth(app);

export default async function signInWithGoogleAPI() {
  return new Promise((resolve) => {
    signInWithPopup(auth, provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // const { accessToken } = credential;
      // The signed-in user info.
      const { user } = result;

      resolve(user);
    });
  });
}
// .catch((error) => {
//   // Handle Errors here.
//   const errorCode = error.code;
//   const errorMessage = error.message;
//   // The email of the user's account used.
//   const email = error.customData.email;
//   // The AuthCredential type that was used.
//   const credential = GoogleAuthProvider.credentialFromError(error);
//   // ...
// });
