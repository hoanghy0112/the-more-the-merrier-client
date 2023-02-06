/* eslint-disable no-shadow */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
} from 'chart.js';
import filterTime from '../../utils/suggestion';
import { useGroupBusyTimeQuery } from '../../features/groupsManagement/groupAPI';
import usePersistentState from '../../hooks/usePersistentState';

import styles from './BusyTimeChart.module.scss';
import {
  getDayOfMonth,
  getMonthLabels,
  VIEW_TYPE,
  weekLabels,
  yearLabels,
} from './labels';

ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title);

export default function BusyTimeChart({ groupInfo }) {
  const { _id: groupID } = groupInfo;

  const now = new Date();

  const [viewType, setViewType] = usePersistentState(
    `view-type-${groupID}`,
    VIEW_TYPE.DAY,
  );

  const from = useMemo(() => getFromDate(viewType, now), [viewType, groupID]);

  const to = useMemo(() => getToDate(viewType, now), [viewType, groupID]);

  const { data: busyTime } = useGroupBusyTimeQuery({
    groupID,
    from: from.getTime(),
    to: to.getTime(),
  });

  const [statisticData, setStatisticData] = useState(
    getStatisticByDay(busyTime || []),
  );

  function updateStatisticData() {
    switch (viewType) {
      case VIEW_TYPE.DAY:
        setStatisticData(getStatisticByDay(busyTime));
        break;

      case VIEW_TYPE.WEEK:
        setStatisticData(getStatisticByWeek(busyTime));
        break;

      case VIEW_TYPE.MONTH:
        setStatisticData(getStatisticByMonth(busyTime));
        break;

      case VIEW_TYPE.YEAR:
        setStatisticData(getStatisticByYear(busyTime));
        break;

      default:
    }
  }

  useEffect(() => {
    updateStatisticData();
  }, [busyTime]);

  useLayoutEffect(() => {
    updateStatisticData();
  }, [viewType]);

  return (
    <>
      <div className={styles.container}>
        <p className={styles.header}>
          <span className={styles.highlighted}>Busy </span>
          <span>chart</span>
        </p>
        <div className={styles.buttonContainer}>
          <button
            type="button"
            onClick={() => setViewType(VIEW_TYPE.DAY)}
            className={viewType === VIEW_TYPE.DAY ? styles.buttonClicked : ''}
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => setViewType(VIEW_TYPE.WEEK)}
            className={viewType === VIEW_TYPE.WEEK ? styles.buttonClicked : ''}
          >
            Week
          </button>
          <button
            type="button"
            onClick={() => setViewType(VIEW_TYPE.MONTH)}
            className={viewType === VIEW_TYPE.MONTH ? styles.buttonClicked : ''}
          >
            Month
          </button>
          <button
            type="button"
            onClick={() => setViewType(VIEW_TYPE.YEAR)}
            className={viewType === VIEW_TYPE.YEAR ? styles.buttonClicked : ''}
          >
            Year
          </button>
        </div>
      </div>
      <div className={styles.chartGroup}>
        <div className={styles.chartContainer}>
          <Line
            data={statisticData.data}
            options={statisticData.option}
            width="800px"
            height="340px"
          />
        </div>
      </div>
    </>
  );
}

function getStatistic(statistic) {
  const { labels, datasets, title = '' } = statistic;

  return {
    data: {
      labels,
      datasets: datasets.map(
        ({
          label = 'Hours',
          data,
          backgroundColor = '#00A6CA52',
          borderColor = '#00A6CA',
          borderWidth = 1,
        }) => ({
          fill: true,
          label,
          data,
          backgroundColor,
          borderColor,
          borderWidth,
        }),
      ),
    },
    option: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: title,
        },
      },
    },
    optionHorizontal: {
      indexAxis: 'y',
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
        },
        title: {
          display: true,
          text: title,
        },
      },
    },
  };
}

function getLabelList(viewType, date = new Date()) {
  switch (viewType) {
    case VIEW_TYPE.DAY:
      return Array(24)
        .fill('')
        .map((value, index) => `${index + 1}h`);

    case VIEW_TYPE.WEEK:
      return weekLabels;

    case VIEW_TYPE.MONTH:
      return getMonthLabels(date.getMonth() + 1, date.getFullYear());

    case VIEW_TYPE.YEAR:
      return yearLabels;

    default:
      return [];
  }
}

function getFromDate(viewType, date) {
  switch (viewType) {
    case VIEW_TYPE.DAY:
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        0,
        0,
        0,
      );

    case VIEW_TYPE.WEEK:
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - date.getDay() + 1,
        0,
        0,
        0,
      );

    case VIEW_TYPE.MONTH:
      return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0);

    case VIEW_TYPE.YEAR:
      return new Date(date.getFullYear(), 0, 1, 0, 0, 0);

    default:
      return new Date(date);
  }
}

