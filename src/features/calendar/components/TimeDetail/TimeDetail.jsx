/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import PrimaryButton from '../../../../components/PrimaryButton/PrimaryButton';
import TimeTag from '../../../../components/TimeTag/TimeTag';
import {
  createTaskOfGroup,
  selectCurrentGroupInfo,
} from '../../../groupsManagement/groupSlice';
import styles from './TimeDetail.module.scss';
import DateTimePicker from '../../../../components/DateTimePicker/DateTimePicker';
import CenteredModal from '../../../../components/CenteredModal/CenteredModal';
import CreateNewTask from '../../../../components/CreateNewTask/CreateNewTask';
import { setSuggestionVisible } from '../../calendarSlice';

export default function TimeDetail({ busy, from, to }) {
  const dispatch = useDispatch();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const groupInfo = useSelector(selectCurrentGroupInfo);

  return (
    <div className={styles.container}>
      <div className={styles.basicInfo}>
        <p>{groupInfo?.name}</p>
        <p>
          <span>{busy}</span>
          <span> busy people</span>
        </p>
      </div>
      <div className={styles.datetime}>
        <div className={styles.time}>
          <TimeTag time={new Date(from)} disabled />
          -
          <TimeTag time={new Date(to)} disabled />
        </div>
        <DateTimePicker originalDate={from} disabled />
      </div>
      <PrimaryButton
        style={{ marginTop: 10 }}
        onClick={() => setIsOpenModal(true)}
      >
        Add new task
      </PrimaryButton>
      <CenteredModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <CreateNewTask
          data={{ time: { from, to }, belongTo: groupInfo?._id }}
          onCreateNewTask={(data) => {
            dispatch(createTaskOfGroup({ groupID: groupInfo._id, ...data }));
            dispatch(setSuggestionVisible(false));
            setIsOpenModal(false);
          }}
          isGroup
          closeModal={() => setIsOpenModal(false)}
        />
      </CenteredModal>
    </div>
  );
}
