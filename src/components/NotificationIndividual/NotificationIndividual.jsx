/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import NOTIFICATION_ICON from '../../assets/icons/notification.svg';
import JoinGroupPopup from '../JoinGroupPopup/JoinGroupPopup';
import NotificationList from '../NotificationList/NotificationList';

import styles from './NotificationIndividual.module.scss';

export default function NotificationIndividual() {
  const [isDisplay, setIsDisplay] = useState(false);

  const [groupID, setGroupID] = useState('');
  const [isOpenJoinGroupBox, setIsOpenJoinGroupBox] = useState(false);

  const [unRead, setUnRead] = useState(1);
  const [newNotification, setNewNotification] = useState(null);

  const newNotificationThumbnail = useRef();
  const newNotificationContent = useRef();

  useEffect(() => {
    if (newNotification) {
      newNotificationContent.current = newNotification.content;
      newNotificationThumbnail.current = newNotification.thumbnail;
    }

    const timeout = setTimeout(() => {
      setNewNotification(null);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [newNotification?._id]);

  return (
    <div className={styles.container}>
      <button
        type="button"
        onClick={() => setIsDisplay((prev) => !prev)}
        className={styles.notificationIcon}
      >
        <img src={NOTIFICATION_ICON} alt="notification" />
        {unRead ? <div className={styles.numberCircle}>{unRead}</div> : null}
      </button>

      <CSSTransition
        in={newNotification !== null}
        timeout={400}
        classNames={{
          enter: styles.newNotificationEnterActive,
          enterActive: styles.newNotificationEnterActive,
          enterDone: styles.newNotificationEnterDone,
          exit: styles.newNotificationExitActive,
          exitActive: styles.newNotificationExitActive,
          exitDone: styles.newNotificationExitDone,
        }}
      >
        <div className={styles.newNotification}>
          <img src={newNotificationThumbnail.current} alt="" />
          <p>{newNotificationContent.current}</p>
        </div>
      </CSSTransition>

      <NotificationList
        isDisplay={isDisplay}
        setIsDisplay={setIsDisplay}
        setGroupID={setGroupID}
        setIsOpenJoinGroupBox={setIsOpenJoinGroupBox}
        setUnRead={setUnRead}
        setNewNotification={setNewNotification}
      />

      {groupID ? (
        <JoinGroupPopup
          groupID={groupID}
          isOpen={isOpenJoinGroupBox}
          closePopup={() => setIsOpenJoinGroupBox(false)}
        />
      ) : null}
    </div>
  );
}
