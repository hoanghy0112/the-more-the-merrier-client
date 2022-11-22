import React, { useState, useEffect } from 'react';
import styles from './NotificationList.module.scss';

export default function NotificationList() {
  const [isSelected, setIsSelected] = useState(true);

  useEffect(() => {}, [isSelected]);

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
    </div>
  );
}
