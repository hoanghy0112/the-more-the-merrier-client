/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Modal from 'react-modal';

import { ICON_ADD_IO } from '../../../../assets/icons';

import ExpandBox from '../../../../components/ExpandBox/ExpandBox';
import Tag from '../../../../components/Tag/Tag';

import { selectAllTags } from '../../TagsSlice';

import TagCreateForm from '../TagCreateForm/TagCreateForm';
import styles from './TagsBar.module.scss';

Modal.setAppElement('#modal');

export default function TagsBar() {
  const [isOpenModal, setIsOpenModal] = useState(false);

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
      <button
        type="button"
        onClick={() => setIsOpenModal(true)}
        className={styles.addButton}
      >
        <ICON_ADD_IO color="white" className={styles.icon} />
        <p>Add</p>
      </button>
      {isOpenModal && (
        <Modal
          isOpen={isOpenModal}
          onRequestClose={() => setIsOpenModal(false)}
          style={{
            content: {
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 2000,
              backgroundColor: 'transparent',
              width: '370px',
              height: '60px',
              display: 'grid',
              placeItems: 'center',
              padding: 10,
              overflow: 'visible',
              cursor: 'default',
              border: 'none',
            },
            overlay: {
              zIndex: 200,
              backgroundColor: '#0000004f',
            },
          }}
        >
          <TagCreateForm />
        </Modal>
      )}
    </div>
  );
}
