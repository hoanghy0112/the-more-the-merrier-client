import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { selectGroupByID } from '../../groupSlice';
import AddUserModal from '../AddUserModal/AddUserModal';
import styles from './AddUserScreen.module.scss';

export default function AddUserScreen() {
  const location = useLocation();
  const groupInfo = useSelector(
    selectGroupByID(location.pathname.split('/').slice(-1)[0]),
  );

  // console.log('Info: ', groupInfo);
  return (
    <div className={styles.groupContainer}>
      <div className={styles.introduction}>
        <p className={styles.name}>{groupInfo?.name || ''}</p>
        <div className={styles.numOfUser}>
          {`${(groupInfo?.users?.length || 0) + 1} users`}
        </div>
      </div>
      <AddUserModal />
    </div>
  );
}
