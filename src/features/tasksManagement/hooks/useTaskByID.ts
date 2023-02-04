import { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';
import useRealTimeData from '../../../hooks/useRealTimeData';

export default function useTaskByID(taskID) {
  const [socket, setSocket] = useState<Socket>();
  const { data: task, isLoading } = useRealTimeData(
    onConnect,
    `task-${taskID}-real-time`,
  );

  useEffect(() => {
    if (taskID && socket) socket.emit('get-task', taskID);
  }, [taskID]);

  function onConnect(socket: Socket, setTasks = (data) => {}) {
    if (taskID) socket.emit('get-task', taskID);

    socket.on('task', (data) => {
      console.log({ task: data });
      setTasks(data);
    });

    socket.on('error', (error) => {
      console.log({ error });
    });

    setSocket(socket);
  }

  return {
    task,
    isLoading,
  };
}
