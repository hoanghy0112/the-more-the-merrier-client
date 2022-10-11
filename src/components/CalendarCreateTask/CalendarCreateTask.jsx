/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useLayoutEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';

import styles from './CalendarCreateTask.module.scss';

export default function CalendarCreateTask({ gridSize, addNewTask }) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [begin, setBegin] = useState([0, 0]);
  const [end, setEnd] = useState([0, 0]);

  const [height, setHeight] = useState(0);

  const offset = useRef(null);

  useLayoutEffect(() => {
    setHeight(end[1] - begin[1]);
  }, [end]);

  function handleMouseMove(e) {
    e.stopPropagation();
    const parentRect = e.target.parentElement.getBoundingClientRect();
    offset.current = [e.clientX - parentRect.left, e.clientY - parentRect.top];
    if (isMouseDown) {
      setEnd([...offset.current]);
    }
  }

  function handleMouseDown(e) {
    e.stopPropagation();
    setIsMouseDown(true);
    setBegin([
      parseInt(offset.current[0] / gridSize, 10) * gridSize,
      offset.current[1],
    ]);
    setEnd([...offset.current]);
  }

  function handleMouseUp(e) {
    e.stopPropagation();
    setIsMouseDown(false);
    if (isMouseDown) {
      setEnd([...begin]);
      setHeight(0);

      addNewTask((prev) => [
        ...prev,
        {
          title: '',
          id: '3',
          top: begin[1],
          column: begin[0] / gridSize,
          height,
        },
      ]);
    }
  }

  return (
    <div className={styles.container}>
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className={styles.relative}
      >
        {gridSize && isMouseDown && (
          <div
            style={{
              top: begin[1],
              left: begin[0],
              width: gridSize,
              height,
            }}
            className={styles.innerTask}
          >
            <div />
          </div>
        )}
      </div>
    </div>
  );
}

CalendarCreateTask.propTypes = {
  gridSize: PropTypes.number.isRequired,
  addNewTask: PropTypes.func.isRequired,
};

CalendarCreateTask.defaultProps = {};
