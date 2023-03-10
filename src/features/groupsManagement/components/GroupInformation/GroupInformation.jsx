/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import React, { useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CLOSE_ICON from '../../../../assets/icons/close.svg';
import BusyTimeChart from '../../../../components/BusyTimeChart/BusyTimeChart';
import NotificationModal from '../../../../components/NotificationModal/NotificationModal';
import PrimaryButton from '../../../../components/PrimaryButton/PrimaryButton';
import UserIcon from '../../../../components/UserIcon/UserIcon';
import UserList from '../../../../components/UserList/UserList';
import { DELETE_GROUP_BY_ID } from '../../../../constants/apiURL';
import { selectUserProfile } from '../../../userManagement/ProfileSlice';
import EditGroup from '../EditGroup/EditGroup';

import styles from './GroupInformation.module.scss';
import useGroupInformation from '../../hooks/useGroupInformation';
import CenteredModal from '../../../../components/CenteredModal/CenteredModal';
import ManageParticipants from '../ManageParticipants/ManageParticipants';

export default function GroupInformation({ groupInfo, closeModal }) {
  const navigate = useNavigate();

  const { _id: groupID } = groupInfo;
  const { groupInfo: groupData, isLoading } = useGroupInformation(groupID);
  const userProfile = useSelector(selectUserProfile);

  const [isOpenNotificationModal, setIsOpenNotificationModal] = useState(false);
  const [isOpenManageParticipants, setIsOpenManageParticipants] =
    useState(false);

  const notificationData = useRef({ status: '', title: '', content: '' });

  const handleDeleteGroup = useCallback(async () => {
    const auth = getAuth();
    const accessToken = await auth.currentUser.getIdToken();
    try {
      const response = await axios.delete(`${DELETE_GROUP_BY_ID}/${groupID}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        notificationData.current = {
          status: 'success',
          title: 'Delete group successfully',
          content: `Group ${groupData.name} has been deleted`,
        };
        setIsOpenNotificationModal(true);
      }
    } catch (error) {
      const { data } = error.response;

      notificationData.current = {
        status: 'error',
        title: 'Operation error',
        content: data,
      };
      setIsOpenNotificationModal(true);
    }
  }, []);

  const handleCloseNotificationModal = useCallback(() => {
    setIsOpenNotificationModal(false);
    if (notificationData.current.status === 'success') navigate('/home/group/');
  }, []);

  return (
    <>
      {isLoading ? (
        ''
      ) : (
        <div className={styles.container}>
          <div className={styles.header}>
            <div>
              <div className={styles.name}>
                <h1>{groupData.name}</h1>
                {userProfile._id === groupData.admin ? (
                  <EditGroup
                    groupID={groupInfo?._id}
                    groupName={groupInfo?.name}
                    groupDescription={groupInfo?.description}
                  />
                ) : null}
              </div>
              <p>{groupData.description}</p>
            </div>
            <div className={styles.users}>
              <div className={styles.userIcons}>
                <UserIcon userID={groupData.admin} size={30} withName />
                <UserList userIDs={groupData.users || []} size={30} max={5} />
              </div>
              <PrimaryButton
                onClick={() => setIsOpenManageParticipants(true)}
                width={200}
              >
                Manage participants
              </PrimaryButton>
            </div>
          </div>
          <div className={styles.body}>
            <BusyTimeChart groupInfo={groupInfo} />
            {userProfile._id === groupData.admin ? (
              <div className={styles.deleteGroup}>
                <PrimaryButton
                  title="Delete group"
                  confirmed
                  backgroundColor="rgb(230, 0, 0)"
                  shadowColor="rgb(255, 183, 0)"
                  onClick={handleDeleteGroup}
                />
              </div>
            ) : null}
          </div>

          <img
            className={styles.close}
            src={CLOSE_ICON}
            alt="close"
            onClick={closeModal}
          />

          <NotificationModal
            isOpen={isOpenNotificationModal}
            closeModal={handleCloseNotificationModal}
            title={notificationData.current.title}
            content={
              notificationData.current.status === 'success' ? (
                <p>
                  <span>Group </span>
                  <span style={{ fontWeight: 600 }}>{groupData.name}</span>
                  <span> has been deleted successfully</span>
                </p>
              ) : (
                notificationData.current.content
              )
            }
          />
          <CenteredModal
            isOpen={isOpenManageParticipants}
            onClose={() => setIsOpenManageParticipants(false)}
          >
            <ManageParticipants group={groupData} />
          </CenteredModal>
        </div>
      )}
    </>
  );
}
