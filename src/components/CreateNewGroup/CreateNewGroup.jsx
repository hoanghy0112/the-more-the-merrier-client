import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { ICON_ADD, ICON_FULL_ARROW_RIGHT } from '../../assets/icons';
import styles from './CreateNewGroup.module.scss';

export default function CreateNewGroup({ data }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div className={styles.container}>
      <span className={styles.groupName}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          tabIndex="0"
          className={styles.input}
          placeholder="Group name"
          spellCheck="false"
        />
      </span>
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
        <p>Create</p>
        <img src={ICON_FULL_ARROW_RIGHT} alt="next" />
      </div>
    </div>
  );
}

CreateNewGroup.propTypes = {
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
