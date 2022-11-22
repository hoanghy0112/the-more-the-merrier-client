import filterByPeriod from './filterByPeriod';
import { getInitialTimeList, splitBusyTime, splitDay } from './utils';

export default function filterTime(
  startDate,
  busyTime,
  howLong,
  timeOfDay,
  isWeekend,
) {
  let filteredTime = getInitialTimeList(startDate);

  filteredTime = splitBusyTime(filteredTime, busyTime);
  filteredTime = splitDay(filteredTime);

  const timeList = filterByPeriod(filteredTime, howLong);

  return timeList;
}
