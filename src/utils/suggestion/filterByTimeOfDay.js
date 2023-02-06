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
      startHour = 6;
      endHour = 11;
      if (
        new Date(from).getHours() < endHour &&
        new Date(to).getHours() > startHour
      ) {
        return true;
      }
    }

    if (timeOfDay.get(TIME_OF_DAY_LABELS.NOON)) {
      startHour = 11;
      endHour = 13;
      if (
        new Date(from).getHours() < endHour &&
        new Date(to).getHours() > startHour
      ) {
        return true;
      }
    }

    if (timeOfDay.get(TIME_OF_DAY_LABELS.AFTERNOON)) {
      startHour = 13;
      endHour = 18;
      if (
        new Date(from).getHours() < endHour &&
        new Date(to).getHours() > startHour
      ) {
        return true;
      }
    }

    if (timeOfDay.get(TIME_OF_DAY_LABELS.EVENING)) {
      startHour = 18;
      endHour = 24;
      if (
        new Date(from).getHours() < endHour &&
        new Date(to).getHours() > startHour
      ) {
        return true;
      }
    }

    if (timeOfDay.get(TIME_OF_DAY_LABELS.LATE_NIGHT)) {
      startHour = 0;
      endHour = 5;
      if (
        new Date(from).getHours() < endHour &&
        new Date(to).getHours() > startHour
      ) {
        return true;
      }
    }

    return false;
  });

  return filteredTime;
}
