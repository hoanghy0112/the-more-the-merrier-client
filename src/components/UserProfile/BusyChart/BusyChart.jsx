/* eslint-disable no-use-before-define */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

import {
  selectAllTasks,
  selectCurrentWeekTasks,
} from '../../../features/tasksManagement/TasksSlice';
import styles from './BusyChart.module.scss';

export default function BusyChart() {
  const now = new Date();
  const [date, setDate] = useState(
    new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - now.getDay() + 1,
    ),
  );
  const [weekIsClicked, setWeek] = useState(true);
  const [monthIsClicked, setMonth] = useState(false);
  const [yearIsClicked, setYear] = useState(false);

  const tasks = useSelector(selectCurrentWeekTasks(date));
  const allTasks = useSelector(selectAllTasks);

  function getWeekWorkHour(dayOfWeek) {
    var count = 0;
    for (let i = 0; i < tasks.length; i++) {
      var taskDate = new Date(tasks[i].time.from);
      var taskDayNumber = taskDate.getDay();
      taskDayNumber -= 1;
      if (taskDayNumber === -1) {
        taskDayNumber = 6;
      }
      console.log(taskDayNumber);
      var taskDayOfWeek = labels[taskDayNumber];
      if (taskDayOfWeek === dayOfWeek) {
        count +=
          ((new Date(tasks[i].time.to).getTime() -
            new Date(tasks[i].time.from).getTime()) /
            86400000) *
          24;
      }
    }
    return count;
  }
  function getMonthWorkHour(dayOfMonth) {
    var count = 0;
    for (let i = 0; i < allTasks.length; i++) {
      var taskDate = new Date(allTasks[i].time.from);
      var taskDayOfMonth = taskDate.getDate();
      var taskMonth = taskDate.getMonth();
      var taskYear = taskDate.getFullYear();
      if (
        taskDayOfMonth === dayOfMonth &&
        taskMonth === now.getMonth() &&
        taskYear === now.getFullYear()
      ) {
        count +=
          ((new Date(allTasks[i].time.to).getTime() -
            new Date(allTasks[i].time.from).getTime()) /
            86400000) *
          24;
      }
    }
    return count;
  }
  function getYearWorkHour(monthOfYear) {
    var count = 0;
    for (let i = 0; i < allTasks.length; i++) {
      var taskDate = new Date(allTasks[i].time.from);
      var taskMonth = labels[taskDate.getMonth()];
      var taskYear = taskDate.getFullYear();
      // console.log(taskDayOfMonth);
      // console.log(now.getFullYear());
      // console.log(taskDayOfMonth);
      // console.log(taskMonth);
      // console.log(now.getMonth());
      if (taskMonth === monthOfYear && taskYear === now.getFullYear()) {
        count +=
          ((new Date(allTasks[i].time.to).getTime() -
            new Date(allTasks[i].time.from).getTime()) /
            86400000) *
          24;
      }
    }
    return count;
  }

  let labels = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: 'Hours',
        data: labels.map((label) => getWeekWorkHour(label)),
        // data: [4, 0, 2, 1, 3, 4, 5],
        backgroundColor: '#00A6CA',
        borderColor: '#00A6CA',
        borderWidth: 2,
      },
    ],
  });

  function handleClick1() {
    setWeek(true);
    setMonth(false);
    setYear(false);
    labels = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    setData({
      labels,
      datasets: [
        {
          label: 'Hours',
          data: labels.map((label) => getWeekWorkHour(label)),
          // data: [4, 0, 2, 1, 3, 4, 5],
          backgroundColor: '#00A6CA',
          borderColor: '#00A6CA',
          borderWidth: 2,
        },
      ],
    });
  }
  function handleClick2() {
    setWeek(false);
    setMonth(true);
    setYear(false);
    labels = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30,
    ];
    setData({
      labels,
      datasets: [
        {
          label: 'Hours',
          data: labels.map((label) => getMonthWorkHour(label)),
          // data: [4, 0, 2, 1, 3, 4, 5],
          backgroundColor: '#00A6CA',
          borderColor: '#00A6CA',
          borderWidth: 2,
        },
      ],
    });
  }
  function handleClick3() {
    setWeek(false);
    setMonth(false);
    setYear(true);
    labels = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    setData({
      labels,
      datasets: [
        {
          label: 'Hours',
          data: labels.map((label) => getYearWorkHour(label)),
          // data: [4, 0, 2, 1, 3, 4, 5],
          backgroundColor: '#00A6CA',
          borderColor: '#00A6CA',
          borderWidth: 2,
        },
      ],
    });
  }
  return (
    <div>
      <div className={styles.headerContainer}>
        <p className={styles.header}>
          <span className={styles.highlighted}>Busy</span>
          <span>chart</span>
        </p>
        <div className={styles.buttonContainer}>
          <button
            type="button"
            onClick={handleClick1}
            className={weekIsClicked ? styles.buttonClicked : ''}
          >
            Week
          </button>
          <button
            type="button"
            onClick={handleClick2}
            className={monthIsClicked ? styles.buttonClicked : ''}
          >
            Month
          </button>
          <button
            type="button"
            onClick={handleClick3}
            className={yearIsClicked ? styles.buttonClicked : ''}
          >
            Year
          </button>
        </div>
      </div>
      <div className={styles.chartContainer}>
        <Line data={data} width="800px" height="200px" />
      </div>
    </div>
  );
}
