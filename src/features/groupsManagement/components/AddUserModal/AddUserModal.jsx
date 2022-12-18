/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import React, { useEffect, useState } from 'react';

// import PropTypes from 'prop-types';

import { ICON_SEARCH } from '../../../../assets/icons';
import { FIND_USER_BY_NAME } from '../../../../constants/apiURL';
import styles from './AddUserModal.module.scss';

export default function AddUserModal({ addUser }) {
  const [searchInput, setSearchInput] = useState('');
  const [users, setUsers] = useState([]);
  const [isNotFind, setIsNotFind] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const userList = await axios.get(FIND_USER_BY_NAME, {
        params: { name: searchInput },
      });
      setUsers(userList.data);
    };
    if (searchInput) fetchData();
    else setIsNotFind(true);
  }, [searchInput]);

  async function handleInviteUser(user) {
    addUser(user);
  }

  const handleSearchChange = async (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className={styles.container}>
      {isNotFind ? (
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
            onChange={(e) => {
              setIsNotFind(false);
              handleSearchChange(e);
            }}
            placeholder="Enter tag name here ..."
          />
        </div>
      ) : (
        <>
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
              onChange={handleSearchChange}
              placeholder="Enter user name to search..."
            />
          </div>
          <div className={styles.listUser}>
            {users ? (
              users.map((user) => (
                <div
                  className={styles.userContainer}
                  onClick={() => handleInviteUser(user)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className={styles.imageContainer}>
                    <img src={user.photo} alt="avatar" />
                  </div>

                  <div className={styles.information}>
                    <div className={styles.nameContainer}>
                      <p>{`${user.familyName} ${user.givenName}`}</p>
                    </div>
                    <p className={styles.email}>{user.email}</p>
                  </div>
                </div>
              ))
            ) : (
              <div>Loading</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
