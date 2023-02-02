/* eslint-disable implicit-arrow-linebreak */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

import {
  CHANGE_TASK_OF_GROUP_V2,
  CREATE_NEW_GROUP_V2,
  CREATE_TASK_OF_GROUP_V2,
  DELETE_TASK_OF_GROUP_V2,
  GET_BUSY_TIME_OF_GROUP_V2,
  GET_GROUP_BY_ID,
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
      CREATE_NEW_GROUP_V2,
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
      `${CREATE_TASK_OF_GROUP_V2}`,
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

export async function changeTaskOfGroupAPI(taskID, data) {
  try {
    const auth = getAuth();
    const accessToken = await auth.currentUser.getIdToken();
    const response = await axios.put(
      `${CHANGE_TASK_OF_GROUP_V2}/${taskID}`,
      data,
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

export async function deleteTaskOfGroupAPI(taskID) {
  try {
    const auth = getAuth();
    const accessToken = await auth.currentUser.getIdToken();
    const response = await axios.delete(
      `${DELETE_TASK_OF_GROUP_V2}/${taskID}`,
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
export async function getTaskOfGroupAPI(groupID) {
  try {
    const auth = getAuth();
    const accessToken = await auth.currentUser.getIdToken();
    const response = await axios.get(`${GET_TASK_OF_GROUP}/${groupID}`, {
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

export const getGroupTaskByID = createApi({
  reducerPath: 'groupTasks',
  baseQuery: fetchBaseQuery({
    baseUrl: GET_TASK_OF_GROUP,
    prepareHeaders: async (headers) => {
      const auth = getAuth();
      const accessToken = await auth.currentUser.getIdToken();
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    groupTaskByID: builder.query({
      query: ({ groupID }) => `/${groupID}`,
    }),
  }),
});

export const getGroupInformationByID = createApi({
  reducerPath: 'groupInformation',
  baseQuery: fetchBaseQuery({ baseUrl: GET_GROUP_BY_ID }),
  endpoints: (builder) => ({
    groupInformationByID: builder.query({
      query: (groupID) => `/${groupID}`,
    }),
  }),
});

export const getGroupBusyTime = createApi({
  reducerPath: 'groupBusyTime',
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: GET_BUSY_TIME_OF_GROUP_V2,
    prepareHeaders: async (headers) => {
      const auth = getAuth();
      const accessToken = await auth.currentUser.getIdToken();
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    groupBusyTime: builder.query({
      query: ({ groupID, from, to }) =>
        `/${groupID}/busy?from=${new Date(from || 0).getTime()}&to=${new Date(
          to || 0,
        ).getTime()}`,
    }),
  }),
});

export const { useGroupInformationByIDQuery } = getGroupInformationByID;
export const { useGroupBusyTimeQuery } = getGroupBusyTime;
export const { useGroupTaskByIDQuery } = getGroupTaskByID;
