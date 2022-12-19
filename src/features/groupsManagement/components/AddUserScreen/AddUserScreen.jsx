/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-unknown-property */
import React, { useCallback, useState } from 'react';
import { getAuth } from 'firebase/auth';
import axios from 'axios';

import AddUserModal from '../AddUserModal/AddUserModal';

import CLOSE_ICON from '../../../../assets/icons/close.svg';

import styles from './AddUserScreen.module.scss';
import PrimaryButton from '../../../../components/PrimaryButton/PrimaryButton';
import { INVITE_USER_TO_GROUP } from '../../../../constants/apiURL';

export default function AddUserScreen({ closeModal, groupInfo }) {
  const [users, setUsers] = useState(new Map());

  const addUser = useCallback((user) => {
    const { _id } = user;
    setUsers((prev) => {
      prev.set(_id, user);
      return new Map(prev);
    });
  }, []);

  const removeUser = useCallback((user) => {
    const { _id } = user;
    setUsers((prev) => {
      prev.delete(_id);
      return new Map(prev);
    });
  }, []);

  const handleInvite = useCallback(async () => {
    closeModal();
    const auth = getAuth();
    const accessToken = await auth.currentUser.getIdToken();
    const response = await axios.put(
      `${INVITE_USER_TO_GROUP}/${groupInfo._id}/invite`,
      {
        users: Array.from(users.values()).map((user) => user._id),
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log(response);
  }, []);

  return (
    <div className={styles.groupContainer}>
      <div className={styles.introduction}>
        <p className={styles.name}>Invite users to group</p>
      </div>
      <AddUserModal addUser={addUser} />
      <div className={styles.userListContainer}>
        <p>These user will be invited to join your group:</p>
        <div className={styles.userList}>
          {Array.from(users.values()).map((user) => (
            <div
              className={styles.userIcon}
              userName={`${user.familyName} ${user.givenName}`}
            >
              <img
                className={styles.remove}
                src={CLOSE_ICON}
                alt="close"
                onClick={() => removeUser(user)}
              />
              <img src={user.photo} alt="user avatar" />
            </div>
          ))}
        </div>
      </div>
      <PrimaryButton
        title="Invite users"
        disabled={!users.size}
        onClick={handleInvite}
      />
    </div>
  );
}
