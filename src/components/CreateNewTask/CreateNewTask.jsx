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

import TagChoosing from '../../features/tagsManagement/components/TagChoosing/TagChoosing';

import {
  ICON_ADD,
  ICON_BOOKMARKS,
  ICON_CHART,
  ICON_FULL_ARROW_RIGHT,
  ICON_LOCATE,
  ICON_MAIL,
  ICON_TRASH,
} from '../../assets/icons';
import { findTagByID } from '../../features/tagsManagement/tagAPI';
import {
  changeTask,
  deleteTask,
} from '../../features/tasksManagement/TasksSlice';
import DateTimePicker from '../DateTimePicker/DateTimePicker';
import Tag from '../Tag/Tag';
import TimeTag from '../TimeTag/TimeTag';
import styles from './CreateNewTask.module.scss';
import EditTag from '../Tag/EditTag/EditTag';

Modal.setAppElement('#modal');

const CreateNewTask = React.forwardRef(
  ({ data, onChange, onCreateNewTask }, ref) => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState(data?.title || '');
    const [startTime, setStartTime] = useState(
      new Date(data?.time?.from) || new Date(),
    );
    const [endTime, setEndTime] = useState(
      new Date(data?.time?.to) || new Date(),
    );
    const [position, setPosition] = useState(data?.position || '');
    const [priority, setPriority] = useState(data?.priority || 3);
    const [participants] = useState(data?.participants || []);

    const [tags, setTags] = useState(data?.tags || []);
    const [populatedTags, setPopulatedTags] = useState([]);

    const [desSentence, setDesSentence] = useState(data?.descriptions || []);

    const [isAdd, setIsAdd] = useState(false);
    const [descriptionAdd, setDescriptionAdd] = useState('');

    const [isAddTag, setIsAddTag] = useState(false);
    const [isChoosePriority, setIsChoosePriority] = useState(false);

    useEffect(() => {
      async function fetchTagsData() {
        setPopulatedTags(
          await Promise.all(
            tags.map(async (tagID) => {
              const tagInfo = await findTagByID(tagID);
              return tagInfo;
            }),
          ),
        );
      }

      fetchTagsData();
    }, [tags]);

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
            priority,
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
              priority,
              participants,
              tags,
              descriptions: desSentence,
            }),
          );
        }
      }, 500);

      return () => clearTimeout(timeout);
    }, [
      title,
      startTime,
      endTime,
      position,
      priority,
      participants,
      tags,
      desSentence,
    ]);

    function handleCreateNewTask() {
      onCreateNewTask();
    }

    function handleDelete() {
      dispatch(deleteTask(data));
    }

    function handleAddTag(tagID) {
      setTags((prev) => [...prev, tagID]);
    }

    const handleAddDescription = () => {
      const str = descriptionAdd.replace(/\s/g, '');
      if (str !== '') {
        setDesSentence((current) => [...current, descriptionAdd.trim()]);
      }
      setDescriptionAdd('');
      setIsAdd(false);
    };

    function getTagStyle(priorityNum) {
      switch (priorityNum) {
        case 1:
          return ["Can't be ignored", '#1572A1', 'white'];
        case 2:
          return ['Important', '#9AD0EC', 'black'];
        case 3:
          return ['Normal', '#EFDAD7', 'black'];
        case 4:
          return ['Can be ignored', '#E3BEC6', 'black'];

        default:
          return ['Normal', '#EFDAD7', 'black'];
      }
    }

    const [priorityText, priorityBackgroundColor, priorityColor] =
      getTagStyle(priority);

    return (
      <div
        onClick={() => {
          setIsAddTag(false);
          setIsChoosePriority(false);
        }}
        ref={ref}
        className={styles.container}
      >
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
            <img src={ICON_CHART} alt="priority" />
            <div className={styles.priorityDropDown}>
              <div
                className={styles.priorityHeader}
                style={{
                  '--background-color': priorityBackgroundColor,
                  '--color': priorityColor,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsChoosePriority(true);
                }}
              >
                <p>{priorityText}</p>
              </div>
              {isChoosePriority && (
                <div className={styles.choosingBox}>
                  {Array(4)
                    .fill('')
                    .map((_, index) => (
                      <div
                        className={styles.tagItem}
                        style={{
                          '--background-color': getTagStyle(index + 1)[1],
                          '--color': getTagStyle(index + 1)[2],
                        }}
                        onClick={() => setPriority(index + 1)}
                      >
                        <p>{getTagStyle(index + 1)[0]}</p>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
          <div className={styles.desSentence_2}>
            <img src={ICON_BOOKMARKS} alt="time" />
            <div className={styles.list}>
              {populatedTags.map((tag) => (
                <EditTag
                  key={tag._id}
                  name={tag.title}
                  onClose={() => {
                    setTags((prev) =>
                      prev.filter((currentTag) => currentTag !== tag._id),
                    );
                  }}
                />
              ))}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAddTag(true);
                }}
                className={styles.buttonAdd}
                style={{ cursor: 'pointer' }}
              >
                <img src={ICON_ADD} alt="button" />
              </div>
            </div>
            {isAddTag && (
              <TagChoosing setTag={(tagID) => handleAddTag(tagID)} />
            )}
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
          <div
            className={styles.inviteParticipant}
            style={{ cursor: 'pointer' }}
          >
            <img src={ICON_MAIL} alt="invite" />
            <p className={styles.textInvite}>Invite participants</p>
          </div>
          <div
            onClick={handleDelete}
            className={styles.trashContainer}
            style={{ cursor: 'pointer' }}
          >
            <img src={ICON_TRASH} alt="trash" />
          </div>
        </div>
        {data._id ? (
          ''
        ) : (
          <div className={styles.createButton} onClick={handleCreateNewTask}>
            <p>Create</p>
            <img src={ICON_FULL_ARROW_RIGHT} alt="next" />
          </div>
        )}
      </div>
    );
  },
);

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
