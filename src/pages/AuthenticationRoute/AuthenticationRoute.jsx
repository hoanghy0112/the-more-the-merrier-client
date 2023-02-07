import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { findAllTagsOfUser } from '../../features/tagsManagement/TagsSlice';
import {
  getUserProfile,
  selectAuthenticationStatus,
  selectFetchUserProfileStatus,
  selectUserProfile,
  signInLoading,
  signInSuccessful,
} from '../../features/userManagement/ProfileSlice';
import LoadingPage from '../LoadingPage/LoadingPage';
import styles from './AuthenticationRoute.module.scss';
import { setSuggestionVisible } from '../../features/calendar/calendarSlice';
import AnonymousPage from '../AnonymousPage/AnonymousPage';

export default function AuthenticationRoute() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const status = useSelector(selectFetchUserProfileStatus);
  const authenticationStatus = useSelector(selectAuthenticationStatus);
  const userProfile = useSelector(selectUserProfile);

  function onAuthChange(user) {
    if (user) {
      dispatch(getUserProfile());
      dispatch(findAllTagsOfUser());
      dispatch(signInSuccessful());
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
    dispatch(setSuggestionVisible(false));
  }, [location.pathname]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, onAuthChange);
    dispatch(signInLoading());

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className={styles.container}>
      {status === 'loading' && <LoadingPage />}
      {authenticationStatus === 'loading' && <LoadingPage />}
      {userProfile?.familyName ? <Outlet /> : <AnonymousPage />}
    </div>
  );
}
