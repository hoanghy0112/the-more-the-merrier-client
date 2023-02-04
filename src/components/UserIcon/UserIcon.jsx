/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { useUserProfileByIDQuery } from '../../features/userManagement/profileAPI';

import styles from './UserIcon.module.scss';
import {
  ICON_CLOSE,
  ICON_COMPLETED,
  ICON_TICK,
  ICON_WARNING,
} from '../../assets/icons';

export default function UserIcon({
  userID,
  size = 35,
  marginLeft = 0,
  response,
  withName = false,
  withResponse = false,
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
    if (!isChoosing) return 'transparent';
    const state = response?.state || '';
    if (state === 'approve') return '#00cc2950';
    return '#00a5ca50';
  }, [response?.state, isChoosing]);

  const stateColor = (state) => {
    if (state === 'hover') {
      return '#f9b122';
    }
    if (state === 'approve') {
      return '#00a6ca';
    }
    if (state === 'decline') {
      return 'rgb(230, 0, 0)';
    }
    return 'gray';
  };

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
        {withResponse ? (
          <div className={styles.state}>
            <div style={{ backgroundColor: stateColor(response?.state) }}>
              {response?.state === 'hover' && (
                <ICON_WARNING size={20} style={{ color: 'white' }} />
              )}
              {response?.state === 'approve' && (
                <ICON_TICK size={20} style={{ color: 'white' }} />
              )}
              {response?.state === 'decline' && (
                <ICON_CLOSE size={20} style={{ color: 'white' }} />
              )}
              <p>{response?.state || 'No response'}</p>
            </div>
          </div>
        ) : null}
      </div>
      {response?.state && withResponse ? (
        <div className={styles.response}>
          <p>{response?.message}</p>
        </div>
      ) : null}
    </div>
  );
}
