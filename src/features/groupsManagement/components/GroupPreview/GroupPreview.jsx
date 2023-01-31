/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useCallback, useRef, useState } from 'react';

import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ICON_TRASH } from '../../../../assets/icons';
import NotificationModal from '../../../../components/NotificationModal/NotificationModal';
import PrimaryButton from '../../../../components/PrimaryButton/PrimaryButton';
import UserList from '../../../../components/UserList/UserList';
import { DELETE_GROUP_BY_ID } from '../../../../constants/apiURL';
import useGroupInformation from '../../../../hooks/useGroupInformation';
import { selectUserProfile } from '../../../userManagement/ProfileSlice';
import styles from './GroupPreview.module.scss';

export default function GroupPreview({ groupID: id }) {
  const navigate = useNavigate();

  const { groupInfo, isLoading } = useGroupInformation(id);

  const userProfile = useSelector(selectUserProfile);

  const [isOpenNotificationModal, setIsOpenNotificationModal] = useState(false);
  const notificationData = useRef({ status: '', title: '', content: '' });

  const handleDeleteGroup = useCallback(async (groupID) => {
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
          content: `Group ${groupInfo.name} has been deleted`,
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

  return (
    <>
      {isLoading ? (
        ''
      ) : (
        <div key={id} className={styles.groupContainer}>
          <div className={styles.introduction}>
            <p className={styles.name}>{groupInfo.name}</p>
            <UserList
              userIDs={[groupInfo.admin, ...groupInfo.users]}
              max={3}
              size={30}
            />
          </div>
          <p className={styles.description}>
            {groupInfo.description || 'No description'}
          </p>
          <div className={styles.detail}>
            <PrimaryButton
              title="View detail"
              onClick={() => {
                // dispatch(setCurrentGroup(_id));
                navigate(groupInfo._id);
              }}
            />
            {userProfile._id === groupInfo.admin ? (
              <PrimaryButton
                title={<img src={ICON_TRASH} className={styles.image} alt="" />}
                width={80}
                backgroundColor="rgb(230, 0, 0)"
                shadowColor="rgb(255, 183, 0)"
                confirmed
                confirmMesssage={
                  <p>
                    <span>Do you want to delete group</span>
                    <span>{groupInfo.name}</span>
                  </p>
                }
                onClick={() => handleDeleteGroup(groupInfo._id)}
              />
            ) : null}
          </div>
          <NotificationModal
            isOpen={isOpenNotificationModal}
            closeModal={() => setIsOpenNotificationModal(false)}
            title={notificationData.current.title}
            content={
              notificationData.current.status === 'success' ? (
                <p>
                  <span>Group </span>
                  <span style={{ fontWeight: 600 }}>
                    {notificationData.current.groupName}
                  </span>
                  <span> has been deleted successfully</span>
                </p>
              ) : (
                notificationData.current.content
              )
            }
          />
        </div>
      )}
    </>
  );
}
