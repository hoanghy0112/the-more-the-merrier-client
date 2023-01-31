/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { ICON_FULL_ARROW_RIGHT, ICON_PENCIL } from '../../../../assets/icons';
import CenteredModal from '../../../../components/CenteredModal/CenteredModal';
import { CHANGE_GROUP_INFO } from '../../../../constants/apiURL';

import styles from './EditGroup.module.scss';

export default function EditGroup({ groupID, groupName, groupDescription }) {
  const nameRef = useRef();
  const [description, setDescription] = useState(groupDescription || '');

  const [isOpen, setIsOpen] = useState(false);

  const handleCreateCLick = async () => {
    const auth = getAuth();
    const accessToken = await auth.currentUser.getIdToken();
    await axios.put(
      `${CHANGE_GROUP_INFO}/${groupID}`,
      {
        name: nameRef.current.value,
        description,
      },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    setIsOpen(false);
  };

  return (
    <>
      <img onClick={() => setIsOpen(true)} src={ICON_PENCIL} alt="" />
      <CenteredModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className={styles.container}>
          <div className={styles.header}>
            <input
              ref={nameRef}
              defaultValue={groupName}
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
            rows={Math.max(description.split('\n').length + 1, 2)}
            spellCheck={false}
            placeholder="Enter your group description here..."
          />
          <button
            type="button"
            className={styles.createButton}
            onClick={handleCreateCLick}
          >
            Submit
            <span>
              <img src={ICON_FULL_ARROW_RIGHT} alt="" />
            </span>
          </button>
        </div>
      </CenteredModal>
    </>
  );
}
