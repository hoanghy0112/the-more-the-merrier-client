/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-unknown-property */
import React, { useCallback, useState } from 'react';
import AddUserModal from '../AddUserModal/AddUserModal';

import CLOSE_ICON from '../../../../assets/icons/close.svg';

import styles from './AddUserScreen.module.scss';
import PrimaryButton from '../../../../components/PrimaryButton/PrimaryButton';

export default function AddUserScreen() {
  // const location = useLocation();
  // const groupInfo = useSelector(
  //   selectGroupByID(location.pathname.split('/').slice(-1)[0]),
  // );
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

  return (
    <div className={styles.groupContainer}>
      <div className={styles.introduction}>
        <p className={styles.name}>Invite users to group</p>
        {/* <div className={styles.numOfUser}>
          {`${(groupInfo?.users?.length || 0) + 1} users`}
        </div> */}
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
      <PrimaryButton title="Invite users" disabled={!users.size} />
    </div>
  );
}
