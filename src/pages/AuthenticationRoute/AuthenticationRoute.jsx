import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { findAllTagsOfUser } from '../../features/tagsManagement/TagsSlice';
import {
  getUserProfile,
  selectFetchUserProfileStatus,
} from '../../features/userManagement/ProfileSlice';
import LoadingPage from '../LoadingPage/LoadingPage';
import styles from './AuthenticationRoute.module.scss';

export default function AuthenticationRoute() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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
    if (
      status === 'success' &&
      (location.pathname === '/authentication' || location.pathname === '/')
    ) {
      navigate('/home/schedule');
    }
  }, [status]);

  useEffect(() => {
    const auth = getAuth();
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
