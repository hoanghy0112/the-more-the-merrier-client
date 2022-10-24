/* eslint-disable no-underscore-dangle */
import React from 'react';
import { useSelector } from 'react-redux';

import { ICON_ADD_IO } from '../../../../assets/icons';

import ExpandBox from '../../../../components/ExpandBox/ExpandBox';
import Tag from '../../../../components/Tag/Tag';

import { selectAllTags } from '../../TagsSlice';

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
          <div className={styles.tagGroup}>
            <Tag type="1" />
            <Tag type="2" />
            <Tag type="3" />
            <Tag type="4" />
          </div>
        </ExpandBox>
        <ExpandBox title="Status">
          <div className={styles.tagGroup}>
            <Tag type="pending" />
            <Tag type="completed" />
          </div>
        </ExpandBox>
        <ExpandBox title="Tags">
          <div className={styles.tagGroup}>
            {tagsList.map((tag) => (
              <div className={styles.tag}>
                <div style={{ '--color': tag.color }} />
                <p>{tag.title}</p>
              </div>
            ))}
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
