/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import styles from './ManageParticipants.module.scss';
import UserIcon from '../../../../components/UserIcon/UserIcon';
import ExpandBox from '../../../../components/ExpandBox/ExpandBox';
import PrimaryButton from '../../../../components/PrimaryButton/PrimaryButton';
import { ICON_CLOSE } from '../../../../assets/icons';
import CenteredModal from '../../../../components/CenteredModal/CenteredModal';
import AddUserScreen from '../AddUserScreen/AddUserScreen';
import { removeParticipantOfGroupAPI } from '../../groupAPI';

export default function ManageParticipants({ group }) {
  const userIDs = group?.users;
  const adminID = group?.admin;

  const [isOpenInviteUser, setIsOpenInviteUser] = useState(false);

  async function removeUser(userID) {
    await removeParticipantOfGroupAPI(group._id, userID);
  }

  return (
    <div className={styles.container}>
      <div className={styles.users}>
        <ExpandBox title="Admin">
          <div className={[styles.admin].join(' ')}>
            <UserIcon userID={adminID} size={30} withName />
          </div>
        </ExpandBox>
        <ExpandBox title="Participants">
          {(userIDs || []).map((userID) => (
            <div key={userID} className={styles.user}>
              <div style={{ width: '100%' }}>
                <UserIcon userID={userID} size={30} withName />
              </div>
              <PrimaryButton
                backgroundColor="rgb(230, 0, 0)"
                shadowColor="rgb(255, 183, 0)"
                confirmed
                confirmMesssage="Do you want to remove this participant"
                onClick={() => removeUser(userID)}
                reversed
                width={80}
                style={{ padding: '5px 0' }}
              >
                <ICON_CLOSE size={25} style={{ color: 'rgb(230, 0, 0)' }} />
              </PrimaryButton>
            </div>
          ))}
        </ExpandBox>
      </div>
      <PrimaryButton
        style={{ marginTop: 30 }}
        onClick={() => setIsOpenInviteUser(true)}
      >
        Invite user
      </PrimaryButton>

      <CenteredModal
        isOpen={isOpenInviteUser}
        onClose={() => setIsOpenInviteUser(false)}
      >
        <AddUserScreen
          groupInfo={group}
          closeModal={() => setIsOpenInviteUser(false)}
        />
      </CenteredModal>
    </div>
  );
}
