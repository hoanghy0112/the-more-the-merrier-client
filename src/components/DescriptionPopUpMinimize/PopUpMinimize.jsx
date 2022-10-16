/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import moment from 'moment/moment';
import PropTypes from 'prop-types';
import React from 'react';

import { useFullScreenHandle } from 'react-full-screen';

import {
  ICON_CLOCK,
  ICON_DROP_DOWN,
  ICON_MAIL,
  ICON_MORE_TASK,
  ICON_PENCIL,
  ICON_TRASH,
} from '../../assets/icons';
import TimeTag from '../TimeTag/TimeTag';
import styles from './PopUpMinimize.module.scss';

export default function DescriptionPopUpMinimize({ data, onChange, onExpand }) {
  const handle = useFullScreenHandle();

  console.log({ data });

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
      <div className={styles.moreTaskContainer} style={{ cursor: 'pointer' }}>
        <img src={ICON_MORE_TASK} alt="more task" />
        <p className={styles.text}>More task</p>
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
            className={styles.addDescription}
            style={{ cursor: 'pointer' }}
            onClick={handle.enter}
          >
            <img src={ICON_DROP_DOWN} alt="add" />
            <p className={styles.addText}>More information</p>
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
  onChange: PropTypes.func,
};

DescriptionPopUpMinimize.defaultProps = {
  onChange: () => {},
};
