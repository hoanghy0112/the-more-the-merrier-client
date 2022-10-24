import PropTypes from 'prop-types';
import React from 'react';
import styles from './EditTag.module.scss';

export default function EditTag({ input, color }) {
  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: color,
      }}
    >
      <p className={styles.textTag}>{input}</p>
    </div>
  );
}

EditTag.propTypes = {
  input: PropTypes.string,
  color: PropTypes.string,
};

EditTag.defaultProps = {
  input: '',
  color: '#00A6CA',
};
