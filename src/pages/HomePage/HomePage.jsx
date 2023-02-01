import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import TabButton from '../../components/TabButton/TabButton';
import Profile from '../../features/userManagement/Profile';

import Mylogo from '../../assets/Logo.svg';
import { ICON_LOGOUT } from '../../assets/icons';
import NotificationIndividual from '../../components/NotificationIndividual/NotificationIndividual';
import styles from './HomePage.module.scss';

export default function HomePage() {
  const [tab, setTab] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setTab(location.pathname.split('/')[2]);
  }, [location]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // dispatch(getAllTasks());
      }
    });

    return () => unsubscribe();
  }, []);

  function handleSignout() {
    const auth = getAuth();
    auth.signOut();
  }

  return (
    <div className={styles.container}>
      <div className={styles.informationBox}>
        <div className={styles.topBox}>
          <Profile
            onClick={() => {
              navigate('/home/profile');
            }}
          />
          <div className={styles.buttonBox}>
            <TabButton
              isSelected={tab === 'schedule'}
              type="Home"
              onClick={() => {
                navigate('/home/schedule');
              }}
            />
            <TabButton
              isSelected={tab === 'group'}
              type="Group"
              onClick={() => {
                navigate('/home/group');
              }}
            />
            <TabButton
              isSelected={tab === 'setting'}
              type="Setting"
              onClick={() => {
                navigate('/home/setting');
              }}
            />
          </div>
        </div>
        <button
          type="button"
          className={styles.signOutButton}
          onClick={handleSignout}
        >
          <ICON_LOGOUT className={styles.signOutIcon} />
          <p>Log out</p>
        </button>
      </div>
      <div className={styles.mainBox}>
        <div className={styles.header}>
          <div>
            <NotificationIndividual />
          </div>
          <img src={Mylogo} alt="Logo" />
        </div>
        <div className={styles.outlet}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
