/* eslint-disable import/no-extraneous-dependencies */
import { getAuth, onAuthStateChanged } from '@firebase/auth';

import { useMemo, useState, useRef, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

import { SOCKET_ENDPOINT } from '../constants/apiURL';
import usePersistentState from './usePersistentState';

export default function useRealTimeData(onConnect, name) {
  const [data, setData] = usePersistentState(name, null);
  const [token, setToken] = useState<string | null>(null);

  const socket = useMemo(() => {
    if (token) {
      return io(`${SOCKET_ENDPOINT}?token=${token}`, {
        path: '/socket/v2',
      });
    }
    return null;
  }, [token]);

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        onConnect?.call?.(null, socket, setData);
      });
    }
  }, [socket, name]);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async () => {
      const accessToken = (await auth?.currentUser?.getIdToken?.()) || null;
      setToken(accessToken);
    });
  }, []);

  return { data, isLoading: data == null };
}
