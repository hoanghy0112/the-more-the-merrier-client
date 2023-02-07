/* eslint-disable react/jsx-no-bind */
import React, { useRef } from 'react';

import { useDispatch } from 'react-redux';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import { updateUserProfile } from '../../features/userManagement/ProfileSlice';
import styles from './AnonymousPage.module.scss';

export default function AnonymousPage() {
  const dispatch = useDispatch();
  const nameRef = useRef();

  function handleSetName() {
    const name = nameRef?.current.value;
    const splittedName = name.trim().split(' ');
    const givenName = splittedName[splittedName.length - 1];
    const familyName = splittedName.slice(0, splittedName.length - 1).join(' ');
    dispatch(updateUserProfile({ givenName, familyName }));
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Can we have your name to identify you?</h1>
        <input
          ref={nameRef}
          type="text"
          placeholder="Enter your name here..."
        />
        <PrimaryButton onClick={handleSetName}>Continue</PrimaryButton>
      </div>
    </div>
  );
}
