import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { ICON_SEARCH } from '../../assets/icons';
import styles from './AddParticipant.module.scss';
import Tag from '../Tag/Tag';
import { selectUserProfile } from '../../features/userManagement/ProfileSlice';

export default function AddParticipant({ data }) {
  const [searchInput, setSearchInput] = useState('');
  const [tagList, setTagList] = useState(data || []);
  const user = useSelector(selectUserProfile);

  const handleSearchTag = (e) => {
    setSearchInput(e.target.value);
    setTagList(
      data.filter((tag) =>
        tag.input.toLowerCase().includes(e.target.value.toLowerCase()),
      ),
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <img src={ICON_SEARCH} alt="search" />
        <input
          className={styles.search}
          style={{
            border: 'none',
            fontSize: 11,
            height: '90%',
          }}
          value={searchInput}
          onChange={handleSearchTag}
          placeholder="Enter tag name here ..."
        />
      </div>
      <div className={styles.userContainer}>
        {user ? (
          <>
            <div className={styles.imageContainer}>
              <img src={user.photo} alt="avatar" />
            </div>

            <div className={styles.nameContainer}>
              <p>{`${user.familyName} ${user.givenName}`}</p>
            </div>
            <p className={styles.email}>{user.email}</p>
          </>
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
}

AddParticipant.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      type: PropTypes.string,
      input: PropTypes.string,
      shape: PropTypes.string,
      description: PropTypes.string,
    }),
  ).isRequired,
};
