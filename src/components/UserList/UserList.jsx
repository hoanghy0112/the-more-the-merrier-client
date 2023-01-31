/* eslint-disable react/prop-types */
import React from 'react';
import UserIcon from '../UserIcon/UserIcon';

import styles from './UserList.module.scss';

export default function UserList({ userIDs = [], size, max = 3 }) {
  return (
    <div className={styles.container}>
      {userIDs?.slice(0, max)?.map?.((userID) => (
        <UserIcon marginLeft={-25} userID={userID} size={size} />
      ))}
      {(userIDs?.length || 0) > max ? (
        <p>
          <span>+</span>
          <span className={styles.bold}>{(userIDs?.length || 0) - max}</span>
          <span> users</span>
        </p>
      ) : null}
    </div>
  );
}
