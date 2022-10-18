import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { findAllTagsOfUser, selectAllTags } from '../TagsSlice';

import styles from './TagsBar.module.scss';

export default function TagsBar() {
  const tagsList = useSelector(selectAllTags);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>Tags</p>
        <div />
      </div>
      <div className={styles.tagsBox}>
        <div></div>
      </div>
      <div className={styles.addButton}>
        <button type="button">Add</button>
      </div>
    </div>
  );
}
