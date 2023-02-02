import { useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import useRealTimeData from '../../../hooks/useRealTimeData';
import { useDispatch } from 'react-redux';
import {
  updateAddedBusy,
  updateDeletedBusy,
  updateListBusy,
  updateModifiedBusy,
} from '../groupSlice';

export default function useGroupBusyTime(groupID, from, to) {
  const dispatch = useDispatch();

  const { data: busyTimes, isLoading } = useRealTimeData(
    onConnect,
    'busy-time-real-time',
  );

  function onConnect(socket: Socket) {
    socket.emit('get-busy', groupID, from, to);

    socket.on('busy', (data) => {
      dispatch(updateListBusy(data));
    });

    socket.on('update-task', (task) => {
      dispatch(updateModifiedBusy(task));
    });

    socket.on('delete-task', (taskID) => {
      dispatch(updateDeletedBusy(taskID));
    });
  }

  return {
    tasks: busyTimes,
    isLoading,
  };
}
