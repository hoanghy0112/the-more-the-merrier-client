/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import React from 'react';
import { ICON_FOLDER, ICON_TRASH } from '../../../../assets/icons';

import styles from './TagDetail.module.scss';

// const color = ['#1572A1', '#9AD0EC', '#EFDAD7', '#E3BEC6'];

export default function TagDetail({
  title,
  description,
  // listTasks,
  onDelete,
}) {
  // const [viewTasks, setViewTasks] = useState(
  //   listTasks.length > 2 ? listTasks.slice(0, 2) : listTasks,
  // );

  // const [isEdit, setIsEdit] = useState(false);

  // const [newTitle, setNewTitle] = useState(title || '');

  // const [newDescription, setNewDescription] = useState(description);

  // const handleChangeView = () => {
  //   if (viewTasks.length > 2) setViewTasks(listTasks.slice(0, 2));
  //   else setViewTasks(listTasks);
  // };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.tagName}>
          {/* {isEdit === false ? ( */}
          {title}
          {/* ) : ( */}
          {/* <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          )} */}
          <div className={styles.folderIcon}>
            <img src={ICON_FOLDER} alt="folder" />
          </div>
        </div>
      </div>
      <div className={styles.description}>
        {/* {isEdit === false ? ( */}
        {description || 'No description'}
        {/* // ) : (
        //   <textarea
        //     value={newDescription}
        //     onChange={(e) => setNewDescription(e.target.value)}
        //   />
        // )} */}
      </div>
      <div className={styles.delete} onClick={() => onDelete()}>
        <img src={ICON_TRASH} alt="pencil" />
        <p>Delete</p>
      </div>
      {/* <div className="tag-detail-tasks">
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
      )} */}
    </div>
  );
}

TagDetail.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  // listTasks: PropTypes.arrayOf( PropTypes.shape({
  //     id: PropTypes.number.isRequired,
  //     text: PropTypes.string.isRequired,
  //     start: PropTypes.string.isRequired,
  //     end: PropTypes.string.isRequired,
  //     priority: PropTypes.number.isRequired,
  //   }),
  // ).isRequired,
};

TagDetail.defaultProps = {
  onDelete: () => {},
};
