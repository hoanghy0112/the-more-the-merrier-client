import React, { useEffect, useState } from 'react';
import { selectCurrentWeekTasks } from '../../../features/tasksManagement/TasksSlice';
import { useSelector } from 'react-redux';
import styles from './BusyChart.module.scss';

import Chart from 'chart.js/auto';
import { Bar, Line } from "react-chartjs-2";


const labels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


export default function BusyChart() {
  const now = new Date();
  const [date, setDate] = useState(
    new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - now.getDay() + 1,
    ),
  );
  const tasks = useSelector(selectCurrentWeekTasks(date));

  function getWorkHour(dayOfWeek) {
    var count = 0;
    for (let i=0; i<tasks.length; i++)
    {
      var taskDate = new Date(tasks[i].time.from);
      var taskDayOfWeek = labels[taskDate.getDay()];
      if (taskDayOfWeek === dayOfWeek)
      {
        count += ((new Date(tasks[i].time.to).getTime() - new Date(tasks[i].time.from).getTime()) / 86400000) * 24;
      }
    }
    return count;
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Hours',
        data: labels.map((label) => getWorkHour(label)),
        // data: [4, 0, 2, 1, 3, 4, 5],
        backgroundColor: '#00A6CA', 
        borderColor: "#00A6CA",
        borderWidth: 2,
      },
    ],
  }
  return (
    <div>
      <p className={styles.header}><span className={styles.highlighted}>Busy</span> chart</p>
      <div className={styles.chartContainer}>
        <Line data={data} width={"600px"} />
      </div>
    </div>
  );
}