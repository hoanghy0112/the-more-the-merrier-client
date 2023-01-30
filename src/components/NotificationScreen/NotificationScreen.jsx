/* eslint-disable react/button-has-type */
import React from 'react';
import * as moment from 'moment';
import TimeTag from '../TimeTag/TimeTag';
import styles from './NotificationScreen.module.scss';

export default function NotificationScreen() {
  const now = new Date();
  const nowTime = moment(now).format('HH:mm');
  return (
    <div className={styles.container}>
      <p className={styles.title}>Lời mời gia nhập nhóm</p>
      <p className={styles.content}>Dinh Quang Duong vừa tạo một group mới</p>
      <p className={styles.time}>{nowTime}</p>
      <div className={styles.buttonContainer}>
        <button className={styles.button}>
          <p className={styles.text}>Go</p>
        </button>
        <button className={styles.button}>
          <p className={styles.text}>Cancel</p>
        </button>
      </div>
    </div>
  );
}
