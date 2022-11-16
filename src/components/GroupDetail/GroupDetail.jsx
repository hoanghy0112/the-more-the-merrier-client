/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  ICON_ADD,
  ICON_FULL_ARROW_DOWN,
  ICON_FULL_ARROW_RIGHT,
  ICON_PENCIL,
} from '../../assets/icons';
import styles from './GroupDetail.module.scss';

export default function GroupDetail({ data }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setIsEdit(false);
    }
  };

  return (
    <div className={styles.container}>
      {isEdit ? (
        <span className={styles.groupName}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyPress}
            tabIndex="0"
          />
          <img
            src={ICON_PENCIL}
            alt="Pencil"
            onClick={() => setIsEdit(false)}
            style={{ cursor: 'pointer' }}
          />
        </span>
      ) : (
        <span className={styles.groupName} style={{ cursor: 'default' }}>
          <p className={styles.name}>{name}</p>
          <img
            src={ICON_PENCIL}
            alt="Pencil"
            onClick={() => setIsEdit(true)}
            style={{ cursor: 'pointer' }}
          />
        </span>
      )}
      <span className={styles.groupDescription}>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          tabIndex="0"
          className={styles.input}
          placeholder="Write your group’s description here..."
          spellCheck="false"
        />
      </span>
      <div className={styles.addUser} style={{ cursor: 'pointer' }}>
        <img src={ICON_ADD} alt="add" />
        <p className={styles.addText}>Add user</p>
      </div>
      <div className={styles.createButton}>
        <img src={ICON_FULL_ARROW_DOWN} alt="next" />
        <p>More users</p>
      </div>
    </div>
  );
}

GroupDetail.propTypes = {
  data: PropTypes.shape({
    groupName: PropTypes.string,
    description: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        text: PropTypes.string,
      }),
    ),
    users: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.number,
      }),
    ),
  }).isRequired,
};
