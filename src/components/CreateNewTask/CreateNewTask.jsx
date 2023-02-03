/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable function-paren-newline */
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
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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

import { useGroupInformationByIDQuery } from '../../features/groupsManagement/groupAPI';
import { deleteTaskOfGroup } from '../../features/groupsManagement/groupSlice';
import { selectTagsWithIDs } from '../../features/tagsManagement/TagsSlice';
import { deleteTask } from '../../features/tasksManagement/TasksSlice';
import DateTimePicker from '../DateTimePicker/DateTimePicker';
import DescriptionLine from '../DescriptionLine/DescriptionLine';
import InviteUserModal from '../InviteUserModal/InviteUserModal';
import ImportedTag from '../Tag/ImportedTag/ImportedTag';
import TimeTag from '../TimeTag/TimeTag';
import styles from './CreateNewTask.module.scss';

Modal.setAppElement('#modal');

export default function CreateNewTask({
  data,
  onChange,
  onCreateNewTask,
  isGroup,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState(data?.title || '');
  const [startTime, setStartTime] = useState(
    new Date(data?.time?.from) || new Date(),
  );
  const [endTime, setEndTime] = useState(
    new Date(data?.time?.to) || new Date(),
  );
  const [position, setPosition] = useState(data?.location || '');
  const [priority, setPriority] = useState(data?.priority || 3);
  const [participants, setParticipants] = useState(
    new Set(data?.participants || []),
  );

  const [tags, setTags] = useState(data?.tags || []);

  const [desSentence, setDesSentence] = useState(
    (data?.descriptions?.filter((des) => des !== '') || []).map(
      (description, index) => ({
        id: index,
        sentence: description,
      }),
    ),
  );

  const [isAdd, setIsAdd] = useState(false);

  const [isAddTag, setIsAddTag] = useState(false);
  const [isChoosePriority, setIsChoosePriority] = useState(false);

  const populatedTags = useSelector(selectTagsWithIDs(tags));

  const { data: groupInformation } = useGroupInformationByIDQuery(
    data?.belongTo,
  );

  const isEditable = data.belongTo && !isGroup;

  function handleCreateNewTask() {
    const newData = {
      title,
      time: {
        from: new Date(startTime).toISOString(),
        to: new Date(endTime).toISOString(),
      },
      location: position,
      priority,
      participants: [...participants],
      tags,
      descriptions: desSentence.map(({ sentence }) => sentence),
    };

    if (data._id) {
      onChange({
        _id: data._id,
        ...newData,
      });
    } else onCreateNewTask(newData);
  }

  useEffect(() => {
    if (data.time.from) setStartTime(data.time.from);
    if (data.time.to) setEndTime(data.time.to);
  }, [data.time.from, data.time.to]);

  function handleDelete() {
    if (isGroup) dispatch(deleteTaskOfGroup(data));
    else dispatch(deleteTask(data));
  }

  function handleAddTag(tagID) {
    setTags((prev) => [...prev, tagID]);
  }

  const handleChangeDescription = (id) => (newSentence) => {
    setDesSentence((prev) => [
      ...prev.filter(({ id: desId }) => desId !== id),
      { id, sentence: newSentence },
    ]);
    setIsAdd(false);
  };

  const handleDeleteDescription = (id) => () => {
    setDesSentence((prev) => [...prev.filter(({ id: desId }) => desId !== id)]);
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
          disabled={isEditable}
        />
        {data.belongTo && !isGroup ? (
          <p>
            <span>Task of </span>
            <span onClick={() => navigate(`/home/group/${data.belongTo}`)}>
              {groupInformation?.name}
            </span>
          </p>
        ) : null}
      </span>
      <div className={styles.timeContainer}>
        <div className={styles.todoTime}>
          <TimeTag
            time={startTime}
            onChange={setStartTime}
            disabled={isEditable}
          />
          -
          <TimeTag time={endTime} onChange={setEndTime} disabled={isEditable} />
        </div>
        <span className={styles.timePicker}>
          <DateTimePicker
            startDay={startTime}
            hanldeChangeStartDay={() => {}}
            disabled={isEditable}
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
            placeholder={
              isEditable ? 'No data' : 'Enter your task’s location here...'
            }
            spellCheck="false"
            disabled={isEditable}
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
                if (!isEditable) setIsChoosePriority(true);
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
        {isEditable || (
          <div className={styles.desSentence_2}>
            <img src={ICON_BOOKMARKS} alt="time" />
            <div className={styles.list}>
              {populatedTags.map((tag) => (
                <ImportedTag
                  key={tag._id}
                  name={tag.title}
                  color={tag.color}
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
                  if (!isEditable) setIsAddTag(true);
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
        )}
        {isGroup && (
          <InviteUserModal
            time={{ from: startTime, to: endTime }}
            participants={participants}
            setParticipants={setParticipants}
          />
        )}
      </div>
      <div className={styles.descriptionContainer}>
        <p className={styles.text}>Description</p>
        <div className={styles.detailDescription}>
          {desSentence.map(({ sentence, id }) => (
            <DescriptionLine
              key={id}
              sentence={sentence}
              changeDescription={handleChangeDescription(id)}
              deleteDescription={handleDeleteDescription(id)}
            />
          ))}
          {isAdd ? (
            <DescriptionLine
              sentence=""
              changeDescription={handleChangeDescription(desSentence.length)}
              deleteDescription={handleDeleteDescription(desSentence.length)}
            />
          ) : (
            <>
              {isEditable ? null : (
                <div
                  className={styles.addDescription}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setIsAdd(true)}
                >
                  <img src={ICON_ADD} alt="add" />
                  <p className={styles.addText}>Add description</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <div className={styles.inviteParticipant} style={{ cursor: 'pointer' }}>
          <img src={ICON_MAIL} alt="invite" />
          <p className={styles.textInvite}>Invite participants</p>
        </div>
        {isEditable ? (
          ''
        ) : (
          <div
            onClick={handleDelete}
            className={styles.trashContainer}
            style={{ cursor: 'pointer' }}
          >
            <img src={ICON_TRASH} alt="trash" />
          </div>
        )}
      </div>
      {isGroup || !data.belongTo ? (
        <div className={styles.createButton} onClick={handleCreateNewTask}>
          <p>{data._id ? 'Update' : 'Create'}</p>
          <img src={ICON_FULL_ARROW_RIGHT} alt="next" />
        </div>
      ) : null}
    </div>
  );
}

CreateNewTask.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    time: PropTypes.shape({
      from: PropTypes.oneOfType(PropTypes.instanceOf(Date), PropTypes.string),
      to: PropTypes.oneOfType(PropTypes.instanceOf(Date), PropTypes.string),
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
  }),
  isGroup: PropTypes.bool,
};

CreateNewTask.defaultProps = {
  isGroup: false,
  data: {},
};
