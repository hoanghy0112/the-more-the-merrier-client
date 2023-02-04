/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import NOTIFICATION_ICON from '../../assets/icons/notification.svg';
import JoinGroupPopup from '../JoinGroupPopup/JoinGroupPopup';
import NotificationList from '../NotificationList/NotificationList';
import PrimaryButton from '../PrimaryButton/PrimaryButton';

import TaskPopUp from '../TaskPopUp/TaskPopUp';
import styles from './NotificationIndividual.module.scss';

export default function NotificationIndividual() {
  const navigate = useNavigate();

  const [isDisplay, setIsDisplay] = useState(false);

  const [taskID, setTaskID] = useState();
  const [isOpenTaskPopup, setIsOpenTaskPopup] = useState(false);

  const [groupID, setGroupID] = useState('');
  const [isOpenJoinGroupBox, setIsOpenJoinGroupBox] = useState(false);

  const [unRead, setUnRead] = useState(1);
  const [newNotification, setNewNotification] = useState(null);
  const [isHoverNotification, setIsHoverNotification] = useState(false);

  const newNotificationThumbnail = useRef();
  const newNotificationContent = useRef();

  useEffect(() => {
    if (newNotification) {
      newNotificationContent.current = newNotification.content;
      newNotificationThumbnail.current = newNotification.thumbnail;
    }

    if (!isHoverNotification) {
      const timeout = setTimeout(() => {
        setNewNotification(null);
      }, 4000);

      return () => clearTimeout(timeout);
    }

    return () => {};
  }, [newNotification?._id, isHoverNotification]);

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
        <div
          className={styles.newNotification}
          onMouseEnter={() => setIsHoverNotification(true)}
          onMouseLeave={() => setIsHoverNotification(false)}
        >
          <img src={newNotificationThumbnail.current} alt="" />
          <p>{newNotificationContent.current}</p>
          {newNotification?.type === 'join-group' ? (
            <PrimaryButton
              width={150}
              title="View group"
              onClick={() =>
                navigate(`/home/group/${newNotification?.groupID}`)
              }
            />
          ) : null}
        </div>
      </CSSTransition>

      <NotificationList
        isDisplay={isDisplay}
        setIsDisplay={setIsDisplay}
        setGroupID={setGroupID}
        setIsOpenJoinGroupBox={setIsOpenJoinGroupBox}
        setUnRead={setUnRead}
        setNewNotification={setNewNotification}
        setTaskID={setTaskID}
        openTaskPopup={() => setIsOpenTaskPopup(true)}
      />

      {groupID ? (
        <JoinGroupPopup
          groupID={groupID}
          isOpen={isOpenJoinGroupBox}
          closePopup={() => setIsOpenJoinGroupBox(false)}
        />
      ) : null}

      <TaskPopUp
        id={taskID}
        isOpen={isOpenTaskPopup}
        onClose={() => setIsOpenTaskPopup(false)}
      />
    </div>
  );
}
