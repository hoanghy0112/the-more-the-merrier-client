/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useGroupInformationByIDQuery } from '../../features/groupsManagement/groupAPI';
import { useUserProfileByIDQuery } from '../../features/userManagement/profileAPI';
import CenteredModal from '../CenteredModal/CenteredModal';

import styles from './JoinGroupPopup.module.scss';

export default function JoinGroupPopup({ groupID, isOpen, onClose }) {
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

  console.log({ adminData });

  const [
    isOpenDetailGroupInformationPopUp,
    setIsOpenDetailGroupInformationPopUp,
  ] = useState(false);

  function handleAgree() {}

  function handleReject() {}

  return (
    <CenteredModal isOpen={isOpen} onClose={() => onClose(false)}>
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
          {/* <p> */}
          {/* <span>Name: </span> */}
          <p className={styles.information}>{groupData?.name || 'No name'}</p>
          {/* </p> */}
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
              {/* {groupData?.description || 'No description'} */}
              {adminIsLoading
                ? 'Loading...'
                : `${adminData?.familyName} ${adminData?.givenName}`}
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
