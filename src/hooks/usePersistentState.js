import { useState, useEffect } from 'react';

export default function usePersistentState(name, defaultValue) {
  const getValue = () => JSON.parse(localStorage.getItem(name)) || defaultValue;
  const setValue = (value) => localStorage.setItem(name, JSON.stringify(value));

  const [data, setData] = useState(getValue());

  useEffect(() => {
    setValue(data);
  }, [data]);

  return [data, setData];
}
