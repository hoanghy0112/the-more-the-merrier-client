/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useRef, useState } from 'react';

import PropTypes from 'prop-types';

import {
  ICON_BOOKMARKS,
  ICON_CHECKMARK,
  ICON_FULL_ARROW_RIGHT,
} from '../../../../assets/icons';
import { createNewTagAPI } from '../../tagAPI';

import styles from './TagCreateForm.module.scss';
import { useDispatch } from 'react-redux';
import { createNewTag } from '../../TagsSlice';

export default function TagCreateForm({ onSendRequest }) {
  const sampleColor = [
    '#00A6CA',
    '#F9B022',
    '#0DCF4F',
    '#F93BB8',
    '#3BB5F9',
    '#8F3BF9',
    '#3BF9C0',
  ];

  const dispatch = useDispatch();

  const titleRef = useRef();
  const descriptionRef = useRef();
  const [chosenColor, setChosenColor] = useState(sampleColor[0]);

  function handleCreateNewTask() {
    if ((titleRef?.current, descriptionRef?.current)) {
      const newTag = {
        title: titleRef.current.textContent,
        description: descriptionRef.current.textContent,
        color: chosenColor,
      };
      onSendRequest(newTag);
      dispatch(createNewTag(newTag));
      // createNewTagAPI(newTag);
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
      <div className={styles.colorContainer}>
        {sampleColor.map((color) => (
          <div
            onClick={() => setChosenColor(color)}
            className={[
              chosenColor === color && styles.chosen,
              styles.colorWrapper,
            ].join(' ')}
          >
            <div
              className={styles.colorItem}
              style={{
                backgroundColor: color,
              }}
            />
            <div className={styles.checkIcon}>
              {chosenColor === color && (
                <img src={ICON_CHECKMARK} alt="check" />
              )}
            </div>
          </div>
        ))}
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
