/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { useUserProfileByIDQuery } from '../../features/userManagement/profileAPI';

import styles from './UserIcon.module.scss';

export default function UserIcon({ userID, size = 40, withName = false }) {
  const { data, error, isLoading } = useUserProfileByIDQuery(userID);
  const fullName = useMemo(() => {
    if (data) return `${data?.familyName || ''} ${data?.givenName || ''}`;
    return '';
  }, [data]);

  return (
    <div className={styles.container} userName={fullName}>
      {isLoading && !error ? (
        <p>...</p>
      ) : (
        <img
          src={data?.photo}
          alt="user icon"
          style={{ '--size': `${size}px` }}
        />
      )}
      {error ? <p>!</p> : null}
      {withName ? <p>{fullName}</p> : null}
    </div>
  );
}
