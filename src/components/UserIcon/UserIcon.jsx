/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import React from 'react';
import { useUserProfileByIDQuery } from '../../features/userManagement/profileAPI';

import styles from './UserIcon.module.scss';

export default function UserIcon({ userID }) {
  const { data, error, isLoading } = useUserProfileByIDQuery(userID);

  return (
    <div
      className={styles.container}
      userName={`${data?.familyName || ''} ${data?.givenName || ''}`}
    >
      {isLoading && !error ? (
        <p>...</p>
      ) : (
        <img src={data?.photo} alt="user icon" />
      )}
      {error && <p>!</p>}
    </div>
  );
}
