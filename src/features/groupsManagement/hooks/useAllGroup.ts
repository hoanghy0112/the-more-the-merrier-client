import { Socket } from 'socket.io-client';

import useRealTimeData from '../../../hooks/useRealTimeData';

export default function useAllGroup() {
  const { data: groups, isLoading } = useRealTimeData(
    onConnect,
    'groups-real-time',
  );

  function onConnect(socket: Socket, setGroups: (data) => {}) {
    socket.emit('groups');

    socket.on('groups', (data) => {
      setGroups(data);
    });
  }

  return {
    groups,
    isLoading,
  };
}
