export function getPreviousMonday(date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - date.getDay() + 1,
    0,
    0,
    0,
  );
}

export function getStartAndEndOfWeek(date) {
  const startDate = getPreviousMonday(date);
  const endDate = startDate.getTime() + 7 * 24 * 60 * 60 * 1000;

  return {
    startDate,
    endDate,
  };
}

export function getTimeOfDate(date) {
  return new Date(date).getTime();
}
