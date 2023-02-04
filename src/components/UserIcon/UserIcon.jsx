/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { useUserProfileByIDQuery } from '../../features/userManagement/profileAPI';

import styles from './UserIcon.module.scss';

export default function UserIcon({
  userID,
  size = 35,
  marginLeft = 0,
  response,
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

  const backgroundColor = useMemo(() => {
    if (!isChoosing) return 'white';
    const state = response?.state || '';
    if (state === 'approve') return '#00cc2950';
    return '#00a5ca50';
  }, [response?.state, isChoosing]);

  return (
    <div
      className={[
        styles.container,
        isChoosing && choosable ? styles.choosing : null,
        withName ? styles.withName : null,
      ].join(' ')}
      userName={fullName}
      onClick={onClick}
      style={{
        marginLeft,
        backgroundColor,
      }}
    >
      <div className={styles.info}>
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
          </div>
        ) : null}
        <div className={styles.state}>{response?.state}</div>
      </div>
      {response?.state ? (
        <div className={styles.response}>
          <p>{response?.message}</p>
        </div>
      ) : null}
    </div>
  );
}
