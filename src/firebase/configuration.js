// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCIbB1rIR5WhyB-_Wp9VwAzFEsR7glM6Pk',
  authDomain: 'themorethemerrierapp.firebaseapp.com',
  projectId: 'themorethemerrierapp',
  storageBucket: 'themorethemerrierapp.appspot.com',
  messagingSenderId: '563269076578',
  appId: '1:563269076578:web:a891b8192b78eccd41f33b',
  measurementId: 'G-FNTQBCR2D6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
// const analytics = getAnalytics(app);
