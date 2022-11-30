import React from 'react';
import { Bar } from 'react-chartjs-2';

import styles from './BusyChart.module.scss';

export default function BusyChart() {
    return (
        <div>
            <p className={styles.header}><span className={styles.highlighted}>Busy</span> chart</p>
            <div className={styles.chartContainer}>
                Busy chart
            </div>
        </div>
    );
}