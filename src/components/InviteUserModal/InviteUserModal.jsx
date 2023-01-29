/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CenteredModal from '../CenteredModal/CenteredModal';

import { selectCurrentGroupInfo } from '../../features/groupsManagement/groupSlice';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import styles from './InviteUserModal.module.scss';
import TimeTag from '../TimeTag/TimeTag';
import DateTimePicker from '../DateTimePicker/DateTimePicker';

export default function InviteUserModal({ time: { from, to } }) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    _id: groupID,
    admin,
    description,
    name: groupName,
    users,
  } = useSelector(selectCurrentGroupInfo);

  function onClose() {
    setIsOpen(false);
  }

  return (
    <>
      <PrimaryButton
        title="View participants"
        onClick={() => setIsOpen(true)}
        reversed
      />
      <CenteredModal isOpen={isOpen} onClose={onClose}>
        <div className={styles.container}>
          <div>
            <h1>{groupName}</h1>
            <h2>
              <span className={styles.number}>{users.length}</span>
              <span>active users</span>
            </h2>
            <div className={styles.timeContainer}>
              <div className={styles.todoTime}>
                <TimeTag time={from} />
                -
                <TimeTag time={to} />
              </div>
              <span className={styles.timePicker}>
                <DateTimePicker
                  startDay={from}
                  hanldeChangeStartDay={() => {}}
                />
              </span>
            </div>
          </div>
        </div>
      </CenteredModal>
    </>
  );
}
