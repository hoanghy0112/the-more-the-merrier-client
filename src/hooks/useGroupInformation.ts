import { useRef, useState } from 'react';
import { Socket } from 'socket.io-client';

import useRealTimeData from './useRealTimeData';

export default function useGroupInformation(groupID) {
  const [socket, setSocket] = useState<Socket>();
  const { data: groupInfo, isLoading } = useRealTimeData(
    onConnect,
    `group-info-real-time-${groupID}`,
  );

  function onConnect(socket: Socket, setGroupInformation: (data) => {}) {
    socket.emit('group-info', groupID);

    socket.on('group-info', (data) => {
      console.log({ groupInfomationData: data });
      setGroupInformation(data);
    });

    setSocket(socket);
  }

  return {
    groupInfo,
    isLoading,
  };
}
