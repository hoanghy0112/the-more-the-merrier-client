import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ICON_ADD_IO } from '../../../assets/icons';
import ExpandBox from '../../../components/ExpandBox/ExpandBox';

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
        <ExpandBox>
          <p>New Tag</p>
        </ExpandBox>
      </div>
      <button type="button" className={styles.addButton}>
        {/* <img src={ICON_ADD} alt="add" /> */}
        <ICON_ADD_IO color="white" className={styles.icon} />
        <p>Add</p>
      </button>
    </div>
  );
}
