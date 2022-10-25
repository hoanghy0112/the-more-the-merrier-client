/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import {
  CREATE_NEW_TAG,
  DELETE_TAG_BY_ID,
  FIND_TAG_BY_ID,
  FIND_TAG_BY_TITLE,
} from '../../constants/apiURL';

export async function createNewTagAPI(newTag) {
  const auth = getAuth();
  const accessToken = await auth.currentUser.getIdToken();

  const response = await axios.post(CREATE_NEW_TAG, newTag, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
}

export async function findTagByTitleAPI(title) {
  const auth = getAuth();
  const accessToken = await auth.currentUser.getIdToken();
  const response = await axios.get(FIND_TAG_BY_TITLE, {
    params: {
      title,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
}

export async function findTagByIDAPI(tagID) {
  const auth = getAuth();
  const accessToken = await auth.currentUser.getIdToken();
  const response = await axios.get(`${FIND_TAG_BY_ID}/${tagID}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
}

export async function deleteTagByIDAPI(tag) {
  const auth = getAuth();
  const accessToken = await auth.currentUser.getIdToken();
  const response = await axios.delete(`${DELETE_TAG_BY_ID}/${tag._id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
}
