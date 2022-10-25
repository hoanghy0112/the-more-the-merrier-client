import axios from 'axios';
import {
  CREATE_NEW_TAG,
  FIND_TAG_BY_ID,
  FIND_TAG_BY_TITLE,
} from '../../constants/API_LINK';
import { auth } from '../../firebase/signInWithGoogleAPI';

export async function createNewTagAPI(newTag) {
  const accessToken = await auth.currentUser.getIdToken();

  console.log({ newTag });

  const response = await axios.post(CREATE_NEW_TAG, newTag, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
}

export default async function findTagByTitle(title) {
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

export async function findTagByID(tagID) {
  const accessToken = await auth.currentUser.getIdToken();
  const response = await axios.get(`${FIND_TAG_BY_ID}/${tagID}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log({ response });

  return response.data;
}
