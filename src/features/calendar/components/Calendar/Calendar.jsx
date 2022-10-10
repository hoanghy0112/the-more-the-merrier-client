import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import Draggable from 'react-draggable';

import PropTypes from 'prop-types';

import DateItem from '../../../../components/DateItem/DateItem';
import TimelineItem from '../../../../components/TimelineItem/TimelineItem';
// import { ResizableBox, Resizable } from "re-resizable";

import TaskCard from '../../../../components/TaskCard/TaskCard';
import './Calendar.scss';

export default function Calendar({ startDate }) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [begin, setBegin] = useState([0, 0]);
  const [end, setEnd] = useState([0, 0]);
  // const [offset, setOffset] = useState([0, 0]);

  const [resizing, setResizing] = useState(false);

  const [, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [tasks, setTask] = useState([]);

  const taskRef = useRef(null);

  const gridSize = useRef(null);

  const offset = useRef(null);

  useEffect(() => {
    if (taskRef?.current) {
      gridSize.current =
        (taskRef.current.getBoundingClientRect().width - 120) / 7;
    }
  }, [taskRef]);

  useLayoutEffect(() => {
    setHeight(end[1] - begin[1]);
  }, [end]);

  function handleMouseMove(e) {
    if (taskRef?.current) {
      offset.current = [
        e.clientX - taskRef.current.getBoundingClientRect().left,
        e.clientY - taskRef.current.getBoundingClientRect().top,
      ];
    }
    if (isMouseDown) {
      setEnd([...offset.current]);
    }
  }

  function handleMouseDown() {
    setIsMouseDown(true);
    setBegin([
      parseInt((offset.current[0] - 100) / gridSize.current, 10) *
        gridSize.current +
        100,
      offset.current[1],
    ]);
    setEnd([...offset.current]);
  }

  function handleMouseUp() {
    setIsMouseDown(false);
    if (isMouseDown) {
      // setEnd([...offset.current]);
      setEnd([...begin]);
      setWidth(gridSize.current);
      setHeight(0);

      setTask((prev) => [
        ...prev,
        {
          top: begin[1],
          left: begin[0],
          height,
        },
      ]);
    }
  }

  return (
    <div className="calendar__container">
      <div className="weekdays">
        {Array(7)
          .fill('')
          .map((_, index) => {
            const date = new Date(startDate);
            date.setDate(date.getDate() + index);
            return <DateItem date={date} />;
          })}
      </div>
      <div className="timeline">
        {Array(24)
          .fill()
          .map((_, index) => (
            <TimelineItem time={index} />
          ))}
        <button
          type="button"
          className="task"
          ref={taskRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {gridSize?.current && (
            <div
              className="task-item"
              style={{ left: begin[0], top: begin[1] }}
            >
              <TaskCard
                defaultWidth={gridSize.current}
                defaultHeight={height}
              />
            </div>
          )}
          {tasks.map(({ top: top_, left: left_, height: _height }) => (
            <button
              type="button"
              className="task-item"
              // style={{ left: begin[0], top: begin[1] }}
              onMouseDown={(e) => e.stopPropagation()}
              onMouseMove={(e) => e.stopPropagation()}
              onMouseUp={(e) => e.stopPropagation()}
            >
              <Draggable
                grid={[gridSize.current, 5]}
                defaultPosition={{ x: left_, y: top_ }}
                disabled={resizing}
              >
                <div>
                  <TaskCard
                    defaultWidth={gridSize.current}
                    defaultHeight={_height}
                    onResizeStart={() => setResizing(true)}
                    onResizeStop={() => setResizing(false)}
                  />
                </div>
              </Draggable>
            </button>
          ))}
        </button>
      </div>
    </div>
  );
}

Calendar.propTypes = {
  startDate: PropTypes.instanceOf(Date),
};

Calendar.defaultProps = {
  startDate: new Date(),
};
