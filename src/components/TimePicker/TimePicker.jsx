/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

export default function MyTimePicker({ time, handleChangeTime }) {
  const [value, setValue] = useState(new Date(time));

  useEffect(() => {
    setValue(new Date(time));
  }, [new Date(time).getTime()]);

  return <div></div>;
}
