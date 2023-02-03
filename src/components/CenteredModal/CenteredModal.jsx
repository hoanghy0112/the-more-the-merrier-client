/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';

import Modal from 'react-modal';
import PropTypes from 'prop-types';

import styles from './CenteredModal.module.scss';

Modal.setAppElement('#modal');

export default function CenteredModal({ isOpen, onClose, children }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      style={{
        content: {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2000,
          backgroundColor: 'transparent',
          width: '0px',
          height: '0px',
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
      <div
        style={{ width: 0, height: 0 }}
        onMouseDown={(e) => e.stopPropagation()}
        onMouseUp={(e) => e.stopPropagation()}
        onMouseOver={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </Modal>
  );
}

CenteredModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

CenteredModal.defaultProps = {
  isOpen: false,
  onClose: () => {},
  children: '',
};
