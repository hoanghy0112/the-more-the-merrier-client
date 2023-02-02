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

  const [socket, setSocket] = useState<Socket>();
  const { data: busyTimes, isLoading } = useRealTimeData(
    onConnect,
    'busy-time-real-time',
  );

  function onConnect(socket: Socket) {
    socket.emit('get-busy', groupID, from, to);

    socket.on('busy', (data) => {
      console.log({ data });
      dispatch(updateListBusy(data));
    });

    socket.on('update-task', (task) => {
      console.log({ modifiedTask: task });
      dispatch(updateModifiedBusy(task));
    });

    socket.on('delete-task', (taskID) => {
      console.log({ deleteTask: taskID });
      dispatch(updateDeletedBusy(taskID));
    });

    setSocket(socket);
  }

  return {
    tasks: busyTimes,
    isLoading,
  };
}
