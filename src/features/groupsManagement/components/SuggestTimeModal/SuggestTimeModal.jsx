import React from 'react';

import PropTypes from 'prop-types';

import styles from './SuggestTimeModal.module.scss';

export default function SuggestTimeModal({ onChooseTime }) {
  return (
    <div className={styles.container}>
      <div className={styles.question}>
        <p>Mọi người sẽ gặp gỡ nhau trong bao lâu?</p>
        <div>
          <p>ít hơn 1 giờ</p>
          <p>từ 1-2 giờ</p>
          <p>từ 2-4 giờ</p>
          <p>khoảng một buổi</p>
          <p>cả ngày</p>
        </div>
      </div>
      <div className={styles.question}>
        <p>Cuộc gặp nên được tổ chức vào buổi nào?</p>
        <div>
          <p>Buổi sáng</p>
          <p>Buổi trưa</p>
          <p>Buổi chiều</p>
          <p>Buổi tối</p>
          <p>Khuya</p>
        </div>
      </div>
      <div className={styles.question}>
        <p>Cuối tuần hay trong tuần?</p>
        <div>
          <p>Cuối tuần</p>
          <p>Trong tuần</p>
        </div>
      </div>
    </div>
  );
}

SuggestTimeModal.propTypes = {
  onChooseTime: PropTypes.func,
};

SuggestTimeModal.defaultProps = {
  onChooseTime: () => {},
};
