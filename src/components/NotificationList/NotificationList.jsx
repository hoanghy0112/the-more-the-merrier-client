import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { GET_ALL_NOTIFICATIONS } from '../../constants/apiURL';
import styles from './NotificationList.module.scss';

export default function NotificationList() {
  const [isSelected, setIsSelected] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const auth = getAuth();
      const accessToken = await auth.currentUser.getIdToken();
      const notificationList = await axios.get(GET_ALL_NOTIFICATIONS, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(notificationList);
      setList(notificationList.data);
    };
    fetchData();
  }, [isSelected]);

  return (
    <div className={styles.container}>
      <p className={styles.title}>Thông báo</p>
      <div className={styles.filterBar}>
        {isSelected ? (
          <div className={styles.buttonContainer}>
            <div
              className={styles.selectedButton}
              style={{ cursor: 'pointer' }}
              onClick={() => setIsSelected(true)}
            >
              Tất cả
            </div>
            <div
              className={styles.notSelectedButton}
              style={{ cursor: 'pointer' }}
              onClick={() => setIsSelected(false)}
            >
              Chưa đọc
            </div>
          </div>
        ) : (
          <div className={styles.buttonContainer}>
            <div
              className={styles.notSelectedButton}
              style={{ cursor: 'pointer' }}
              onClick={() => setIsSelected(true)}
            >
              Tất cả
            </div>
            <div
              className={styles.selectedButton}
              style={{ cursor: 'pointer' }}
              onClick={() => setIsSelected(false)}
            >
              Chưa đọc
            </div>
          </div>
        )}
        <p className={styles.text} style={{ cursor: 'pointer' }}>
          Xem tất cả
        </p>
      </div>
      <div className={styles.listContainer}>
        {isSelected
          ? list.map((notification) => (
              <div className={styles.notiContainer}>
                <img
                  src={notification.thumbnail}
                  alt="notification"
                  className={styles.imageContainer}
                />
                <p className={styles.content}>{notification.content}</p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
