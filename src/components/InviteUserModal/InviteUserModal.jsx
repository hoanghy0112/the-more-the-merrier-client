/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import CenteredModal from '../CenteredModal/CenteredModal';

import {
  selectCurrentGroupInfo,
  selectGroupBusyTime,
} from '../../features/groupsManagement/groupSlice';
import DateTimePicker from '../DateTimePicker/DateTimePicker';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import TimeTag from '../TimeTag/TimeTag';
import UserChoosing from '../UserChoosing/UserChoosing';
import styles from './InviteUserModal.module.scss';

export default function InviteUserModal({
  time: { from, to },
  participants,
  setParticipants,
}) {
  const [isOpen, setIsOpen] = useState(false);
  // const [participants, setParticipants] = useState(new Set());

  const numberOfBusyUser = useRef(0);

  const { name: groupName, users } = useSelector(selectCurrentGroupInfo);

  const groupBusyTimes = useSelector(selectGroupBusyTime);

  useEffect(() => {
    numberOfBusyUser.current = groupBusyTimes.filter(
      (time) =>
        new Date(from) < new Date(time.to) &&
        new Date(to) > new Date(time.from),
    ).length;
  }, [groupBusyTimes]);

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
              <span className={styles.number}>{numberOfBusyUser.current}</span>
              <span>busy users</span>
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
          <UserChoosing
            participants={participants}
            setParticipants={setParticipants}
            close={() => setIsOpen(false)}
          />
        </div>
      </CenteredModal>
    </>
  );
}
