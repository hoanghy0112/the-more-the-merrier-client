import React from 'react';

import { useDispatch } from 'react-redux';

import styles from './LoginPage.module.scss';

import { signInWithGoogle } from '../../features/userManagement/ProfileSlice';

export default function LoginPage() {
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <img src="" alt="" />
      <div className={styles.authenticationTab}>
        <div className={styles.header}>
          <p>Welcome to</p>
          <p className={styles.appName}>The more the merrier</p>
        </div>
        <button type="button" onClick={() => dispatch(signInWithGoogle())}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
