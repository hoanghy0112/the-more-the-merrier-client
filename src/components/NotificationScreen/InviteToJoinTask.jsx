/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import styles from './InviteToJoinTask.module.scss';

export default function InviteToJoinTask({ group, task, from, to, date }) {
  const now = new Date();
  const nowDate = moment(now).format('DD/MM/YYYY');
  const From = moment(from).format('LT');
  const To = moment(to).format('LT');
  const Date = moment(date).format('L');
  return (
    <div className={styles.container}>
      <p className={styles.title}>Invitation to join a task</p>
      <div className={styles.contentContainer}>
        <p className={styles.content}>{`Group ${group}`}</p>
        <p className={styles.content}>{`Task ${task}`}</p>
        <p className={styles.content}>{`From ${From} to ${To}`}</p>
        <p className={styles.content}>{`At ${nowDate}`}</p>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.button1}>
          <p className={styles.text}>Agree</p>
        </button>
        <button className={styles.button2}>
          <p className={styles.text} style={{ color: 'black' }}>
            Reject
          </p>
        </button>
      </div>
    </div>
  );
}
InviteToJoinTask.proptypes = {
  group: PropTypes.string.isRequired,
  task: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};
