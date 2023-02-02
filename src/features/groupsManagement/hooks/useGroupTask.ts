import { useDispatch } from 'react-redux';
import { Socket } from 'socket.io-client';
import useRealTimeData from '../../../hooks/useRealTimeData';
import {
  updateDeletedGroupTask,
  updateListBusy,
  updateListGroupTask,
  updateModifiedGroupTask,
} from '../groupSlice';

export default function useGroupTask(groupID, from, to) {
  const dispatch = useDispatch();

  const { isLoading } = useRealTimeData(
    onConnect,
    `group-task-real-time-${groupID}`,
  );

  function onConnect(socket: Socket) {
    socket.emit('get-group-tasks', groupID, from, to);

    socket.on('tasks', (data) => {
      // console.log({ tasks: data });
      dispatch(updateListGroupTask(data));
    });

    socket.on('update-task', (data) => {
      // console.log({ modified: data });
      dispatch(updateModifiedGroupTask(data));
    });

    socket.on('delete-task', (data) => {
      // console.log({ deleted: data });
      dispatch(updateDeletedGroupTask(data));
    });
  }

  return {
    isLoading,
  };
}
