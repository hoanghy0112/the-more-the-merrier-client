/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { useUserProfileByIDQuery } from '../../features/userManagement/profileAPI';

import styles from './UserIcon.module.scss';

export default function UserIcon({
  userID,
  size = 35,
  withName = false,
  isChoosing = false,
  choosable = false,
  onClick = () => {},
}) {
  const { data, error, isLoading } = useUserProfileByIDQuery(userID);

  const fullName = useMemo(() => {
    if (data) return `${data?.familyName || ''} ${data?.givenName || ''}`;
    return '';
  }, [data]);

  return (
    <div
      className={[
        styles.container,
        isChoosing && choosable ? styles.choosing : null,
        withName ? styles.withName : null,
      ].join(' ')}
      userName={fullName}
      onClick={onClick}
    >
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
      {withName ? (
        <div className={styles.userInfo}>
          <p>{fullName}</p>
          {/* <p>{data?.email}</p> */}
        </div>
      ) : null}
    </div>
  );
}
