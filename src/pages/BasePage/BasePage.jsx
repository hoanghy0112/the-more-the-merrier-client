import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/signInWithGoogleAPI';

import {
  getUserProfile,
  selectFetchUserProfileStatus,
} from '../../features/userManagement/ProfileSlice';
import styles from './BasePage.module.scss';
import LoadingPage from '../LoadingPage/LoadingPage';

export default function BasePage() {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(selectFetchUserProfileStatus);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispath(getUserProfile());
        if (status === 'success') navigate('/home/schedule');
      } else {
        navigate('/authentication');
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      {status === 'loading' && <LoadingPage />}
      <Outlet />
    </div>
  );
}
