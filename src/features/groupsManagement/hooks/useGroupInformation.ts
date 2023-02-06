import { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';

import useRealTimeData from '../../../hooks/useRealTimeData';
import { useDispatch } from 'react-redux';
import { updateGroupInformation } from '../groupSlice';

export default function useGroupInformation(groupID) {
  const [socket, setSocket] = useState<Socket>();
  const dispatch = useDispatch();

  const { data: groupInfo, isLoading } = useRealTimeData(
    onConnect,
    `group-info-real-time-${groupID}`,
  );

  useEffect(() => {
    if (groupID && socket) socket.emit('group-info', groupID);
  }, [groupID]);

  function onConnect(socket: Socket, setGroupInformation: (data) => {}) {
    if (groupID) socket.emit('group-info', groupID);

    socket.on('group-info', (data) => {
      if (data) {
        setGroupInformation(data);
        dispatch(updateGroupInformation(data));
      }
    });

    setSocket(socket);
  }

  return {
    groupInfo,
    isLoading,
  };
}
