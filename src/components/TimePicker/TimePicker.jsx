/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import TimePicker from 'react-time-picker';

export default function MyTimePicker({ time, handleChangeTime }) {
  const [value, onChange] = useState(`${time.getHours()}:${time.getMinutes()}`);

  const setTime = (newTime) => {
    if (!newTime) return time;
    const hour = parseInt(newTime.substr(0, 2), 10);
    const minutes = parseInt(newTime.substr(newTime.length - 2, 2), 10);
    return new Date(
      time.getFullYear(),
      time.getMonth(),
      time.getDate(),
      hour,
      minutes,
    );
  };

  return (
    <TimePicker
      onChange={onChange}
      value={value}
      autoFocus
      onClockClose={() => handleChangeTime(setTime(value))}
    />
  );
}
