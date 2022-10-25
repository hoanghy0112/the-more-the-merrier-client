import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/signInWithGoogleAPI';

import { findAllTagsOfUser } from '../../features/tagsManagement/TagsSlice';
import {
  getUserProfile,
  selectFetchUserProfileStatus,
} from '../../features/userManagement/ProfileSlice';
import LoadingPage from '../LoadingPage/LoadingPage';
import styles from './BasePage.module.scss';

export default function BasePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(selectFetchUserProfileStatus);

  function onAuthChange(user) {
    if (user) {
      dispatch(getUserProfile());
      dispatch(findAllTagsOfUser());
    } else {
      navigate('/authentication');
    }
  }

  useEffect(() => {
    if (status === 'success') navigate('/home/schedule');
    // else navigate('/authentication');
  }, [status]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, onAuthChange);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className={styles.container}>
      {status === 'loading' && <LoadingPage />}
      <Outlet />
    </div>
  );
}
