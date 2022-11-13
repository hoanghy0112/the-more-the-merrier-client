import axios from 'axios';
import { getAuth } from 'firebase/auth';

import {
  CREATE_NEW_GROUP,
  GET_ALL_GROUP_OF_CURRENT_USER,
} from '../../constants/apiURL';

export async function createNewGroupAPI({
  name = '',
  description = '',
  users = [],
  admin = '',
}) {
  try {
    const auth = getAuth();
    const accessToken = await auth.currentUser.getIdToken();
    const response = await axios.post(
      CREATE_NEW_GROUP,
      {
        name,
        description,
        users,
        admin,
      },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function getAllGroupsOfUserAPI() {
  try {
    const auth = getAuth();
    const accessToken = await auth.currentUser.getIdToken();
    const response = await axios.get(GET_ALL_GROUP_OF_CURRENT_USER, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
