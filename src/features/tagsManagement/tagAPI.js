import axios from 'axios';
import {
  CREATE_NEW_TAG,
  FIND_TAG_BY_ID,
  FIND_TAG_BY_TITLE,
} from '../../constants/apiURL';
import { auth } from '../../firebase/signInWithGoogleAPI';

export async function createNewTagAPI(newTag) {
  const accessToken = await auth.currentUser.getIdToken();

  const response = await axios.post(CREATE_NEW_TAG, newTag, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
}

export async function findTagByTitleAPI(title) {
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
  const accessToken = await auth.currentUser.getIdToken();
  const response = await axios.get(`${FIND_TAG_BY_ID}/${tagID}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log({ response });

  return response.data;
}
