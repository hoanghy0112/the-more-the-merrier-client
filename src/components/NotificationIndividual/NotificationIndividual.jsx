import React, { useState } from 'react';

import NOTIFICATION_ICON from '../../assets/icons/notification.svg';
import JoinGroupPopup from '../JoinGroupPopup/JoinGroupPopup';
import NotificationList from '../NotificationList/NotificationList';

import styles from './NotificationIndividual.module.scss';

export default function NotificationIndividual() {
  const [isDisplay, setIsDisplay] = useState(false);

  const [groupID, setGroupID] = useState('');
  const [isOpenJoinGroupBox, setIsOpenJoinGroupBox] = useState(false);

  return (
    <div className={styles.container}>
      <button
        type="button"
        onClick={() => setIsDisplay((prev) => !prev)}
        className={styles.notificationIcon}
      >
        <img src={NOTIFICATION_ICON} alt="notification" />
      </button>

      <NotificationList
        isDisplay={isDisplay}
        setIsDisplay={setIsDisplay}
        setGroupID={setGroupID}
        setIsOpenJoinGroupBox={setIsOpenJoinGroupBox}
      />

      {groupID && (
        <JoinGroupPopup
          groupID={groupID}
          isOpen={isOpenJoinGroupBox}
          closePopup={() => setIsOpenJoinGroupBox(false)}
        />
      )}
    </div>
  );
}
