import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ICON_ADD_IO } from '../../../assets/icons';

import Tag from '../../../components/Tag/Tag';
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
        <ExpandBox title="Priority">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <p>Coming soon</p>
            <p>Coming soon</p>
            <p>Coming soon</p>
            <p>Coming soon</p>
          </div>
        </ExpandBox>
        <ExpandBox title="Status">
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <p>Coming soon</p>
            <p>Coming soon</p>
          </div>
        </ExpandBox>
      </div>
      <button type="button" className={styles.addButton}>
        <ICON_ADD_IO color="white" className={styles.icon} />
        <p>Add</p>
      </button>
    </div>
  );
}
