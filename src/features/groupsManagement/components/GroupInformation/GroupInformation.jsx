/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';

import CLOSE_ICON from '../../../../assets/icons/close.svg';

import styles from './GroupInformation.module.scss';

export default function GroupInformation({ groupInfo, closeModal }) {
  const { name, description } = groupInfo;

  return (
    <div className={styles.container}>
      <div>
        <div>
          <h1>{name}</h1>
          <img src="" alt="" />
        </div>
        <p>{description}</p>
      </div>
      <img
        className={styles.close}
        src={CLOSE_ICON}
        alt="close"
        onClick={closeModal}
      />
    </div>
  );
}
