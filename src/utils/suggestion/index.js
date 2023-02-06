import {
  IS_WEEKEND_LABELS,
  TIME_OF_DAY_LABELS,
  TIME_PERIOD_LABELS,
} from '../../constants/suggestion';
import filterByPeriod from './filterByPeriod';
import filterByTimeOfDay from './filterByTimeOfDay';
import filterIsWeekend from './filterIsWeekend';
import {
  filterTimeList,
  getEndDate,
  getInitialTimeList,
  splitBusyTime,
} from './utils';

export default function filterTime({
  startDate, // Date
  busyTime,
  howLong = TIME_PERIOD_LABELS.LESS_THAN_1,
  timeOfDay = [TIME_OF_DAY_LABELS.ALL_DAY],
  isWeekend = IS_WEEKEND_LABELS.FULL_WEEK,
  endDate = getEndDate(startDate),
}) {
  let filteredTime = getInitialTimeList(startDate, endDate);

  filteredTime = splitBusyTime(filteredTime, busyTime, timeOfDay);

  let timeList = filterByPeriod(filteredTime, howLong);
  timeList = filterByTimeOfDay(timeList, timeOfDay);
  timeList = filterIsWeekend(timeList, isWeekend);
  timeList = filterTimeList(timeList);
  // console.log({ timeList: [...timeList] });

  return timeList;
}
