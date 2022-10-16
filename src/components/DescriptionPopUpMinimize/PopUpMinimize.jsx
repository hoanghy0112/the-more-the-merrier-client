/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import {
  ICON_ADD,
  ICON_CLOCK,
  ICON_MAIL,
  ICON_PENCIL,
  ICON_TRASH,
} from '../../assets/icons';
import TagParticipant from '../TagParticipant/TagParticipant';
import TimeTag from '../TimeTag/TimeTag';
import styles from './PopUpMinimize.module.scss';
import moment from 'moment/moment';

export default function DescriptionPopUpMinimize({ data, onChange }) {
  //   console.log(data);
  const [title, setTitle] = useState(data?.title || '');
  const [desSentence, setDesSentence] = useState(data?.descriptions || []);
  const [startTime, setStartTime] = useState(data?.time?.from || new Date());
  const [endTime, setEndTime] = useState(data?.time?.to || new Date());
  const [position, setPosition] = useState(data?.position || '');

  const [isEdit, setIsEdit] = useState(false);
  const [isEditDes, setIsEditDes] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [descriptionAdd, setDescriptionAdd] = useState('');

  useEffect(() => {
    onChange({
      title,
      startTime,
      endTime,
      position,
    });
  }, [title, startTime, endTime, position]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setIsEdit(false);
    }
  };

  const handleKeyPressInDes = (e) => {
    if (e.key === 'Enter') {
      // eslint-disable-next-line no-shadow
      setDesSentence((current) =>
        current.filter((sentence) => {
          const str = sentence.text.replace(/\s/g, '');
          return str !== '';
        }),
      );
      setIsEditDes(false);
    }
  };

  const handleKeyPressAdd = (e) => {
    if (e.key === 'Enter') {
      const str = descriptionAdd.replace(/\s/g, '');
      if (str !== '') {
        setDesSentence((current) => [
          ...current,
          { id: uuidv4(), text: descriptionAdd },
        ]);
      }
      setDescriptionAdd('');
      setIsAdd(false);
    }
  };

  return (
    <div className={styles.container}>
      {isEdit ? (
        <div className={styles.taskTitle}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyPress}
            tabIndex="0"
          />
          <img
            src={ICON_PENCIL}
            alt="Pencil"
            onClick={() => setIsEdit(false)}
            style={{ cursor: 'pointer' }}
          />
        </div>
      ) : (
        <span className={styles.taskTitle} style={{ cursor: 'default' }}>
          <div className={styles.title}>
            {title}
            <img
              src={ICON_PENCIL}
              alt="Pencil"
              onClick={() => setIsEdit(true)}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <div className={styles.todoTime}>
            <TimeTag time={startTime} onChange={setStartTime} />
            -
            <TimeTag time={endTime} onChange={setEndTime} />
          </div>
        </span>
      )}
      <div className={styles.sentencesContainer}>
        <div className={styles.desSentence}>
          <img src={ICON_CLOCK} alt="time" />
          <p className={styles.timeRemaining}>
            {`Còn lại ${
              moment(endTime).diff(moment(), 'minutes') -
              moment(new Date()).diff(moment(), 'minutes')
            } phút`}
          </p>
        </div>
      </div>
      <div className={styles.descriptionContainer}>
        <div className={styles.detailDescription}>
          {desSentence.map((sentence) => (
            <div key={sentence.id} className={styles.descriptionItem}>
              {isEditDes ? (
                <textarea
                  className={styles.descriptionText}
                  value={sentence.text}
                  onChange={(e) => {
                    setDesSentence(
                      [...desSentence].map((object) => {
                        if (object.id === sentence.id) {
                          return {
                            ...object,
                            text: e.target.value,
                          };
                        }
                        return object;
                      }),
                    );
                  }}
                  onKeyDown={handleKeyPressInDes}
                />
              ) : (
                <p
                  className={styles.descriptionText}
                  onClick={() => setIsEditDes(true)}
                  style={{ cursor: 'text', overflowWrap: 'anywhere' }}
                >
                  {sentence.text}
                </p>
              )}
            </div>
          ))}
          {isAdd ? (
            <div className={styles.descriptionItem}>
              <textarea
                className={styles.descriptionText}
                value={descriptionAdd}
                onChange={(e) => {
                  setDescriptionAdd(e.target.value);
                }}
                onKeyDown={handleKeyPressAdd}
              />
            </div>
          ) : (
            <div
              className={styles.addDescription}
              style={{ cursor: 'pointer' }}
              onClick={() => setIsAdd(true)}
            >
              <img src={ICON_ADD} alt="add" />
              <p className={styles.addText}>Add description</p>
            </div>
          )}
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
