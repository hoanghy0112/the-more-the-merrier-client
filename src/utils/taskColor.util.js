export function a() {}

export function getColorOfGroupTask(task, userID) {
  const response = task?.responses.find(({ userID: id }) => id === userID);

  if (task?.admin === userID) {
    return '#9dc1fc95';
  }

  if (response?.adminState) {
    if (response?.adminState === 'decline') return '#fe27275b';
    if (response?.adminState === 'approve') {
      return '#00ff1e5b';
    }
  }

  if (response?.state === 'approve') return '#0029f47f';

  return 'white';
}
