import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import styles from './LoginPage.module.scss';

import LoginButton from '../../components/LoginButton/LoginButton';
import {
  logout,
  selectAuthenticationStatus,
  signInLoading,
  signInSuccessful,
  signInWithFacebook,
  signInWithGithub,
  signInWithGoogle,
} from '../../features/userManagement/ProfileSlice';

import { ICON_FORWARD } from '../../assets/icons';

import IMAGE_TOP_LEFT from '../../assets/images/top-left.png';
import IMAGE_TOP_RIGHT from '../../assets/images/top-right.png';
import IMAGE_BOTTOM from '../../assets/images/bottom.png';
import FULL_LOGO from '../../assets/images/full-logo.svg';
import CIRCLE from '../../assets/images/circle.svg';
import LoadingPage from '../LoadingPage/LoadingPage';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authenticationStatus = useSelector(selectAuthenticationStatus);

  function handleSignInWithGoogle() {
    dispatch(signInLoading());
    dispatch(signInWithGoogle());
  }

  function handleSignInWithFacebook() {
    dispatch(signInWithFacebook());
  }

  function handleSignInWithGithub() {
    dispatch(signInWithGithub());
  }

  function onAuthChange(user) {
    if (user) {
      dispatch(signInSuccessful());
      navigate('/home/schedule');
    }
  }

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, onAuthChange);
    dispatch(logout());

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={FULL_LOGO} alt="" />
      </div>
      <div className={styles.circle}>
        <img src={CIRCLE} alt="" />
      </div>
      <img className={styles.imageBottom} src={IMAGE_BOTTOM} alt="" />
      <img className={styles.imageTopRight} src={IMAGE_TOP_RIGHT} alt="" />
      <div className={styles.introduction}>
        <img className={styles.imageTopLeft} src={IMAGE_TOP_LEFT} alt="" />
        <div className={styles.text}>
          <h1>The more the merrier</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus accusamus porro, quos ut natus reprehenderit dolorem?
            Eveniet temporibus nemo ut delectus, itaque, similique nobis iusto
            voluptatibus, optio incidunt aspernatur error.
          </p>
        </div>
      </div>
      <div className={styles.authenticationTab}>
        <div className={styles.header}>
          <p>Get Started Today</p>
          <p className={styles.appName}>Choose one of these sign-in method</p>
        </div>
        <div className={styles.signInContainer}>
          <div className={styles.signInButtons}>
            <LoginButton
              providerName="Google"
              onClick={() => handleSignInWithGoogle()}
            />
            <LoginButton
              providerName="Facebook"
              onClick={() => handleSignInWithFacebook()}
            />
            <LoginButton
              onClick={() => handleSignInWithGithub()}
              providerName="Github"
            />
          </div>
          <div className={styles.noSignIn}>
            <p>Continue without sign in</p>
            <img src={ICON_FORWARD} alt="arrow forward" />
          </div>
        </div>
      </div>
      {authenticationStatus === 'loading' && <LoadingPage />}
    </div>
  );
}

// <div className={styles.container}>
//   <img src="" alt="" />
//   <div className={styles.authenticationTab}>
//     <div className={styles.header}>
//       <p>Welcome to</p>
//       <p className={styles.appName}>The more the merrier</p>
//     </div>
//     <div className={styles.signInContainer}>
//       <div className={styles.signInButtons}>
//         <LoginButton
//           providerName="Google"
//           onClick={() => handleSignInWithGoogle()}
//         />
//         <LoginButton
//           providerName="Facebook"
//           onClick={() => handleSignInWithFacebook()}
//         />
//         <LoginButton
//           onClick={() => handleSignInWithGithub()}
//           providerName="Github"
//         />
//       </div>
//       <div className={styles.noSignIn}>
//         <p>Continue without sign in</p>
//         <img src={ICON_FORWARD} alt="arrow forward" />
//       </div>
//     </div>
//   </div>
// </div>
