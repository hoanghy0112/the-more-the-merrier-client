/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import moment from 'moment/moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Modal from 'react-modal';

import {
  ICON_CLOCK,
  ICON_MAIL,
  ICON_MORE_TASK,
  ICON_TRASH,
} from '../../assets/icons';
import CreateNewTask from '../CreateNewTask/CreateNewTask';
import TimeTag from '../TimeTag/TimeTag';
import styles from './PopUpMinimize.module.scss';

Modal.setAppElement('#modal');

export default function DescriptionPopUpMinimize({ data }) {
  console.log({ data });
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <span className={styles.taskTitle} style={{ cursor: 'default' }}>
        <div className={styles.title}>{data.title}</div>
        <div className={styles.todoTime}>
          <TimeTag time={new Date(data.time.from)} onChange={() => {}} />
          -
          <TimeTag time={new Date(data.time.to)} onChange={() => {}} />
        </div>
      </span>
      <div className={styles.sentencesContainer}>
        <div className={styles.desSentence}>
          <img src={ICON_CLOCK} alt="time" />
          <p className={styles.timeRemaining}>
            {`Còn lại ${moment(new Date(data.time.from)).diff(
              moment(new Date()),
              'minutes',
            )} phút`}
          </p>
        </div>
      </div>
      <div className={styles.descriptionContainer}>
        <div className={styles.detailDescription}>
          {data.descriptions.map((sentence) => (
            <div key={sentence} className={styles.descriptionItem}>
              <p
                className={styles.descriptionText}
                style={{ cursor: 'text', overflowWrap: 'anywhere' }}
              >
                {sentence}
              </p>
            </div>
          ))}
          <div
            className={styles.moreTaskContainer}
            style={{ cursor: 'pointer' }}
            onClick={() => setIsOpen(true)}
          >
            <img src={ICON_MORE_TASK} alt="more task" />
            <p className={styles.text}>Detailed information</p>
          </div>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <div className={styles.inviteParticipant} style={{ cursor: 'pointer' }}>
          <img src={ICON_MAIL} alt="invite" />
          <p className={styles.textInvite}>Invite participants</p>
        </div>
        <div className={styles.trashContainer} style={{ cursor: 'pointer' }}>
          <img src={ICON_TRASH} alt="trash" />
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
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
        <CreateNewTask data={data} />
      </Modal>
    </div>
  );
}

DescriptionPopUpMinimize.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    time: PropTypes.shape({
      from: PropTypes.instanceOf(Date),
      to: PropTypes.instanceOf(Date),
    }),
    position: PropTypes.string,
    participants: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        displayName: PropTypes.string,
      }),
    ),
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        displayName: PropTypes.string,
      }),
    ),
    descriptions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        text: PropTypes.string,
      }),
    ),
  }).isRequired,
};

DescriptionPopUpMinimize.defaultProps = {};
