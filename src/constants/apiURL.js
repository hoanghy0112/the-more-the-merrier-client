export const BASE_URL = 'https://hoanghy.tech';

export const GET_USER_PROFILE_API_LINK = `${BASE_URL}/api/v1/user`;
export const GET_USER_PROFILE_BY_ID = `${BASE_URL}/api/v2/user/find`;
export const FIND_USER_BY_NAME = `${BASE_URL}/api/v1/user/find`;
export const ACCEPT_JOIN_GROUP = `${BASE_URL}/api/v2/user/accept-join`;

export const CREATE_NEW_TASK = `${BASE_URL}/api/v1/task/`;
export const UPDATE_TASK = `${BASE_URL}/api/v1/task/`;
export const GET_ALL_TASK_OF_CURRENT_USER_API_LINK = `${BASE_URL}/api/v1/task`;

export const CREATE_NEW_TAG = `${BASE_URL}/api/v1/tag`;
export const FIND_TAG_BY_TITLE = `${BASE_URL}/api/v1/tag/find/`;
export const FIND_TAG_BY_ID = `${BASE_URL}/api/v1/tag`;
export const DELETE_TAG_BY_ID = `${BASE_URL}/api/v1/tag/`;

export const CREATE_NEW_GROUP = `${BASE_URL}/api/v1/group`;
export const CREATE_NEW_GROUP_V2 = `${BASE_URL}/api/v2/group`;
export const CHANGE_GROUP_INFO = `${BASE_URL}/api/v2/group`;
export const GET_ALL_GROUP_OF_CURRENT_USER = `${BASE_URL}/api/v1/group`;
export const GET_BUSY_TIME_OF_GROUP = `${BASE_URL}/api/v1/group`;
export const GET_BUSY_TIME_OF_GROUP_V2 = `${BASE_URL}/api/v2/group`;
export const GET_GROUP_BY_ID = `${BASE_URL}/api/v1/group`;
export const ADD_NEW_USER_TO_GROUP = `${BASE_URL}/api/v1/group`;
export const INVITE_USER_TO_GROUP = `${BASE_URL}/api/v2/group`;
export const REMOVE_USER_FROM_GROUP = `${BASE_URL}/api/v1/group`;
export const DELETE_GROUP_BY_ID = `${BASE_URL}/api/v2/group`;

export const CREATE_TASK_OF_GROUP = `${BASE_URL}/api/v1/groupTasks`;
export const CHANGE_TASK_OF_GROUP = `${BASE_URL}/api/v1/groupTasks`;
export const DELETE_TASK_OF_GROUP = `${BASE_URL}/api/v1/groupTasks`;
export const GET_TASK_OF_GROUP = `${BASE_URL}/api/v1/groupTasks`;

export const GET_ALL_NOTIFICATIONS = `${BASE_URL}/api/v1/notifications`;

export const SOCKET_ENDPOINT = `${BASE_URL}`;
