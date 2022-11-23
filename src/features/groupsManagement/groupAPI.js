import axios from 'axios';
import { getAuth } from 'firebase/auth';

import {
  CREATE_NEW_GROUP,
  CREATE_TASK_OF_GROUP,
  GET_ALL_GROUP_OF_CURRENT_USER,
  GET_BUSY_TIME_OF_GROUP,
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

export async function getBusyTimeOfGroupAPI(groupID, from, to) {
  try {
    const auth = getAuth();
    const accessToken = await auth.currentUser.getIdToken();
    const response = await axios.get(
      `${GET_BUSY_TIME_OF_GROUP}/${groupID}/tasks`,
      {
        withCredentials: true,
        params: {
          from,
          to,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createTaskOfGroupAPI(
  groupID,
  title,
  location,
  priority,
  from,
  to,
  participants = [],
  descriptions = [],
) {
  try {
    const auth = getAuth();
    const accessToken = await auth.currentUser.getIdToken();
    const response = await axios.post(
      `${CREATE_TASK_OF_GROUP}`,
      {
        title,
        location,
        priority,
        time: { from, to },
        participants,
        belongTo: groupID,
        descriptions,
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
    console.log(error);
    return null;
  }
}

export async function getTaskOfGroupAPI() {
  try {
    const auth = getAuth();
    const accessToken = await auth.currentUser.getIdToken();
    const response = await axios.get(`${GET_TASK_OF_GROUP}`, {
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
