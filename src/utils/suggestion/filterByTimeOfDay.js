/* eslint-disable implicit-arrow-linebreak */
import { TIME_OF_DAY_LABELS } from '../../constants/suggestion';

export default function filterByTimeOfDay(timeList, timeOfDay) {
  let filteredTime = [];

  let isAllEmpty = true;
  timeOfDay.forEach((value) => {
    if (value === true) isAllEmpty = false;
  });
  if (isAllEmpty) {
    return timeList;
  }

  filteredTime = timeList.filter(({ from, to }) => {
    let startHour;
    let endHour;

    if (timeOfDay.get(TIME_OF_DAY_LABELS.ALL_DAY)) {
      return true;
    }

    if (timeOfDay.get(TIME_OF_DAY_LABELS.MORNING)) {
      startHour = 7;
      endHour = 10;
      if (
        new Date(from).getHours() <= startHour &&
        new Date(to).getHours() >= endHour
      ) {
        return true;
      }
    }

    if (timeOfDay.get(TIME_OF_DAY_LABELS.NOON)) {
      startHour = 10;
      endHour = 14;
      if (
        new Date(from).getHours() >= startHour &&
        new Date(to).getHours() <= endHour
      ) {
        return true;
      }
    }

    if (timeOfDay.get(TIME_OF_DAY_LABELS.AFTERNOON)) {
      startHour = 14;
      endHour = 19;
      if (
        new Date(from).getHours() >= startHour &&
        new Date(to).getHours() <= endHour
      ) {
        return true;
      }
    }

    if (timeOfDay.get(TIME_OF_DAY_LABELS.EVENING)) {
      startHour = 19;
      endHour = 23;
      if (
        new Date(from).getHours() >= startHour &&
        new Date(to).getHours() <= endHour
      ) {
        return true;
      }
    }

    if (timeOfDay.get(TIME_OF_DAY_LABELS.LATE_NIGHT)) {
      startHour = 0;
      endHour = 5;
      if (
        new Date(from).getHours() >= startHour &&
        new Date(to).getHours() <= endHour
      ) {
        return true;
      }
    }

    return false;
  });

  return filteredTime;
}
