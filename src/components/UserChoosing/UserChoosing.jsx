/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { selectCurrentGroupInfo } from '../../features/groupsManagement/groupSlice';
import styles from './UserChoosing.module.scss';
import UserIcon from '../UserIcon/UserIcon';
import PrimaryButton from '../PrimaryButton/PrimaryButton';

export default function UserChoosing({
  participants: defaultParticipants = new Set(),
  setParticipants: defaultSetParticipants = () => {},
  close,
}) {
  const [participants, setParticipants] = useState(defaultParticipants);
  const { users, admin } = useSelector(selectCurrentGroupInfo);

  return (
    <div className={styles.container}>
      <p>Click to add participants</p>
      <div className={styles.userList}>
        {[...users, admin].map((userID) => (
          <UserIcon
            choosable
            withName
            userID={userID}
            isChoosing={participants.has(userID)}
            onClick={() =>
              setParticipants((prev) => {
                const newSet = new Set(prev);
                if (participants.has(userID)) newSet.delete(userID);
                else newSet.add(userID);
                return newSet;
              })
            }
          />
        ))}
      </div>
      <div className={styles.buttons}>
        <PrimaryButton
          title="Discard changes"
          backgroundColor="rgb(230, 0, 0)"
          shadowColor="rgb(255, 183, 0)"
          confirmed
          confirmMesssage={<p>Do you want to discard all changes?</p>}
          onClick={() => {
            setParticipants(defaultParticipants);
          }}
        />
        <PrimaryButton
          title="Agree"
          onClick={() => {
            defaultSetParticipants(participants);
            close();
          }}
        />
      </div>
    </div>
  );
}
