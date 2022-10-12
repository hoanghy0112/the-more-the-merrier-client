import React from 'react';

import Draggable from 'react-draggable';

import PropTypes from 'prop-types';

import styles from './TaskCard.module.scss';

export default function TaskCard({ top, width, height, column, onDragStop }) {
  return (
    <Draggable
      onMouseDown={(e) => e.stopPropagation()}
      onMouseMove={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
      bounds="parent"
      grid={[width, 5]}
      position={{ x: column * width, y: top }}
      onStop={onDragStop}
    >
      <div className={styles.drag} style={{ width, height }}>
        <div className={styles.task}>
          <div className={styles.taskContent}>
            <p>New Task</p>
          </div>
        </div>
      </div>
    </Draggable>
  );
}

TaskCard.propTypes = {
  top: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
  onDragStop: PropTypes.func.isRequired,
};
