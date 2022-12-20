/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ICON_ADD, ICON_FULL_ARROW_RIGHT } from '../../../../assets/icons';
import { selectUserProfile } from '../../../userManagement/ProfileSlice';
import { createNewGroup } from '../../groupSlice';

import styles from './CreateNewGroup.module.scss';

export default function CreateNewGroup({ closeModal }) {
  const titleRef = useRef();
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(selectUserProfile);
  const users = [];

  const handleCreateCLick = () => {
    dispatch(
      createNewGroup({
        name: titleRef?.current?.value || '',
        description,
        users,
        admin: user._id,
      }),
    );
    closeModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <input
          ref={titleRef}
          type="text"
          placeholder="Enter group name..."
          spellCheck={false}
        />
      </div>
      <textarea
        className={styles.description}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        cols="30"
        rows={description.split('\n').length}
        spellCheck={false}
        placeholder="Enter your group description here..."
      />
      <button
        type="button"
        className={styles.createButton}
        onClick={handleCreateCLick}
      >
        Create
        <span>
          <img src={ICON_FULL_ARROW_RIGHT} alt="" />
        </span>
      </button>
    </div>
  );
}
