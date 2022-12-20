/* eslint-disable react/prop-types */
import React from 'react';
import CenteredModal from '../CenteredModal/CenteredModal';
import PrimaryButton from '../PrimaryButton/PrimaryButton';

import styles from './NotificationModal.module.scss';

export default function NotificationModal({
  isOpen,
  closeModal,
  title,
  content,
}) {
  return (
    <CenteredModal isOpen={isOpen} onClose={closeModal}>
      <div className={styles.container}>
        <h1>{title}</h1>
        <p>{content}</p>
        <PrimaryButton title="Cancel" onClick={closeModal} />
      </div>
    </CenteredModal>
  );
}
