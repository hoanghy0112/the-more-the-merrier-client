import React, { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import NOTIFICATION_ICON from '../../assets/icons/notification.svg';
import useNotification from '../../hooks/useNotification';
import CenteredModal from '../CenteredModal/CenteredModal';
import JoinGroupPopup from '../JoinGroupPopup/JoinGroupPopup';

import styles from './NotificationIndividual.module.scss';

export default function NotificationIndividual() {
  const [isDisplay, setIsDisplay] = useState(false);
  const [isReadAll, setIsReadAll] = useState(true);

  const [groupID, setGroupID] = useState('');
  const [isOpenJoinGroupBox, setIsOpenJoinGroupBox] = useState(false);

  const { notifications, isLoading, readAllNotification, readNotification } =
    useNotification();

  return (
    <div className={styles.container}>
      <button
        type="button"
        onClick={() => setIsDisplay((prev) => !prev)}
        className={styles.notificationIcon}
      >
        <img src={NOTIFICATION_ICON} alt="notification" />
      </button>
      <CSSTransition
        in={isDisplay}
        classNames={{
          enter: styles.bodyEnterActive,
          enterActive: styles.bodyEnterDone,
          enterDone: styles.bodyEnterDone,
          exit: styles.bodyExitActive,
          exitActive: styles.bodyExitDone,
          exitDone: styles.bodyExitDone,
        }}
        timeout={400}
      >
        <div className={styles.notificationBody}>
          <p className={styles.header}>Notification</p>
          <div className={styles.buttonGroup}>
            <div className={styles.readFilter}>
              <button
                onClick={() => {
                  setIsReadAll(true);
                }}
                className={isReadAll && styles.choosing}
                type="button"
              >
                All
              </button>
              <button
                onClick={() => {
                  setIsReadAll(false);
                }}
                className={isReadAll || styles.choosing}
                type="button"
              >
                Unread
              </button>
            </div>
            <button
              type="button"
              onClick={readAllNotification}
              className={styles.readAll}
            >
              Mark read all
            </button>
          </div>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className={styles.notificationList}>
              {notifications
                ?.filter?.((notification) => isReadAll || !notification.isRead)
                ?.map?.(
                  ({
                    content,
                    thumbnail,
                    isRead,
                    time,
                    _id,
                    type,
                    groupID: groupDataID,
                  }) => (
                    <button
                      type="button"
                      onClick={() => {
                        if (type === 'invite') {
                          setGroupID(groupDataID);
                          setIsOpenJoinGroupBox(true);
                        }
                        readNotification(_id);
                      }}
                      className={`${styles.notificationItem} ${
                        isRead || styles.unread
                      }`}
                    >
                      <img src={thumbnail} alt="" />
                      <p>{content}</p>
                    </button>
                  ),
                )}
            </div>
          )}
        </div>
      </CSSTransition>
      {groupID && (
        <JoinGroupPopup
          groupID={groupID}
          isOpen={isOpenJoinGroupBox}
          onClose={() => setIsOpenJoinGroupBox(false)}
        />
      )}
    </div>
  );
}
