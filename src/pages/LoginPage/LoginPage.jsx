import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { onAuthStateChanged } from 'firebase/auth';

import styles from './LoginPage.module.scss';

import LoginButton from '../../components/LoginButton/LoginButton';
import {
  selectAuthenticationStatus,
  selectFetchUserProfileStatus,
  signInWithFacebook,
  signInWithGoogle,
} from '../../features/userManagement/ProfileSlice';

import { ICON_FORWARD } from '../../assets/icons';
import { auth } from '../../firebase/signInWithGoogleAPI';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const authenticationStatus = useSelector(selectAuthenticationStatus);
  // const status = useSelector(selectFetchUserProfileStatus);

  function handleSignInWithGoogle() {
    dispatch(signInWithGoogle());
  }

  function handleSignInWithFacebook() {
    dispatch(signInWithFacebook());
  }

  function onAuthChange(user) {
    if (user) {
      navigate('/home/schedule');
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, onAuthChange);

    return () => {
      unsubscribe();
    };
  }, []);

  // useEffect(() => {
  //   if (authenticationStatus === 'success') navigate('/home/schedule');
  // }, [authenticationStatus]);

  // useEffect(() => {
  //   if (status === 'success') navigate('/home/schedule');
  // }, [status]);

  return (
    <div className={styles.container}>
      <img src="" alt="" />
      <div className={styles.authenticationTab}>
        <div className={styles.header}>
          <p>Welcome to</p>
          <p className={styles.appName}>The more the merrier</p>
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
            <LoginButton providerName="Github" />
          </div>
          <div className={styles.noSignIn}>
            <p>Continue without sign in</p>
            <img src={ICON_FORWARD} alt="arrow forward" />
          </div>
        </div>
      </div>
    </div>
  );
}
