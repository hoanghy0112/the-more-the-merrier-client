import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllGroups, selectAllGroups } from '../groupSlice';

import styles from './GroupListPage.module.scss';

export default function GroupListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const groupList = useSelector(selectAllGroups);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getAllGroups());
      }
    });

    return () => unsubscribe();
  }, []);

  // useEffect(() => {}, [groupList]);

  return (
    <div className={styles.container}>
      {groupList.map(({ _id, name, description, admin, users }) => (
        <div
          key={_id}
          className={styles.groupContainer}
          onClick={() => {
            navigate(_id);
          }}
        >
          <div className={styles.introduction}>
            <p className={styles.name}>{name}</p>
            <div className={styles.numOfUser}>
              <p className={styles.num}>{users.length + 1}</p>
              <p className={styles.string}> users</p>
            </div>
          </div>
          <p className={styles.description}>{description}</p>
          <div className={styles.adminInfo}>
            <p className={styles.string}>Admin ID: </p>
            <p className={styles.num}>{admin}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
