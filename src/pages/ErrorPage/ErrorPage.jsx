/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';

import styles from './ErrorPage.module.scss';

export default function ErrorPage({ errorMessage }) {
  const navigate = useNavigate();
  const { message = errorMessage || 'Your link seems to be wrong' } =
    useRouteError();

  return (
    <div className={styles.container}>
      <div className={styles.error}>
        <h1>404 page not found</h1>
        <p>{message}</p>
        <PrimaryButton
          title="Go back to schedule"
          onClick={() => navigate('/home/schedule')}
          width={300}
        />
      </div>
    </div>
  );
}
