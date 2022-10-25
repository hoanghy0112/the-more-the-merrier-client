/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ICON_FOLDER,
  ICON_PENCIL,
  ICON_FULL_ARROW_DOWN,
  ICON_DEL,
} from '../../assets/icons';
import './TagDetail.scss';

const color = ['#1572A1', '#9AD0EC', '#EFDAD7', '#E3BEC6'];

export default function TagDetail({
  tagTitle,
  description,
  listTasks,
  onChange,
}) {
  const [viewTasks, setViewTasks] = useState(
    listTasks.length > 2 ? listTasks.slice(0, 2) : listTasks,
  );

  const [isEdit, setIsEdit] = useState(false);

  const [newTitle, setNewTitle] = useState(tagTitle);

  const [newDescription, setNewDescription] = useState(description);

  const handleChangeView = () => {
    if (viewTasks.length > 2) setViewTasks(listTasks.slice(0, 2));
    else setViewTasks(listTasks);
  };

  return (
    <div className="tag-detail-container">
      <div className="tag-detail-header">
        <div className="tag-name">
          {isEdit === false ? (
            tagTitle
          ) : (
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          )}
          <div className="tag-icon">
            <img src={ICON_FOLDER} alt="folder" />
          </div>
        </div>
        <div className="tag-icon" onClick={() => setIsEdit(!isEdit)}>
          <img src={ICON_PENCIL} alt="pencil" />
        </div>
      </div>
      <div className="tag-detail-description">
        {isEdit === false ? (
          description
        ) : (
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        )}
      </div>
      <div className="tag-detail-tasks">
        {viewTasks &&
          viewTasks.length > 0 &&
          viewTasks.map((task) => (
            <div
              key={task.id}
              className="task"
              style={{ background: color[task.priority - 1] }}
            >
              <div className="task-item">{task.text}</div>
              <div className="task-item">
                {`${task.start}-${task.end}`}
                {isEdit && (
                  <ICON_DEL style={{ marginLeft: '15px', cursor: 'pointer' }} />
                )}
              </div>
            </div>
          ))}
      </div>
      {listTasks.length > 2 && (
        <div className="full-tasks" onClick={handleChangeView}>
          <div className="tag-icon">
            <img src={ICON_FULL_ARROW_DOWN} alt="arrow down" />
          </div>
          <div className="full-tasks-btn">
            {viewTasks.length === 2 ? 'More tasks' : 'Fewer Tasks'}
          </div>
        </div>
      )}
    </div>
  );
}

TagDetail.propTypes = {
  tagTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  listTasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired,
      priority: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
