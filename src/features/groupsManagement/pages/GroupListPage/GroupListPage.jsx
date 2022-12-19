/* eslint-disable no-underscore-dangle */
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CenteredModal from '../../../../components/CenteredModal/CenteredModal';
import PrimaryButton from '../../../../components/PrimaryButton/PrimaryButton';
import UserList from '../../../../components/UserList/UserList';
import CreateNewGroup from '../../components/CreateNewGroup/CreateNewGroup';
import { getAllGroups, selectAllGroups } from '../../groupSlice';

import styles from './GroupListPage.module.scss';

export default function GroupListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpenCreateGroupModal, setIsOpenCreateGroupModal] = useState(false);

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

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.createGroup}
        onClick={() => setIsOpenCreateGroupModal(true)}
      >
        Create new group
      </button>
      <CenteredModal
        isOpen={isOpenCreateGroupModal}
        onClose={() => setIsOpenCreateGroupModal(false)}
      >
        <CreateNewGroup />
      </CenteredModal>
      <div className={styles.groupList}>
        {groupList.map(
          ({ _id, name, description, admin: adminID, users: userIDs }) => (
            <div
              key={_id}
              className={styles.groupContainer}
              onClick={() => {
                navigate(_id);
              }}
            >
              <div className={styles.introduction}>
                <p className={styles.name}>{name}</p>
                <UserList userIDs={[adminID, ...userIDs]} max={3} size={30} />
              </div>
              <p className={styles.description}>{description}</p>
              <div className={styles.detail}>
                <PrimaryButton title="View detail" />
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
