import axios from 'axios';
import { getAuth } from 'firebase/auth';

import {
  CREATE_NEW_GROUP,
  GET_ALL_GROUP_OF_CURRENT_USER,
  GET_TASK_OF_GROUP,
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

export async function getTaskOfGroupAPI(groupID, from, to) {
  try {
    const auth = getAuth();
    const accessToken = await auth.currentUser.getIdToken();
    const response = await axios.get(`${GET_TASK_OF_GROUP}/${groupID}/tasks`, {
      withCredentials: true,
      params: {
        from,
        to,
      },
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
