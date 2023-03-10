/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import DateTimePicker from '../../../../components/DateTimePicker/DateTimePicker';

import GroupCalendar from '../../../calendar/components/GroupCalendar/GroupCalendar';

import { ICON_BACK_PRIMARY } from '../../../../assets/icons';
import CenteredModal from '../../../../components/CenteredModal/CenteredModal';
import InstructionModal from '../../../../components/InstructionModal/InstructionModal';
import PrimaryButton from '../../../../components/PrimaryButton/PrimaryButton';
import UserIcon from '../../../../components/UserIcon/UserIcon';
import { GROUP_NOT_FOUND } from '../../../../constants/errorMessage';
import { selectPersonalStartAndEndOfWeek } from '../../../tasksManagement/TasksSlice';
import { selectUserProfile } from '../../../userManagement/ProfileSlice';
import AddUserScreen from '../../components/AddUserScreen/AddUserScreen';
import GeneratedSuggestionModal from '../../components/GeneratedSuggestionModal/GeneratedSuggestionModal';
import GroupInformation from '../../components/GroupInformation/GroupInformation';
import SuggestTimeModal from '../../components/SuggestTimeModal/SuggestTimeModal';
import { setCurrentGroup } from '../../groupSlice';
import useGroupInformation from '../../hooks/useGroupInformation';
import styles from './GroupDetailPage.module.scss';

export default function GroupDetailPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpenAddUserModal, setIsOpenAddUserModal] = useState(false);
  const [isOpenAddTaskModal, setIsOpenAddTaskModal] = useState(false);
  const [isOpenGeneratedTimeModal, setIsOpenGeneratedTimeModal] =
    useState(false);
  const [isOpenMoreInformationModal, setIsOpenMoreInformationModal] =
    useState(false);

  const [suggestionOptions, setSuggestionOptions] = useState({});

  const groupID = location.pathname.split('/').slice(-1)[0];
  const { groupInfo, isLoading: groupIsLoading } = useGroupInformation(groupID);
  const { startDate } = useSelector(selectPersonalStartAndEndOfWeek);

  const userProfile = useSelector(selectUserProfile);

  const userIDs = useMemo(() => {
    if (groupInfo && !groupIsLoading) {
      return [...(groupInfo?.users || []), groupInfo?.admin || ''];
    }
    if (!groupInfo && !groupIsLoading) throw new Error(GROUP_NOT_FOUND);
    return [];
  }, [groupIsLoading, groupInfo?.users, groupInfo?.admin]);

  useEffect(() => {
    dispatch(setCurrentGroup(groupID));
  }, [groupID]);

  return (
    <div className={styles.container}>
      <div className={styles.calendar}>
        <div className={styles.picker}>
          <DateTimePicker />
          <InstructionModal isGroup />
        </div>
        <div className={styles.calendarMain}>
          <GroupCalendar />
        </div>
      </div>
      <div className={styles.sideMenu}>
        <div className={styles.groupInfo}>
          <div className={styles.back} onClick={() => navigate('/home/group/')}>
            <img src={ICON_BACK_PRIMARY} alt="" />
            <p>Back</p>
          </div>
          <div className={styles.groupBasicInfo}>
            <p className={styles.name}>{groupInfo?.name || ''}</p>
            <div className={styles.users}>
              {userIDs.map((userID) => (
                <UserIcon key={userID} marginLeft={-20} userID={userID} />
              ))}
            </div>
          </div>
          {userProfile?._id === groupInfo?.admin ? (
            <PrimaryButton
              onClick={() => setIsOpenAddUserModal(true)}
              title="Add users"
            />
          ) : null}
          <PrimaryButton
            onClick={() => setIsOpenAddTaskModal(true)}
            title="Add new meeting"
          />
          <PrimaryButton
            onClick={() => setIsOpenMoreInformationModal(true)}
            title="More information"
            reversed
          />
          <CenteredModal
            isOpen={isOpenAddUserModal}
            onClose={() => setIsOpenAddUserModal(false)}
          >
            <AddUserScreen
              groupInfo={groupInfo}
              closeModal={() => setIsOpenAddUserModal(false)}
            />
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
              startDate={startDate}
              options={suggestionOptions}
              onClose={() => setIsOpenGeneratedTimeModal(false)}
            />
          </CenteredModal>
          <CenteredModal
            isOpen={isOpenMoreInformationModal}
            onClose={() => setIsOpenMoreInformationModal(false)}
          >
            {groupInfo && (
              <GroupInformation
                groupInfo={groupInfo}
                closeModal={() => setIsOpenMoreInformationModal(false)}
              />
            )}
          </CenteredModal>
        </div>
      </div>
    </div>
  );
}
