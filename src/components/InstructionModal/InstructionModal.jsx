/* eslint-disable indent */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import styles from './InstructionModal.module.scss';
import CenteredModal from '../CenteredModal/CenteredModal';

export default function InstructionModal({ isGroup = false }) {
  const groupColors = isGroup
    ? [
        { color: '#1572A1', title: "Can't be ignored task" },
        { color: '#9AD0EC', title: 'Important task' },
        { color: '#EFDAD7', title: 'Normal task' },
        { color: '#E3BEC6', title: 'Can be ignored task' },
        { color: '#f9b122', title: "Busy time of group's participants" },
      ]
    : [
        { color: '#1572A1', title: "Can't be ignored task" },
        { color: '#9AD0EC', title: 'Important task' },
        { color: '#EFDAD7', title: 'Normal task' },
        { color: '#E3BEC6', title: 'Can be ignored task' },
        { color: 'white', title: 'Group task which is not replied by you' },
        {
          color: 'rgba(0, 41, 244, 0.498)',
          title: 'Group task which is created by you',
        },
        {
          color: 'rgba(157, 193, 252, 0.584)',
          title: 'You have already approved to join these task',
        },
        {
          color: 'rgba(0, 255, 30, 0.357)',
          title: 'Your request of group task has been approved',
        },
        {
          color: 'rgba(254, 39, 39, 0.357)',
          title: 'Your request of group task has been declined',
        },
      ];

  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <button
        className={styles.button}
        type="button"
        onClick={() => setIsOpenModal(true)}
      >
        Instruction
      </button>
      <CenteredModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <div className={styles.container}>
          <h2>Color explanation</h2>
          <div className={styles.colorTable}>
            {groupColors.map(({ color, title }) => (
              <div className={styles.color}>
                {color !== '#f9b122' ? (
                  <div
                    style={{
                      backgroundColor: color,
                      border: color === 'white' ? '1px solid black' : 'none',
                    }}
                  />
                ) : (
                  <div className={styles.busys}>
                    {[0.2, 0.4, 0.6, 0.8].map((opacity) => (
                      <div className={styles.busy} style={{ opacity }} />
                    ))}
                  </div>
                )}
                <p>{title}</p>
              </div>
            ))}
          </div>
        </div>
      </CenteredModal>
    </>
  );
}
