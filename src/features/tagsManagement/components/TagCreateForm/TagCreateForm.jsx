/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import {
  ICON_BOOKMARKS,
  ICON_CHECKMARK,
  ICON_FULL_ARROW_RIGHT,
} from '../../../../assets/icons';

import {
  createNewTag,
  findAllTagsOfUser,
  selectCreateStatus,
} from '../../TagsSlice';
import styles from './TagCreateForm.module.scss';

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

  const createStatus = useSelector(selectCreateStatus);

  useEffect(() => {
    if (createStatus === 'succeeded') dispatch(findAllTagsOfUser());
  }, [createStatus]);

  function handleCreateNewTask() {
    if ((titleRef?.current, descriptionRef?.current)) {
      const newTag = {
        title: titleRef.current.textContent,
        description: descriptionRef.current.textContent,
        color: chosenColor,
      };
      onSendRequest(newTag);
      dispatch(createNewTag(newTag));
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
      <div className={styles.chooseColor}>
        <p>Choose your tag&apos;s color</p>
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
