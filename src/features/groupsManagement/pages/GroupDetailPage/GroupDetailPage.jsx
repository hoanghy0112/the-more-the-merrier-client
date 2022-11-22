/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import DateTimePicker from '../../../../components/DateTimePicker/DateTimePicker';

import GroupCalendar from '../../../calendar/components/GroupCalendar/GroupCalendar';
import { getAllTasks } from '../../../tasksManagement/TasksSlice';

import { ICON_BACK_PRIMARY } from '../../../../assets/icons';
import CenteredModal from '../../../../components/CenteredModal/CenteredModal';
import PrimaryButton from '../../../../components/PrimaryButton/PrimaryButton';
import AddUserScreen from '../../components/AddUserScreen/AddUserScreen';
import GeneratedSuggestionModal from '../../components/GeneratedSuggestionModal/GeneratedSuggestionModal';
import SuggestTimeModal from '../../components/SuggestTimeModal/SuggestTimeModal';
import { selectGroupByID } from '../../groupSlice';
import styles from './GroupDetailPage.module.scss';

export default function GroupDetailPage() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [isOpenAddUserModal, setIsOpenAddUserModal] = useState(false);
  const [isOpenAddTaskModal, setIsOpenAddTaskModal] = useState(false);
  const [isOpenGeneratedTimeModal, setIsOpenGeneratedTimeModal] =
    useState(false);

  const [suggestionOptions, setSuggestionOptions] = useState({});

  const groupInfo = useSelector(
    selectGroupByID(location.pathname.split('/').slice(-1)[0]),
  );

  const now = new Date();

  const [date, setDate] = useState(
    new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - now.getDay() + 1,
    ),
  );

  function handleChangeDate(newDate) {
    setDate(
      new Date(
        newDate.getFullYear(),
        newDate.getMonth(),
        newDate.getDate() - newDate.getDay() + 1,
      ),
    );
  }

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getAllTasks());
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.calendar}>
        <div className={styles.picker}>
          <DateTimePicker
            startDay={date}
            hanldeChangeStartDay={handleChangeDate}
          />
        </div>
        <div className={styles.calendarMain}>
          <GroupCalendar startDate={date} />
        </div>
      </div>
      <div className={styles.sideMenu}>
        <div className={styles.groupInfo}>
          <div className={styles.back}>
            <img src={ICON_BACK_PRIMARY} alt="" />
            <p>Back</p>
          </div>
          <div className={styles.groupBasicInfo}>
            <p className={styles.name}>{groupInfo?.name || ''}</p>
            <p className={styles.numOfUser}>
              {`${(groupInfo?.users?.length || 0) + 1} users`}
            </p>
          </div>
          <PrimaryButton
            onClick={() => setIsOpenAddUserModal(true)}
            title="Add users"
          />
          <PrimaryButton
            onClick={() => setIsOpenAddTaskModal(true)}
            title="Add new meeting"
          />
          <CenteredModal
            isOpen={isOpenAddUserModal}
            onClose={() => setIsOpenAddUserModal(false)}
          >
            <AddUserScreen />
          </CenteredModal>
          <CenteredModal
            isOpen={isOpenAddTaskModal}
            onClose={() => setIsOpenAddTaskModal(false)}
          >
            <SuggestTimeModal
              onChooseTime={(options) => {
                setIsOpenAddTaskModal(false);
                setIsOpenGeneratedTimeModal(true);
                setSuggestionOptions(options);
              }}
            />
          </CenteredModal>
          <CenteredModal
            isOpen={isOpenGeneratedTimeModal}
            onClose={() => setIsOpenGeneratedTimeModal(false)}
          >
            <GeneratedSuggestionModal
              options={suggestionOptions}
              onClose={() => setIsOpenGeneratedTimeModal(false)}
            />
          </CenteredModal>
        </div>
      </div>
    </div>
  );
}
