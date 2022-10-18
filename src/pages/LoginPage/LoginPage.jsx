import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './LoginPage.module.scss';

import LoginButton from '../../components/LoginButton/LoginButton';
import {
  selectAuthenticationStatus,
  selectFetchUserProfileStatus,
  signInWithGoogle,
} from '../../features/userManagement/ProfileSlice';

import { ICON_FORWARD } from '../../assets/icons';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authenticationStatus = useSelector(selectAuthenticationStatus);
  const status = useSelector(selectFetchUserProfileStatus);

  function handleSignInWithGoogle() {
    dispatch(signInWithGoogle());
  }

  useEffect(() => {
    if (authenticationStatus === 'success') navigate('/home/schedule');
  }, [authenticationStatus]);

  useEffect(() => {
    if (status === 'success') navigate('/home/schedule');
  }, [status]);

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
            <LoginButton providerName="Facebook" />
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
