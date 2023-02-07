import { useDispatch } from 'react-redux';
import { Socket } from 'socket.io-client';
import useRealTimeData from '../../../hooks/useRealTimeData';
import {
  updateDeletedGroupTask,
  updateListBusy,
  updateListGroupTask,
  updateModifiedGroupTask,
} from '../groupSlice';
import { useEffect, useState } from 'react';

export default function useGroupTask(groupID, from, to) {
  const [socket, setSocket] = useState<Socket>();

  const dispatch = useDispatch();

  const { isLoading } = useRealTimeData(
    onConnect,
    `group-task-real-time-${groupID}`,
  );

  useEffect(() => {
    if (groupID && from && to && socket)
      socket.emit('get-group-tasks', groupID, from, to);
  }, [groupID, new Date(from).getTime(), new Date(to).getTime()]);

  function onConnect(socket: Socket) {
    if (groupID && from && to)
      socket.emit('get-group-tasks', groupID, from, to);

    socket.on('group-tasks', (data) => {
      dispatch(updateListGroupTask(data));
    });

    socket.on('update-task', (data) => {
      dispatch(updateModifiedGroupTask(data));
    });

    socket.on('delete-task', (data) => {
      dispatch(updateDeletedGroupTask(data));
    });

    socket.on('error', (error) => {
      console.log({ groupTasksError: error });
    });

    setSocket(socket);
  }

  return {
    isLoading,
  };
}
