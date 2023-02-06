/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-loop-func */

import { TIME_OF_DAY_LABELS } from '../../constants/suggestion';

/* eslint-disable no-plusplus */
export function getEndDate(startDate = new Date()) {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + ((7 - endDate.getDay()) % 7 || 7));
  endDate.setHours(23);
  endDate.setMinutes(59);
  endDate.setSeconds(59);
  return endDate;
}

export function getInitialTimeList(
  startDate = new Date(),
  endDate = getEndDate(startDate),
) {
  const newStartDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate(),
    0,
    0,
    0,
  );
  const newEndDate = new Date(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate(),
    23,
    59,
    59,
  );

  return {
    from: newStartDate,
    to: newEndDate,
  };
}

export function addToTimeStamps(
  timeStamps,
  startDate,
  endDate,
  startHour,
  endHour,
) {
  for (
    let i = new Date(startDate).getTime();
    i < new Date(endDate).getTime();
    i += 24 * 60 * 60 * 1000
  ) {
    const date = new Date(i);
    timeStamps.push(
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        startHour,
        0,
        0,
        0,
      ),
    );
    timeStamps.push(
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        endHour,
        0,
        0,
        0,
      ),
    );
  }
}

export function splitBusyTime(initial, busyTime, timeOfDay) {
  let filteredTime = [];
  const { from: startDate, to: endDate } = initial;
  let timeStamps = [];
  const busyTimeList = [...busyTime];

  for (
    let i = new Date(startDate).getTime();
    i < new Date(endDate).getTime();
    i += 24 * 60 * 60 * 1000
  ) {
    timeStamps.push(new Date(i));
    timeStamps.push(new Date(i + 24 * 60 * 60 * 1000 - 1000));
  }
  busyTimeList.forEach(({ from, to }) => timeStamps.push(from, to));

  if (timeOfDay.get(TIME_OF_DAY_LABELS.MORNING)) {
    const startHour = 6;
    const endHour = 11;
    addToTimeStamps(timeStamps, startDate, endDate, startHour, endHour);
  }

  if (timeOfDay.get(TIME_OF_DAY_LABELS.NOON)) {
    const startHour = 11;
    const endHour = 13;
    addToTimeStamps(timeStamps, startDate, endDate, startHour, endHour);
  }

  if (timeOfDay.get(TIME_OF_DAY_LABELS.AFTERNOON)) {
    const startHour = 13;
    const endHour = 18;
    addToTimeStamps(timeStamps, startDate, endDate, startHour, endHour);
  }

  if (timeOfDay.get(TIME_OF_DAY_LABELS.EVENING)) {
    const startHour = 18;
    const endHour = 24;
    addToTimeStamps(timeStamps, startDate, endDate, startHour, endHour);
  }

  if (timeOfDay.get(TIME_OF_DAY_LABELS.LATE_NIGHT)) {
    const startHour = 0;
    const endHour = 5;
    addToTimeStamps(timeStamps, startDate, endDate, startHour, endHour);
  }

  timeStamps = timeStamps.map((a) => new Date(a));
  timeStamps.sort((a, b) => a - b);

  busyTimeList.sort(
    (a, b) => new Date(a.from).getTime() - new Date(b.from).getTime(),
  );

  for (let i = 1; i < timeStamps.length; i++) {
    let current = timeStamps[i - 1];
    let busy = 0;
    busyTimeList.forEach(({ from, to }) => {
      if (
        new Date(from).getTime() + 1000 <= new Date(timeStamps[i]).getTime() &&
        new Date(to).getTime() - 1000 >= new Date(current).getTime()
      ) {
        busy += 1;
      }
    });

    filteredTime.push({ from: current, to: timeStamps[i], busy });
    current = timeStamps[i];
  }

  // filter small region
  filteredTime = filteredTime.filter(
    ({ from, to }) =>
      new Date(to).getTime() - new Date(from).getTime() > 30 * 60 * 1000,
  );

  return filteredTime;
}

export function splitDay(initialList) {
  const filteredTime = [...initialList];

  let i = filteredTime.length - 1;
  while (i >= 0) {
    const { from: from_, to: to_ } = filteredTime[i];
    const from = new Date(from_);
    const to = new Date(to_);
    if (from.getDate() !== to.getDate() || from.getMonth() !== to.getMonth()) {
      filteredTime.splice(i, 1);
      const middle = new Date(from);
      middle.setHours(23, 59, 59);
      filteredTime.push({
        from,
        to: middle,
      });
      const otherMiddle = new Date(from);
      otherMiddle.setDate(otherMiddle.getDate() + 1);
      otherMiddle.setHours(0, 0, 1);
      filteredTime.unshift({
        from: otherMiddle,
        to,
      });
      i += 1;
    }
    i -= 1;
  }

  return filteredTime;
}

export function filterTimeList(list) {
  const timeList = [...list];

  timeList.sort((a, b) => a.busy - b.busy);

  const maxBusyOfTimeList =
    timeList.map(({ busy }) => busy).sort((a, b) => b - a)[0] || 0;

  let newTimeList = [];

  let maxBusy = 0;
  newTimeList = timeList.filter(({ busy }) => busy <= maxBusy);

  while (newTimeList.length <= 4) {
    maxBusy += 1;
    if (maxBusy > maxBusyOfTimeList) break;
    newTimeList = timeList.filter(({ busy }) => busy <= maxBusy);
  }

  newTimeList = newTimeList.map(({ from, to, busy }) => ({
    from: new Date(new Date(from).getTime() + 5 * 60 * 1000),
    to: new Date(new Date(to).getTime() - 5 * 60 * 1000),
    busy,
  }));

  return newTimeList;
}
