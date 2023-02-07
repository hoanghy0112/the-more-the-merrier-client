import { useEffect, useRef, useState } from 'react';
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
  const [socket, setSocket] = useState<Socket>();
  const dispatch = useDispatch();

  const { data: busyTimes, isLoading } = useRealTimeData(
    onConnect,
    'busy-time-real-time',
  );

  useEffect(() => {
    if (groupID && from && to && socket) {
      socket.emit('get-busy', groupID, from, to);
    }
  }, [groupID, new Date(from).getTime(), new Date(to).getTime()]);

  function onConnect(socket: Socket) {
    if (groupID && from && to) socket.emit('get-busy', groupID, from, to);

    socket.on('busy', (data) => {
      console.log('update list');
      dispatch(updateListBusy(data));
    });

    socket.on('update-task', (task) => {
      dispatch(updateModifiedBusy(task));
    });

    socket.on('delete-task', (taskID) => {
      dispatch(updateDeletedBusy(taskID));
    });

    socket.on('new-user', () => {
      socket.emit('get-busy', groupID, from, to);
    });
    setSocket(socket);
  }

  return {
    tasks: busyTimes,
    isLoading,
  };
}
