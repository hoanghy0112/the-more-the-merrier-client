import React from 'react';
import PropTypes from 'prop-types';
import './TabButton.scss';
import { ICON_HOUSE } from '../../assets/icons';

export default function TabButton({ isSelected, onClick }) {
  if (isSelected) {
    return (
      // eslint-disable-next-line max-len
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <div className="selected" onClick={onClick}>
        <ICON_HOUSE color="white" className="house" />
        <p className="home-text light-text">Home</p>
      </div>
    );
  }
  return (
    <div className="selected light-background">
      <ICON_HOUSE color="black" className="house" />
      <p className="home-text dark-text">Home</p>
    </div>
  );
}

TabButton.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
