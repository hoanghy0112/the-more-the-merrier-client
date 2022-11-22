/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';

import PropTypes from 'prop-types';

import PrimaryButton from '../../../../components/PrimaryButton/PrimaryButton';
import styles from './SuggestTimeModal.module.scss';

const HOW_LONG = [
  'ít hơn 1 giờ',
  'từ 1-2 giờ',
  'từ 2-4 giờ',
  'khoảng một buổi',
  'cả ngày',
];

const TIME_OF_DAY = [
  'Buổi sáng',
  'Buổi trưa',
  'Buổi chiều',
  'Buổi tối',
  'Khuya',
];

const IS_WEEKEND = ['Cuối tuần', 'Trong tuần', 'Cả tuần'];

export default function SuggestTimeModal({ onChooseTime }) {
  const [howLong, setHowLong] = useState('');
  const [timeOfDay, setTimeOfDay] = useState(new Map());
  const [isWeekend, setIsWeekend] = useState();
  const [isAdvanced, setIsAdvanced] = useState(false);

  function handleSuggest() {
    onChooseTime({ howLong, timeOfDay, isWeekend });
  }

  return (
    <div className={styles.container}>
      <div className={styles.questionBox}>
        <p className={styles.question}>Mọi người sẽ gặp nhau trong bao lâu?</p>
        <div className={styles.answer}>
          {HOW_LONG.map((value) => (
            <p
              className={value === howLong && styles.choosing}
              onClick={() => setHowLong(value)}
            >
              {value}
            </p>
          ))}
        </div>
      </div>
      {isAdvanced && (
        <>
          <div className={styles.questionBox}>
            <p className={styles.question}>
              Cuộc gặp nên được tổ chức vào buổi nào?
            </p>
            <div className={styles.answer}>
              {TIME_OF_DAY.map((value) => (
                <p
                  className={timeOfDay.get(value) && styles.choosing}
                  onClick={() =>
                    setTimeOfDay((prev) => {
                      const newData = new Map(prev);
                      newData.set(value, !newData.get(value));
                      return newData;
                    })
                  }
                >
                  {value}
                </p>
              ))}
            </div>
          </div>
          <div className={styles.questionBox}>
            <p className={styles.question}>Cuối tuần hay trong tuần?</p>
            <div className={styles.answer}>
              {IS_WEEKEND.map((value) => (
                <p
                  className={value === isWeekend && styles.choosing}
                  onClick={() => setIsWeekend(value)}
                >
                  {value}
                </p>
              ))}
            </div>
          </div>
        </>
      )}
      <button
        className={styles.advanced}
        type="button"
        onClick={() => setIsAdvanced((prev) => !prev)}
      >
        {isAdvanced ? 'Hide advanced options' : 'Show advanced options'}
      </button>
      <PrimaryButton onClick={handleSuggest} title="Suggest me" />
    </div>
  );
}

SuggestTimeModal.propTypes = {
  onChooseTime: PropTypes.func,
};

SuggestTimeModal.defaultProps = {
  onChooseTime: () => {},
};
