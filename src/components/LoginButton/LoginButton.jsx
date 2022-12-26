import React from 'react';
import PropTypes from 'prop-types';

import { ICON_FACEBOOK, ICON_GITHUB, ICON_GOOGLE } from '../../assets/icons';

import styles from './LoginButton.module.scss';

export default function LoginButton({ providerName, onClick }) {
  const imgSrc = (() => {
    switch (providerName) {
      case 'Google':
        return ICON_GOOGLE;

      case 'Facebook':
        return ICON_FACEBOOK;

      case 'Github':
        return ICON_GITHUB;

      default:
        return ICON_GOOGLE;
    }
  })();

  return (
    <div
      className={styles.container}
      id={providerName === 'Google' ? 'googleSignInButton' : ''}
    >
      <button type="button" onClick={onClick} className={styles.loginButton}>
        <img src={imgSrc} alt="Google icon" />
        <p>{`Sign in with ${providerName}`}</p>
      </button>
    </div>
  );
}

LoginButton.propTypes = {
  providerName: PropTypes.oneOf(['Google', 'Facebook', 'Github']).isRequired,
  onClick: PropTypes.func,
};

LoginButton.defaultProps = {
  onClick: () => {},
};
