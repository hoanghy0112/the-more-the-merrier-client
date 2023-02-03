/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState } from 'react';

import { ICON_CLOSE, ICON_TICK, ICON_TRASH } from '../../assets/icons';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import styles from './DescriptionLine.module.scss';

export default function DescriptionLine({
  sentence,
  changeDescription,
  deleteDescription,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [newSentence, setNewSentence] = useState(sentence);

  const inputRef = useRef();

  useEffect(() => {
    if (!isEdit) {
      setNewSentence(sentence);
      // if (newSentence.trim() === '') deleteDescription();
    }
    if (sentence === '') {
      inputRef?.current.focus();
      setIsEdit(true);
    }
  }, [isEdit]);

  return (
    <>
      <div className={styles.descriptionItem}>
        <textarea
          ref={inputRef}
          className={styles.descriptionText}
          value={newSentence}
          rows={newSentence.split('\n').length}
          spellCheck="false"
          onChange={(e) => {
            setNewSentence(e.target.value);
          }}
          onClick={() => setIsEdit(true)}
        />
      </div>
      {isEdit ? (
        <div className={styles.descriptionButton}>
          <PrimaryButton
            reversed
            onClick={() => {
              changeDescription(newSentence.trim());
              setIsEdit(false);
            }}
            style={{ height: 45, padding: 5 }}
          >
            <div className={styles.ok}>
              <ICON_TICK size={25} style={{ color: '#00a6ca' }} />
              <p>OK</p>
            </div>
          </PrimaryButton>
          <PrimaryButton
            reversed
            width="max-content"
            onClick={() => {
              if (sentence.trim() === '') deleteDescription();
              setIsEdit(false);
            }}
            backgroundColor="rgb(230, 0, 0)"
            shadowColor="rgb(255, 183, 0)"
            style={{ height: 45, padding: '10px 15px' }}
          >
            <div className={styles.delete}>
              <ICON_CLOSE size={25} style={{ color: 'rgb(230, 0, 0)' }} />
              <p>Cancel</p>
            </div>
          </PrimaryButton>
          <PrimaryButton
            width="max-content"
            onClick={() => deleteDescription()}
            backgroundColor="rgb(230, 0, 0)"
            shadowColor="rgb(255, 183, 0)"
            style={{ height: 45, padding: '10px 15px' }}
          >
            <div className={styles.delete}>
              <img src={ICON_TRASH} alt="ok" />
              <p>Delete</p>
            </div>
          </PrimaryButton>
        </div>
      ) : null}
    </>
  );
}
