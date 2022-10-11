import React from 'react';
import PropTypes from 'prop-types';
import {
  ICON_FLAG,
  ICON_BOOK,
  ICON_COMPLETED,
  ICON_PENDING,
} from '../../assets/icons';
import './Tag.scss';

export default function Tag({ type }) {
  switch (type) {
    case 'tagFlag_1':
      return (
        <div className="container">
          <ICON_FLAG color="white" />
        </div>
      );
    case 'tagFlag_2':
      return (
        <div className="container" style={{ backgroundColor: '#9AD0EC' }}>
          <ICON_FLAG color="black" />
        </div>
      );
    case 'tagFlag_3':
      return (
        <div className="container" style={{ backgroundColor: '#EFDAD7' }}>
          <ICON_FLAG color="black" />
        </div>
      );
    case 'tagFlag_4':
      return (
        <div className="container" style={{ backgroundColor: '#E3BEC6' }}>
          <ICON_FLAG color="black" />
        </div>
      );
    case 'tagCompleted':
      return (
        <div className="container" style={{ backgroundColor: '#0DCF4F' }}>
          <img src={ICON_COMPLETED} />
        </div>
      );
    case 'tagPending':
      return (
        <div className="container" style={{ backgroundColor: '#0DCF4F' }}>
          <img src={ICON_PENDING} />
        </div>
      );
    case 'tagLearn':
      return (
        <div
          className="container"
          style={{ backgroundColor: '#0066FF', paddingRight: 1, paddingTop: 1 }}
        >
          <img src={ICON_BOOK} />
        </div>
      );
    default:
      return <h3>This tag is not include component</h3>;
  }
}

Tag.propTypes = {
  type: PropTypes.string.isRequired,
};
