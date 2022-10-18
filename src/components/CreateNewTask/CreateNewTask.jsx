/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import Modal from 'react-modal';
import { useDispatch } from 'react-redux';

import {
  ICON_ADD,
  ICON_ARROW_REDO,
  ICON_BOOKMARKS,
  ICON_LOCATE,
  ICON_MAIL,
  ICON_PEOPLE,
  ICON_TRASH,
} from '../../assets/icons';
import {
  changeTask,
  createNewTask,
} from '../../features/tasksManagement/TasksSlice';
import DateTimePicker from '../DateTimePicker/DateTimePicker';
import Tag from '../Tag/Tag';
import TagParticipant from '../TagParticipant/TagParticipant';
import TimeTag from '../TimeTag/TimeTag';
import styles from './CreateNewTask.module.scss';

Modal.setAppElement('#modal');

const CreateNewTask = React.forwardRef(({ data, onChange }, ref) => {
  const dispatch = useDispatch();

  const [id, setID] = useState(null);

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

  const [isAdd, setIsAdd] = useState(false);
  const [descriptionAdd, setDescriptionAdd] = useState('');

  useEffect(() => {
    if (!data._id) {
      console.log({ startTime });
      // dispatch(
      //   createNewTask({
      //     title: 'new task',
      //     time: {
      //       from: new Date(startTime).toISOString(),
      //       to: new Date(endTime).toISOString(),
      //     },
      //   }),
      // );
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (onChange) {
        onChange({
          title,
          time: {
            from: startTime.toISOString(),
            to: endTime.toISOString(),
          },
          location: position,
          participants,
          tags,
          descriptions: desSentence,
        });
      } else {
        dispatch(
          changeTask({
            _id: data._id,
            title,
            time: {
              from: startTime.toISOString(),
              to: endTime.toISOString(),
            },
            location: position,
            participants,
            tags,
            descriptions: desSentence,
          }),
        );
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [title, startTime, endTime, position, participants, tags, desSentence]);

  const handleAddDescription = () => {
    const str = descriptionAdd.replace(/\s/g, '');
    if (str !== '') {
      setDesSentence((current) => [...current, descriptionAdd.trim()]);
    }
    setDescriptionAdd('');
    setIsAdd(false);
  };

  return (
    <div ref={ref} className={styles.container}>
      <span className={styles.taskTitle}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          tabIndex="0"
          className={styles.input}
          placeholder="Task’s title..."
          spellCheck="false"
        />
      </span>
      <div className={styles.timeContainer}>
        <div className={styles.todoTime}>
          <TimeTag time={startTime} onChange={setStartTime} />
          -
          <TimeTag time={endTime} onChange={setEndTime} />
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
          <img src={ICON_LOCATE} alt="time" />
          <input
            className={styles.input}
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            style={{ overflowWrap: '-moz-initial' }}
            placeholder="Enter your task’s location here..."
            spellCheck="false"
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
          {desSentence.map((sentence, index) => (
            <div key={index} className={styles.descriptionItem}>
              <textarea
                className={styles.descriptionText}
                value={sentence}
                rows={sentence.split('\n').length}
                spellCheck="false"
                onChange={(e) => {
                  setDesSentence(
                    [...desSentence].map((object) => {
                      if (object === sentence) return e.target.value;
                      return object;
                    }),
                  );
                }}
                onBlur={(e) =>
                  setDesSentence(
                    [...desSentence].map((object) => {
                      if (object === sentence) return e.target.value.trim();
                      return object;
                    }),
                  )
                }
              />
            </div>
          ))}
          {isAdd ? (
            <div className={styles.descriptionItem}>
              <textarea
                className={styles.descriptionText}
                value={descriptionAdd}
                rows={descriptionAdd.split('\n').length}
                spellCheck="false"
                onChange={(e) => {
                  setDescriptionAdd(e.target.value);
                }}
                onBlur={handleAddDescription}
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
});

export default CreateNewTask;

CreateNewTask.propTypes = {
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

CreateNewTask.defaultProps = {};