function getToDate(viewType, date) {
  switch (viewType) {
    case VIEW_TYPE.DAY:
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1,
        0,
        0,
        0,
      );

    case VIEW_TYPE.WEEK:
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - date.getDay() + 8,
        0,
        0,
        0,
      );

    case VIEW_TYPE.MONTH:
      return new Date(date.getFullYear(), date.getMonth() + 1, 1, 0, 0, 0);

    case VIEW_TYPE.YEAR:
      return new Date(date.getFullYear() + 1, 0, 1, 0, 0, 0);

    default:
      return new Date(date);
  }
}

function getStatisticByDay(busyTimes = []) {
  const busyTimeList = busyTimes.map(({ from, to }) => ({
    from: new Date(from),
    to: new Date(to),
  }));

  const labels = getLabelList(
    VIEW_TYPE.DAY,
    busyTimeList?.[0]?.from || new Date(),
  );

  const data = busyTimeList.reduce((data, { from, to }) => {
    for (let i = from.getHours(); i <= to.getHours(); i += 1) {
      data.set(i, (data.get(i) || 0) + 1);
    }
    return new Map(data);
  }, new Map(labels.map((value, index) => [index, 0])));

  return getStatistic({
    labels,
    title: 'Number of busy user today',
    datasets: [{ label: 'User', data: Array.from(data.values()) }],
  });
}

function getStatisticByWeek(busyTimes = []) {
  const busyTimeList = busyTimes.map(({ from, to }) => ({
    from: new Date(from),
    to: new Date(to),
  }));

  const labels = getLabelList(
    VIEW_TYPE.WEEK,
    busyTimeList?.[0]?.from || new Date(),
  );

  const startDate = new Date(busyTimeList?.[0]?.from || new Date());
  startDate.setDate(startDate.getDate() - startDate.getDay() + 1);
  startDate.setHours(0, 0, 0, 0);

  const freeTime = filterTime({ startDate, busyTime: busyTimeList });

  const busyTimeData = Array.from(
    freeTime
      .reduce((data, { from, to }) => {
        data.set(
          from.getDay() || 7,
          data.get(from.getDay() || 7) + (to - from),
        );
        return new Map(data);
      }, new Map(labels.map((value, index) => [index + 1, 0])))
      .values(),
  ).map((miliseconds) => 24 - miliseconds / 1000 / 60 / 60);

  return getStatistic({
    labels,
    title: 'Busy hour of group in week',
    datasets: [{ label: 'Hour', data: busyTimeData }],
  });
}

function getStatisticByMonth(busyTimes = []) {
  const busyTimeList = busyTimes.map(({ from, to }) => ({
    from: new Date(from),
    to: new Date(to),
  }));

  const labels = getLabelList(
    VIEW_TYPE.MONTH,
    busyTimeList?.[0]?.from || new Date(),
  );

  const startDate = new Date(busyTimeList?.[0]?.from || new Date());
  startDate.setDate(1);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth() + 1,
    1,
    0,
    0,
    0,
  );

  const freeTime = filterTime({ startDate, busyTime: busyTimeList, endDate });

  const busyTimeData = Array.from(
    freeTime
      .reduce((data, { from, to }) => {
        data.set(from.getDate(), data.get(from.getDate()) + (to - from));
        return new Map(data);
      }, new Map(labels.map((value, index) => [index + 1, 0])))
      .values(),
  ).map((miliseconds) => 24 - miliseconds / 1000 / 60 / 60);

  return getStatistic({
    labels,
    title: 'Busy hour of group in month',
    datasets: [{ label: 'Hour', data: busyTimeData }],
  });
}

function getStatisticByYear(busyTimes = []) {
  const busyTimeList = busyTimes.map(({ from, to }) => ({
    from: new Date(from),
    to: new Date(to),
  }));

  const labels = getLabelList(
    VIEW_TYPE.YEAR,
    busyTimeList?.[0]?.from || new Date(),
  );

  const startDate = new Date(busyTimeList?.[0]?.from || new Date());
  startDate.setMonth(0);
  startDate.setDate(1);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(startDate.getFullYear() + 1, 0, 1, 0, 0, 0);

  const freeTime = filterTime({ startDate, busyTime: busyTimeList, endDate });

  const busyTimeData = Array.from(
    freeTime
      .reduce((data, { from, to }) => {
        data.set(from.getMonth(), data.get(from.getMonth()) + (to - from));
        return new Map(data);
      }, new Map(labels.map((value, index) => [index, 0])))
      .values(),
  ).map(
    (miliseconds, index) =>
      24 -
      miliseconds /
        1000 /
        60 /
        60 /
        getDayOfMonth(index + 1, startDate.getFullYear()),
  );

  return getStatistic({
    labels,
    title: 'Average busy hour in each month',
    datasets: [{ label: 'Hour', data: busyTimeData }],
  });
}
