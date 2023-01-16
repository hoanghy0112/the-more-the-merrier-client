/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment/moment';

export default function TimeCard({
  className,
  gridSize,
  startDate,
  from,
  to,
  opacity,
}) {
  return (
    <div
      key={from + to}
      className={className}
      style={{
        top: `${
          (((new Date(from).getHours() * 60 + new Date(from).getMinutes()) %
            (24 * 60)) /
            (24 * 60)) *
          1200
        }px`,
        left: `${
          moment(new Date(from)).diff(new Date(startDate), 'days') * gridSize
        }px`,
        width: `${gridSize - 6}px`,
        height: `${
          (moment(new Date(to)).diff(new Date(from), 'hours', true) / 24) * 1200
        }px`,
        opacity,
      }}
    />
  );
}
