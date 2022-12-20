/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';

import CLOSE_ICON from '../../../../assets/icons/close.svg';
import BusyTimeChart from '../../../../components/BusyTimeChart/BusyTimeChart';
import UserList from '../../../../components/UserList/UserList';

import styles from './GroupInformation.module.scss';

export default function GroupInformation({ groupInfo, closeModal }) {
  const { name, description, users, admin } = groupInfo;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{name}</h1>
        <p>{description}</p>
      </div>
      <UserList userIDs={[admin, ...users] || []} size={30} max={5} />
      <BusyTimeChart groupInfo={groupInfo} />
      <img
        className={styles.close}
        src={CLOSE_ICON}
        alt="close"
        onClick={closeModal}
      />
    </div>
  );
}
