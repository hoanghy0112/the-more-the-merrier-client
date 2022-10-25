/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useRef } from 'react';

import PropTypes from 'prop-types';

import {
  ICON_BOOKMARKS,
  ICON_FULL_ARROW_RIGHT,
} from '../../../../assets/icons';
import { createNewTagAPI } from '../../tagAPI';
import styles from './TagCreateForm.module.scss';

export default function TagCreateForm({ onSendRequest }) {
  const titleRef = useRef();
  const descriptionRef = useRef();

  function handleCreateNewTask() {
    if ((titleRef?.current, descriptionRef?.current)) {
      const newTag = {
        title: titleRef.current.textContent,
        description: descriptionRef.current.textContent,
      };

      onSendRequest(newTag);
      createNewTagAPI(newTag);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.tagTitle}>
          <span ref={titleRef} role="textbox" contentEditable />
          <div className={styles.tagIcon}>
            <img src={ICON_BOOKMARKS} alt="folder" />
          </div>
        </div>
      </div>
      <div className={styles.description}>
        <span ref={descriptionRef} role="textbox" contentEditable />
      </div>
      <div className={styles.createButton} onClick={handleCreateNewTask}>
        <p>Create</p>
        <img src={ICON_FULL_ARROW_RIGHT} alt="next" />
      </div>
    </div>
  );
}

TagCreateForm.propTypes = {
  onSendRequest: PropTypes.func,
};

TagCreateForm.defaultProps = {
  onSendRequest: () => {},
};
