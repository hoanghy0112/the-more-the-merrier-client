/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ICON_TRASH } from '../../../../assets/icons';
import CenteredModal from '../../../../components/CenteredModal/CenteredModal';
import NotificationModal from '../../../../components/NotificationModal/NotificationModal';
import PrimaryButton from '../../../../components/PrimaryButton/PrimaryButton';
import UserList from '../../../../components/UserList/UserList';
import { DELETE_GROUP_BY_ID } from '../../../../constants/apiURL';
import CreateNewGroup from '../../components/CreateNewGroup/CreateNewGroup';
import {
  getAllGroups,
  selectAllGroups,
  setCurrentGroup,
} from '../../groupSlice';

import styles from './GroupListPage.module.scss';
import { selectUserProfile } from '../../../userManagement/ProfileSlice';

export default function GroupListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpenCreateGroupModal, setIsOpenCreateGroupModal] = useState(false);

  const [isOpenNotificationModal, setIsOpenNotificationModal] = useState(false);
  const notificationData = useRef({ status: '', title: '', content: '' });

  const groupList = useSelector(selectAllGroups);
  const userProfile = useSelector(selectUserProfile);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getAllGroups());
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDeleteGroup = useCallback(async (groupID) => {
    const auth = getAuth();
    const accessToken = await auth.currentUser.getIdToken();
    try {
      const response = await axios.delete(`${DELETE_GROUP_BY_ID}/${groupID}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      dispatch(getAllGroups());

      if (response.status === 200) {
        const { name } = groupList.find((group) => group._id === groupID);
        notificationData.current = {
          status: 'success',
          title: 'Delete group successfully',
          content: `Group ${name} has been deleted`,
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
    <div className={styles.container}>
      <PrimaryButton
        title="Create new group"
        width={250}
        style={{ marginLeft: 15 }}
        onClick={() => setIsOpenCreateGroupModal(true)}
      />
      <div className={styles.groupList}>
        {groupList.map(
          ({ _id, name, description, admin: adminID, users: userIDs }) => (
            <div key={_id} className={styles.groupContainer}>
              <div className={styles.introduction}>
                <p className={styles.name}>{name}</p>
                <UserList userIDs={[adminID, ...userIDs]} max={3} size={30} />
              </div>
              <p className={styles.description}>
                {description || 'No description'}
              </p>
              <div className={styles.detail}>
                <PrimaryButton
                  title="View detail"
                  onClick={() => {
                    dispatch(setCurrentGroup(_id));
                    navigate(_id);
                  }}
                />
                {userProfile._id === adminID ? (
                  <PrimaryButton
                    title={
                      <img src={ICON_TRASH} className={styles.image} alt="" />
                    }
                    width={80}
                    backgroundColor="rgb(230, 0, 0)"
                    shadowColor="rgb(255, 183, 0)"
                    confirmed
                    confirmMesssage={
                      <p>
                        <span>Do you want to delete group</span>
                        <span>{name}</span>
                      </p>
                    }
                    onClick={() => handleDeleteGroup(_id)}
                  />
                ) : null}
              </div>
            </div>
          ),
        )}
      </div>
      <CenteredModal
        isOpen={isOpenCreateGroupModal}
        onClose={() => setIsOpenCreateGroupModal(false)}
      >
        <CreateNewGroup closeModal={() => setIsOpenCreateGroupModal(false)} />
      </CenteredModal>
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
  );
}
