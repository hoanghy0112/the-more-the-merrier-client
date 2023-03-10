export function a() {}

export function getColorOfGroupTask(task, userID) {
  const response = task?.responses.find(({ userID: id }) => id === userID);

  if (task?.admin === userID) {
    return 'rgba(0, 41, 244, 0.498)';
  }

  if (response?.adminState) {
    if (response?.adminState === 'decline') return '#fe27275b';
    if (response?.adminState === 'approve') {
      return '#00ff1e5b';
    }
  }

  if (response?.state === 'approve') return 'rgba(157, 193, 252, 0.584)';

  return 'white';
}
