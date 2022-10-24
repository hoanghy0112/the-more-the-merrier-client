import axios from 'axios';
import { FIND_TAG_BY_TITLE } from '../../constants/API_LINK';
import { auth } from '../../firebase/signInWithGoogleAPI';

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
