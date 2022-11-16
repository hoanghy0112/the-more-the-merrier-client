import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ICON_ADD, ICON_FULL_ARROW_RIGHT } from '../../../../assets/icons';
import {
  getUserProfile,
  selectUserProfile,
} from '../../../userManagement/ProfileSlice';
import { createNewGroup, selectAllGroups } from '../../groupSlice';

import styles from './CreateNewGroup.module.scss';

export default function CreateNewGroup() {
  const titleRef = useRef();
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(selectUserProfile);
  // console.log('user: ', user._id);
  const users = [];

  const handleCreateCLick = () => {
    dispatch(createNewGroup(user.engName, description, users, user._id));
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
      <div className={styles.user}>
        <button type="button">
          <span>
            <img src={ICON_ADD} alt="" />
          </span>
          Add user
        </button>
      </div>
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
