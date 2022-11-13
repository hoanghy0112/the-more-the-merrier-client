import React, { useRef, useState } from 'react';
import { ICON_ADD, ICON_FULL_ARROW_RIGHT } from '../../../../assets/icons';

import styles from './CreateNewGroup.module.scss';

export default function CreateNewGroup() {
  const titleRef = useRef();
  const [description, setDescription] = useState('');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <input
          ref={titleRef}
          type="text"
          placeholder="Enter group name..."
          spellCheck={false}
        />
        {/* <img src={ICON_FOLDER} alt="" /> */}
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
      <button type="button" className={styles.createButton}>
        Create
        <span>
          <img src={ICON_FULL_ARROW_RIGHT} alt="" />
        </span>
      </button>
    </div>
  );
}
