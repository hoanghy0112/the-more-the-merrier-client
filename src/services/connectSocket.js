import { io } from 'socket.io-client';

// eslint-disable-next-line import/no-extraneous-dependencies
import { getAuth, onAuthStateChanged } from '@firebase/auth';

import { SOCKET_ENDPOINT } from '../constants/apiURL';

export default async function connectSocket() {
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {});

  const accessToken = await auth.currentUser.getIdToken();

  const socket = io(`${SOCKET_ENDPOINT}?token=${accessToken}`, {
    path: '/socket/v2',
  });

  return socket;
}
