import React, { useLayoutEffect, useState } from 'react';

import PropTypes from 'prop-types';
// import { Resizable } from 're-resizable';

import './TaskCard.scss';

export default function TaskCard({ defaultWidth, defaultHeight }) {
  const [width, setWidth] = useState(defaultWidth);
  const [height, setHeight] = useState(defaultHeight);

  useLayoutEffect(() => {
    setHeight(defaultHeight);
  }, [defaultHeight]);

  useLayoutEffect(() => {
    setWidth(defaultWidth);
  }, [defaultWidth]);

  return (
    <div style={{ width, height, padding: 3 }}>
      <div className="task-card__task-item" />
    </div>
  );
}

TaskCard.propTypes = {
  defaultWidth: PropTypes.number.isRequired,
  defaultHeight: PropTypes.number.isRequired,
};
