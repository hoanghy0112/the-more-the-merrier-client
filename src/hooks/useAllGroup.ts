import { useRef, useState } from 'react';
import { Socket } from 'socket.io-client';

import useRealTimeData from './useRealTimeData';

export default function useAllGroup() {
  const [socket, setSocket] = useState<Socket>();
  const { data: groups, isLoading } = useRealTimeData(
    onConnect,
    'groups-real-time',
  );

  function onConnect(socket: Socket, setGroups: (data) => {}) {
    socket.emit('groups');

    socket.on('groups', (data) => {
      console.log({ groupData: data });
      setGroups(data);
    });

    setSocket(socket);
  }

  return {
    groups,
    isLoading,
  };
}
