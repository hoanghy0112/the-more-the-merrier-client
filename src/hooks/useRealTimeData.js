/* eslint-disable import/no-extraneous-dependencies */
import { getAuth, onAuthStateChanged } from '@firebase/auth';

import { useMemo, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';

import { SOCKET_ENDPOINT } from '../constants/apiURL';

export default function useRealTimeData(endpoint) {
  const [data, setData] = useState({});
  const [token, setToken] = useState(null);
  const isLoading = useRef(true);

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
        console.log('connect rui ne');
      });
    }
  }, [socket]);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async () => {
      const accessToken = await auth.currentUser.getIdToken();
      setToken(accessToken);
    });
  }, []);

  return { data, isLoading: isLoading.current };
}
