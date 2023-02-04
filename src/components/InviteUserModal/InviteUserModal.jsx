/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import CenteredModal from '../CenteredModal/CenteredModal';

import { selectGroupBusyTime } from '../../features/groupsManagement/groupSlice';
import useGroupInformation from '../../features/groupsManagement/hooks/useGroupInformation';
import DateTimePicker from '../DateTimePicker/DateTimePicker';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import TimeTag from '../TimeTag/TimeTag';
import UserChoosing from '../UserChoosing/UserChoosing';
import styles from './InviteUserModal.module.scss';

export default function InviteUserModal({
  time: { from, to },
  participants,
  responses,
  setParticipants,
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const numberOfBusyUser = useRef(0);

  const groupID = location.pathname.split('/').slice(-1)[0];
  const { groupInfo } = useGroupInformation(groupID);

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
        title="Manage participants"
        onClick={() => setIsOpen(true)}
        reversed
      />
      <CenteredModal isOpen={isOpen} onClose={onClose}>
        <div className={styles.container}>
          <div>
            <h1>{groupInfo?.name}</h1>
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
            responses={responses}
            setParticipants={setParticipants}
            close={() => setIsOpen(false)}
            disabled={disabled}
          />
        </div>
      </CenteredModal>
    </>
  );
}
