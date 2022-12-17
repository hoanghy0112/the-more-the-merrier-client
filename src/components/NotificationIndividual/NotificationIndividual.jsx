import React, { useState } from 'react';

import NOTIFICATION_ICON from '../../assets/icons/notification.svg';
import useRealTimeData from '../../hooks/useRealTimeData';

import styles from './NotificationIndividual.module.scss';

export default function NotificationIndividual() {
  const [isReadAll, setIsReadAll] = useState(true);

  const { data: notification, isLoading } = useRealTimeData('notification');

  return (
    <div className={styles.container}>
      <button type="button" className={styles.notificationIcon}>
        <img src={NOTIFICATION_ICON} alt="notification" />
      </button>
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
          <button type="button" className={styles.readAll}>
            Mark read all
          </button>
        </div>
      </div>
    </div>
  );
}
