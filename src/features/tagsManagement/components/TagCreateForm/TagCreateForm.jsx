/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useRef, useState } from 'react';

import PropTypes from 'prop-types';

import styles from './TagCreateForm.module.scss';
import {
  ICON_BOOKMARKS,
  ICON_FOLDER,
  ICON_FULL_ARROW_RIGHT,
} from '../../../../assets/icons';
import { createNewTagAPI } from '../../tagAPI';

export default function TagCreateForm() {
  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');

  const titleRef = useRef();
  const descriptionRef = useRef();

  function handleCreateNewTask() {
    if ((titleRef?.current, descriptionRef?.current)) {
      createNewTagAPI({
        title: titleRef.current.textContent,
        description: descriptionRef.current.textContent,
      });
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.tagTitle}>
          <span
            ref={titleRef}
            role="textbox"
            // onInput={(e) => setTitle(e.target.textContent)}
            contentEditable
          />
          <div className={styles.tagIcon}>
            <img src={ICON_BOOKMARKS} alt="folder" />
          </div>
        </div>
      </div>
      <div className={styles.description}>
        <span
          ref={descriptionRef}
          role="textbox"
          // onInput={(e) => setDescription(e.target.textContent)}
          contentEditable
        />
      </div>
      <div className={styles.createButton} onClick={handleCreateNewTask}>
        <p>Create</p>
        <img src={ICON_FULL_ARROW_RIGHT} alt="next" />
      </div>
    </div>
  );
}
