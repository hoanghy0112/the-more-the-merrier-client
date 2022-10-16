/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment/moment';
import {
  ICON_ADD,
  ICON_ARROW_REDO,
  ICON_BOOKMARKS,
  ICON_CLOCK,
  ICON_LOCATE,
  ICON_MAIL,
  ICON_PENCIL,
  ICON_PEOPLE,
  ICON_TRASH,
} from '../../assets/icons';
import DateTimePicker from '../DateTimePicker/DateTimePicker';
import Tag from '../Tag/Tag';
import TagParticipant from '../TagParticipant/TagParticipant';
import TimeTag from '../TimeTag/TimeTag';
import styles from './DesPopUp.module.scss';
import { useDispatch } from 'react-redux';
import { changeTask } from '../../features/tasksManagement/TasksSlice';

export default function DescriptionPopUp({ data, onChange, isMinimize }) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(data?.title || '');
  const [startTime, setStartTime] = useState(
    new Date(data?.time?.from) || new Date(),
  );
  const [endTime, setEndTime] = useState(
    new Date(data?.time?.to) || new Date(),
  );
  const [position, setPosition] = useState(data?.position || '');
  const [participants, setParticipants] = useState(data?.participants || []);
  const [tags] = useState(data?.tags || []);
  const [desSentence, setDesSentence] = useState(data?.descriptions || []);

  const [isEdit, setIsEdit] = useState(false);
  const [isEditDes, setIsEditDes] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [descriptionAdd, setDescriptionAdd] = useState('');

  const handleChangeStartTime = (time) => {
    setStartTime(time);
  };

  const handleChangeEndTime = (time) => {
    setEndTime(time);
  };

  console.log({ data });

  useEffect(() => {
    onChange({
      title,
      startTime,
      endTime,
      position,
      participants,
      tags,
      desSentence,
    });
    dispatch(
      changeTask({
        id: data._id,
        title,
        time: {
          from: startTime.toISOString(),
          to: endTime.toISOString(),
        },
        position,
        descriptions: desSentence,
      }),
    );
  }, [title, startTime, endTime, position, participants, tags, desSentence]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setIsEdit(false);
    }
  };

  const handleKeyPressInDes = (e) => {
    if (e.key === 'Enter') {
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
          { id: String(current.length), text: descriptionAdd },
        ]);
      }
      setDescriptionAdd('');
      setIsAdd(false);
    }
  };

  return (
    <div className={styles.container}>
      {isEdit ? (
        <span className={styles.taskTitle}>
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
        </span>
      ) : (
        <span className={styles.taskTitle} style={{ cursor: 'default' }}>
          {title}
          <img
            src={ICON_PENCIL}
            alt="Pencil"
            onClick={() => setIsEdit(true)}
            style={{ cursor: 'pointer' }}
          />
        </span>
      )}
      <div className={styles.timeContainer}>
        <div className={styles.todoTime}>
          <TimeTag time={startTime} onChange={handleChangeStartTime} />
          -
          <TimeTag time={endTime} onChange={handleChangeEndTime} />
        </div>
        <span className={styles.timePicker}>
          <DateTimePicker
            startDay={startTime}
            hanldeChangeStartDay={() => {}}
          />
        </span>
      </div>
      <div className={styles.sentencesContainer}>
        <div className={styles.desSentence}>
          <img src={ICON_CLOCK} alt="time" />
          <p className={styles.timeRemaining}>
            {startTime - new Date() > 0
              ? `Còn lại ${parseInt((startTime - new Date()) / 60000, 10)} phút`
              : new Date() < endTime
              ? 'Công việc này đang được diễn ra'
              : 'Công việc đã được hoàn thành'}
          </p>
        </div>
        <div className={styles.desSentence}>
          <img src={ICON_LOCATE} alt="time" />
          <input
            className={styles.timeRemaining}
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            style={{ overflowWrap: '-moz-initial' }}
          />
        </div>
        <div className={styles.desSentence_2}>
          <img src={ICON_PEOPLE} alt="people" />
          <div className={styles.list}>
            {participants.map((person, index) => (
              <TagParticipant
                key={person?.id}
                name={person?.displayName || 'No name'}
                onClose={() => {
                  setParticipants((prev) => [
                    ...prev.filter((value, _index) => index !== _index),
                  ]);
                }}
              />
            ))}
            <div className={styles.buttonRedo} style={{ cursor: 'pointer' }}>
              <img src={ICON_ARROW_REDO} alt="button" />
            </div>
          </div>
        </div>
        <div className={styles.desSentence_2}>
          <img src={ICON_BOOKMARKS} alt="time" />
          <div className={styles.list}>
            {tags.map((tag) => (
              <Tag
                key={tag.id}
                shape="rectangle"
                input={tag.displayName}
                type="tagTask"
              />
            ))}
            <div className={styles.buttonAdd} style={{ cursor: 'pointer' }}>
              <img src={ICON_ADD} alt="button" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.descriptionContainer}>
        <p className={styles.text}>Description</p>
        <div className={styles.detailDescription}>
          {desSentence.map((sentence) => (
            <div key={sentence} className={styles.descriptionItem}>
              {isEditDes ? (
                <textarea
                  className={styles.descriptionText}
                  value={sentence}
                  onChange={(e) => {
                    setDesSentence(
                      [...desSentence].map((object) => {
                        if (object === sentence) {
                          return e.target.value;
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
                  {sentence}
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

DescriptionPopUp.propTypes = {
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
  isMinimize: PropTypes.bool,
};

DescriptionPopUp.defaultProps = {
  onChange: () => {},
  isMinimize: true,
};
