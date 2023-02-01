import { useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import useRealTimeData from '../../../hooks/useRealTimeData';
import { useDispatch } from 'react-redux';
import {
  updateAddedTask,
  updateDeletedTask,
  updateListTask,
  updateModifiedTask,
} from '../TasksSlice';

export default function usePersonalTask(from, to) {
  const dispatch = useDispatch();

  const [socket, setSocket] = useState<Socket>();
  const { data: tasks, isLoading } = useRealTimeData(
    onConnect,
    'tasks-real-time',
  );

  function onConnect(socket: Socket, setTasks: (data) => {}) {
    socket.emit('get-tasks', from, to);

    socket.on('tasks', (data) => {
      // console.log({ taskData: data });
      dispatch(updateListTask(data));
      // setTasks(data);
    });

    socket.on('new-task', (task) => {
      console.log({ newTask: task });
      dispatch(updateAddedTask(task));
    });

    socket.on('update-task', (task) => {
      console.log({ modifiedTask: task });
      dispatch(updateModifiedTask(task));
    });

    socket.on('delete-task', (taskID) => {
      console.log({ deleteTask: taskID });
      dispatch(updateDeletedTask(taskID));
    });

    setSocket(socket);
  }

  return {
    tasks,
    isLoading,
  };
}
