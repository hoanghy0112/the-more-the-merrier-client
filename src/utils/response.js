export function getResponseStateColor(state) {
  if (state === 'decline') return 'rgb(230, 0, 0)';
  if (state === 'hover') return '#f9b122';
  if (state === 'approve') return '#52df4f';
  return 'white';
}

export function getResponseMessage(state) {
  if (state === 'decline') return 'Decline';
  if (state === 'hover') return 'Hover';
  if (state === 'approve') return 'Approve';
  return 'No response';
}
