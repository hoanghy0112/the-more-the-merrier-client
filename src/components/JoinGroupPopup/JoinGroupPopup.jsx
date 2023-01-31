/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { useDispatch } from 'react-redux';

import { ACCEPT_JOIN_GROUP } from '../../constants/apiURL';
import { useGroupInformationByIDQuery } from '../../features/groupsManagement/groupAPI';
import { useUserProfileByIDQuery } from '../../features/userManagement/profileAPI';

import CenteredModal from '../CenteredModal/CenteredModal';
import PrimaryButton from '../PrimaryButton/PrimaryButton';

import styles from './JoinGroupPopup.module.scss';
import UserIcon from '../UserIcon/UserIcon';
import UserList from '../UserList/UserList';
import { getAllGroups } from '../../features/groupsManagement/groupSlice';

export default function JoinGroupPopup({ groupID, isOpen, closePopup }) {
  const dispatch = useDispatch();
  const {
    data: groupData,
    error: groupError,
    isLoading: groupIsLoading,
  } = useGroupInformationByIDQuery(groupID);

  const { data: adminData } = useUserProfileByIDQuery(groupData?.admin || '');

  const [
    isOpenDetailGroupInformationPopUp,
    setIsOpenDetailGroupInformationPopUp,
  ] = useState(false);

  async function handleAgree() {
    closePopup();
    const auth = getAuth();
    const accessToken = await auth.currentUser.getIdToken();
    await axios.put(`${ACCEPT_JOIN_GROUP}/${groupID}`, '', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // dispatch(getAllGroups());
  }

  function handleReject() {
    closePopup();
  }

  return (
    <CenteredModal isOpen={isOpen} onClose={closePopup}>
      <div className={styles.popup}>
        {groupIsLoading ? (
          <p>Loading group info...</p>
        ) : (
          <>
            {groupError ? (
              <p>
                <span>Error: </span>
              </p>
            ) : (
              <>
                <p className={styles.header}>Invitation to join group</p>
                <p className={styles.content}>
                  <span className={styles.adminName}>
                    {`${adminData?.familyName || ''} ${
                      adminData?.givenName || ''
                    }` || 'no name'}
                  </span>
                  <span> has invited you to join group </span>
                  <span
                    className={styles.groupName}
                    onClick={() => setIsOpenDetailGroupInformationPopUp(true)}
                  >
                    {groupData?.name || 'no name'}
                  </span>
                </p>
                <p
                  className={styles.groupName}
                  onClick={() => setIsOpenDetailGroupInformationPopUp(true)}
                >
                  View group detail
                </p>
                <div className={styles.buttonGroup}>
                  <button
                    type="button"
                    className={styles.agree}
                    onClick={handleAgree}
                  >
                    Agree
                  </button>
                  <button
                    type="button"
                    className={styles.reject}
                    onClick={handleReject}
                  >
                    Reject
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
      <CenteredModal
        isOpen={isOpenDetailGroupInformationPopUp}
        onClose={() => setIsOpenDetailGroupInformationPopUp(false)}
      >
        <div className={styles.detailedPopUp}>
          <p className={styles.information}>{groupData?.name || 'No name'}</p>
          <p>
            {/* <span>Description: </span> */}
            <span className={styles.description}>
              {groupData?.description || 'No description'}
            </span>
          </p>
          <p>
            <span>Admin: </span>
            <span>
              <UserIcon size={30} userID={groupData?.admin} withName />
            </span>
          </p>
          {groupData?.users?.length ? (
            <UserList userIDs={groupData?.users} />
          ) : (
            <p>This group has no member</p>
          )}
          <PrimaryButton
            title="Cancel"
            onClick={() => setIsOpenDetailGroupInformationPopUp(false)}
          />
        </div>
      </CenteredModal>
    </CenteredModal>
  );
}
