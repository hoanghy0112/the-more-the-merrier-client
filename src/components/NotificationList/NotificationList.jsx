/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import useComponentVisible from '../../hooks/useComponentVisible';

import useNotification from '../../hooks/useNotification';

import styles from './NotificationList.module.scss';

export default function NotificationList({
  isDisplay,
  setIsDisplay,
  setGroupID,
  setIsOpenJoinGroupBox,
  setUnRead,
  setNewNotification,
  setTaskID,
  openTaskPopup,
}) {
  const navigate = useNavigate();
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const [isReadAll, setIsReadAll] = useState(true);

  const { notifications, isLoading, readAllNotification, readNotification } =
    useNotification(setNewNotification);

  useEffect(() => {
    setIsDisplay(isComponentVisible);
  }, [isComponentVisible]);

  useEffect(() => {
    setIsComponentVisible(isDisplay);
  }, [isDisplay]);

  useEffect(() => {
    setUnRead(
      notifications?.reduce?.(
        (total, notification) => total + (notification.isRead ? 0 : 1),
        0,
      ),
    );
  }, [JSON.stringify(notifications)]);

  return (
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
      <div ref={ref} className={styles.notificationBody}>
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
                  _id,
                  type,
                  groupID: groupDataID,
                  taskID,
                }) => (
                  <button
                    key={_id}
                    type="button"
                    onClick={() => {
                      if (type === 'invite') {
                        setGroupID(groupDataID);
                        setIsOpenJoinGroupBox(true);
                      } else if (type === 'join-group') {
                        setIsDisplay(false);
                        navigate(`/home/group/${groupDataID}`);
                      } else if (type === 'invite-task') {
                        setTaskID(taskID);
                        openTaskPopup();
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
  );
}
