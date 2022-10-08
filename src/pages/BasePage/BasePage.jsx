import React from 'react';
import PropTypes from 'prop-types';

export default function BasePage({ children }) {
  return <div>{children}</div>;
}

BasePage.propTypes = {
  children: PropTypes.node,
};

BasePage.defaultProps = {
  children: '',
};
