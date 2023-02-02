import axios from 'axios';
import { getAuthorizeHeader } from '../../app/utils';

export async function createNewTaskAPI(taskData) {
  const res = await axios.post(
    'https://hoanghy.tech/api/v2/task',
    {
      ...taskData,
    },
    await getAuthorizeHeader(),
  );
  return res;
}

export async function updateTaskAPI({ _id, ...otherField }) {
  const res = await axios.put(
    `https://hoanghy.tech/api/v2/task/${_id}`,
    { ...otherField },
    await getAuthorizeHeader(),
  );
  return res.data;
}

export async function deleteTaskAPI({ _id }) {
  const res = await axios.delete(
    `https://hoanghy.tech/api/v2/task/${_id}`,
    await getAuthorizeHeader(),
  );
  return res.data;
}
