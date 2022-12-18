/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import axios from 'axios';

import { ACCEPT_JOIN_GROUP } from '../../constants/apiURL';
import { useGroupInformationByIDQuery } from '../../features/groupsManagement/groupAPI';
import { useUserProfileByIDQuery } from '../../features/userManagement/profileAPI';
import CenteredModal from '../CenteredModal/CenteredModal';

import styles from './JoinGroupPopup.module.scss';
import { getAuth } from 'firebase/auth';

export default function JoinGroupPopup({ groupID, isOpen, closePopup }) {
  const {
    data: groupData,
    error: groupError,
    isLoading: groupIsLoading,
  } = useGroupInformationByIDQuery(groupID);

  const {
    data: adminData,
    error: adminError,
    isLoading: adminIsLoading,
  } = useUserProfileByIDQuery(groupData?.admin || '');

  const [
    isOpenDetailGroupInformationPopUp,
    setIsOpenDetailGroupInformationPopUp,
  ] = useState(false);

  async function handleAgree() {
    closePopup();
    const auth = getAuth();
    const accessToken = await auth.currentUser.getIdToken();
    const response = await axios.put(`${ACCEPT_JOIN_GROUP}/${groupID}`, '', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response);
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
                  <span>Group </span>
                  <span
                    className={styles.groupName}
                    onClick={() => setIsOpenDetailGroupInformationPopUp(true)}
                  >
                    {groupData?.name || 'no name'}
                  </span>
                  <span> has invited you to join group</span>
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
            <span>Description: </span>
            <span className={styles.description}>
              {groupData?.description || 'No description'}
            </span>
          </p>
          <p>
            <span>Admin: </span>
            {adminIsLoading ? (
              ''
            ) : (
              <span>
                <img src={adminData?.photo} alt="" />
              </span>
            )}
            <span className={styles.author}>
              {adminIsLoading && !adminError
                ? 'Loading...'
                : `${adminData?.familyName} ${adminData?.givenName}`}
              {adminError && 'Error'}
            </span>
          </p>
          <button
            type="button"
            onClick={() => setIsOpenDetailGroupInformationPopUp(false)}
          >
            Cancel
          </button>
        </div>
      </CenteredModal>
    </CenteredModal>
  );
}
