/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useLayoutEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';

import Modal from 'react-modal';

import styles from './CalendarCreateTask.module.scss';
import CreateNewTask from '../CreateNewTask/CreateNewTask';

Modal.setAppElement('#modal');

export default function CalendarCreateTask({
  gridSize,
  taskWrapperRect,
  startDate,
  addNewTask,
}) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isCreateNewTask, setIsCreateNewTask] = useState(false);
  const [data, setData] = useState({});

  const [begin, setBegin] = useState([0, 0]);
  const [end, setEnd] = useState([0, 0]);

  const [height, setHeight] = useState(0);

  const offset = useRef(null);
  const modalRef = useRef(null);

  useLayoutEffect(() => {
    setHeight(Math.abs(end[1] - begin[1]));
  }, [end]);

  function handleMouseMove(e) {
    e.stopPropagation();
    const parentRect = taskWrapperRect;
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

      const top = end[1] > begin[1] ? begin[1] : end[1];
      const deltaDay = (top[0] / gridSize) * 24 * 60 * 60 * 1000;
      const deltaMinutes = (top[1] / 1200) * 24 * 60 * 60 * 1000;

      const newFrom = new Date(
        parseInt(new Date(startDate).getTime() / 86400000, 10) * 86400000 +
          deltaDay +
          deltaMinutes,
      );

      setIsCreateNewTask(true);

      setData({
        time: {
          from: newFrom,
          to: new Date(
            newFrom.getTime() + (height / 1200) * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
      });

      // addNewTask({
      //   time: {
      //     from: newFrom,
      //     to: new Date(
      //       newFrom.getTime() + (height / 1200) * 24 * 60 * 60 * 1000,
      //     ).toISOString(),
      //   },
      // });
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
              top: end[1] > begin[1] ? begin[1] : end[1],
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
      <Modal
        isOpen={isCreateNewTask}
        onRequestClose={() => setIsCreateNewTask(false)}
        style={{
          content: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2000,
            backgroundColor: 'transparent',
            // backgroundColor: 'red',
            width: '350px',
            height: '60px',
            display: 'grid',
            placeItems: 'center',
            padding: 10,
            overflow: 'visible',
            cursor: 'default',
            border: 'none',
          },
          overlay: {
            zIndex: 200,
            backgroundColor: '#0000004f',
          },
        }}
      >
        <CreateNewTask data={data} onChange={() => {}} />
      </Modal>
    </div>
  );
}

CalendarCreateTask.propTypes = {
  gridSize: PropTypes.number.isRequired,
  taskWrapperRect: PropTypes.objectOf(
    PropTypes.shape({
      top: PropTypes.number.isRequired,
      left: PropTypes.number.isRequired,
    }),
  ).isRequired,
  addNewTask: PropTypes.func.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
};

CalendarCreateTask.defaultProps = {};
