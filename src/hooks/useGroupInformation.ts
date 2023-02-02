import { useRef, useState } from 'react';
import { Socket } from 'socket.io-client';

import useRealTimeData from './useRealTimeData';
import { useDispatch } from 'react-redux';
import { updateGroupInformation } from '../features/groupsManagement/groupSlice';

export default function useGroupInformation(groupID) {
  const dispatch = useDispatch();

  const { data: groupInfo, isLoading } = useRealTimeData(
    onConnect,
    `group-info-real-time-${groupID}`,
  );

  function onConnect(socket: Socket, setGroupInformation: (data) => {}) {
    socket.emit('group-info', groupID);

    socket.on('group-info', (data) => {
      setGroupInformation(data);
      dispatch(updateGroupInformation(data));
    });
  }

  return {
    groupInfo,
    isLoading,
  };
}
