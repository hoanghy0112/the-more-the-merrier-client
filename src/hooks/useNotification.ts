import { useRef, useState } from 'react';
import { Socket } from 'socket.io-client';

import useRealTimeData from './useRealTimeData';

export default function useNotification(setNewNotification = (data) => {}) {
  const [socket, setSocket] = useState<Socket>();
  const { data: notifications, isLoading } = useRealTimeData(
    onConnect,
    'notification-real-time',
  );

  function readNotification(notificationID: string) {
    console.log({ notificationIDs: [notificationID] });
    socket?.emit('read-notification', {
      notificationIDs: [notificationID],
    });
  }

  function readAllNotification() {
    const notificationIDs =
      notifications?.map?.((notification) => notification._id) || [];
    console.log({ notificationIDs });
    socket?.emit('read-notification', {
      notificationIDs,
    });
  }

  function onConnect(socket: Socket, setNotifications: (data) => {}) {
    socket.emit('get-notification');

    socket.on('notification', (data) => {
      setNotifications(data);
    });

    socket.on('new-notification', (data) => setNewNotification(data));

    setSocket(socket);
  }

  return {
    notifications,
    isLoading,
    readNotification,
    readAllNotification,
  };
}
