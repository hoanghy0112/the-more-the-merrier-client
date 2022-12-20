/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import React, { useCallback, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import CLOSE_ICON from '../../../../assets/icons/close.svg';
import BusyTimeChart from '../../../../components/BusyTimeChart/BusyTimeChart';
import NotificationModal from '../../../../components/NotificationModal/NotificationModal';
import PrimaryButton from '../../../../components/PrimaryButton/PrimaryButton';
import UserList from '../../../../components/UserList/UserList';
import { DELETE_GROUP_BY_ID } from '../../../../constants/apiURL';

import styles from './GroupInformation.module.scss';

export default function GroupInformation({ groupInfo, closeModal }) {
  const navigate = useNavigate();

  const { _id: groupID, name, description, users, admin } = groupInfo;

  const [isOpenNotificationModal, setIsOpenNotificationModal] = useState(false);
  const notificationData = useRef({ status: '', title: '', content: '' });

  const handleDeleteGroup = useCallback(async () => {
    // closeModal();
    const auth = getAuth();
    const accessToken = await auth.currentUser.getIdToken();
    const response = await axios.delete(`${DELETE_GROUP_BY_ID}/${groupID}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log({ response });

    if (response.status === 400) {
      notificationData.current = {
        status: 'error',
        title: 'Operation error',
        content: response.data,
      };
      setIsOpenNotificationModal(true);
    }

    if (response.status === 200) {
      notificationData.current = {
        status: 'success',
        title: 'Delete group successfully',
        content: `Group ${name} has been deleted`,
      };
      setIsOpenNotificationModal(true);
    }
  }, []);

  const handleCloseNotificationModal = useCallback(() => {
    setIsOpenNotificationModal(false);
    if (notificationData.current.status === 'success') navigate('/home/group/');
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h1>{name}</h1>
          <UserList userIDs={[admin, ...users] || []} size={30} max={5} />
        </div>
        <p>{description}</p>
      </div>
      <div className={styles.body}>
        <BusyTimeChart groupInfo={groupInfo} />
        <div className={styles.deleteGroup}>
          <PrimaryButton
            title="Delete group"
            confirmed
            backgroundColor="rgb(230, 0, 0)"
            shadowColor="rgb(255, 183, 0)"
            onClick={handleDeleteGroup}
          />
        </div>
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
              <span style={{ fontWeight: 600 }}>{name}</span>
              <span> has been deleted successfully</span>
            </p>
          ) : (
            notificationData.current.content
          )
        }
      />
    </div>
  );
}
