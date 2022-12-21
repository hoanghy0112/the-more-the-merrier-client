/* eslint-disable react/prop-types */
import React, { useState, useCallback } from 'react';

import PropTypes from 'prop-types';

import styles from './PrimaryButton.module.scss';
import CenteredModal from '../CenteredModal/CenteredModal';

export default function PrimaryButton({
  title,
  backgroundColor,
  shadowColor,
  disabled,
  width,
  reversed,
  confirmed,
  confirmMesssage,
  onClick,
  style = {},
}) {
  const [isOpenConfirmedModal, setIsOpenConfirmedModal] = useState(false);

  const closeModal = useCallback(() => {
    setIsOpenConfirmedModal(false);
  }, []);

  function handleClick(e) {
    if (!confirmed) onClick?.call(e);
    else setIsOpenConfirmedModal(true);
  }

  function handleConfirm(e) {
    onClick?.call(e);
    closeModal();
  }

  return (
    <>
      <button
        type="button"
        onClick={!disabled && handleClick}
        style={{
          '--background-color': backgroundColor,
          '--shadow-color': shadowColor,
          width: width !== 0 ? width : '100%',
          ...style,
        }}
        className={`${styles.primaryButton} ${disabled && styles.disabled} ${
          reversed && styles.reversed
        }`}
      >
        {title}
      </button>
      <CenteredModal isOpen={isOpenConfirmedModal} onClose={closeModal}>
        <div className={styles.modal}>
          <p>{confirmMesssage}</p>
          <p className={styles.warning}>
            (By continue, you will not be able to reverse this process)
          </p>
          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={styles.yes}
              onClick={handleConfirm}
            >
              Yes
            </button>
            <button type="button" className={styles.no} onClick={closeModal}>
              No
            </button>
          </div>
        </div>
      </CenteredModal>
    </>
  );
}

PrimaryButton.propTypes = {
  title: PropTypes.string,
  backgroundColor: PropTypes.string,
  shadowColor: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  reversed: PropTypes.bool,
  confirmed: PropTypes.bool,
  confirmMesssage: PropTypes.string,
  width: PropTypes.number,
};

PrimaryButton.defaultProps = {
  title: 'None title',
  onClick: () => {},
  disabled: false,
  reversed: false,
  backgroundColor: '#00a6ca',
  shadowColor: 'rgb(58, 229, 206)',
  confirmed: false,
  confirmMesssage: 'Do you want to continue?',
  width: 0,
};
