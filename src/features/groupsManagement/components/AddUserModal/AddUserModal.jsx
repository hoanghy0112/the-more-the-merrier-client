import React, { useState, useEffect } from 'react';
import axios from 'axios';

// import PropTypes from 'prop-types';

import styles from './AddUserModal.module.scss';
import { ICON_SEARCH } from '../../../../assets/icons';
import { FIND_USER_BY_NAME } from '../../../../constants/apiURL';

export default function AddUserModal() {
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
    fetchData();
  }, [searchInput]);

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
            onClick={() => setIsNotFind(false)}
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
              placeholder="Enter tag name here ..."
            />
          </div>
          <div className={styles.listUser}>
            {users ? (
              users.map((user) => (
                <div className={styles.userContainer}>
                  <div className={styles.imageContainer}>
                    <img src={user.photo} alt="avatar" />
                  </div>

                  <div className={styles.nameContainer}>
                    <p>{`${user.familyName} ${user.givenName}`}</p>
                  </div>
                  <p className={styles.email}>{user.email}</p>
                </div>
              ))
            ) : (
              <div>Loading</div>
            )}
          </div>
        </>
      )}
      {/* <div className={styles.searchContainer}>
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
          placeholder="Enter tag name here ..."
        />
      </div>
      <div className={styles.listUser}>
        {users ? (
          users.map((user) => (
            <div className={styles.userContainer}>
              <div className={styles.imageContainer}>
                <img src={user.photo} alt="avatar" />
              </div>

              <div className={styles.nameContainer}>
                <p>{`${user.familyName} ${user.givenName}`}</p>
              </div>
              <p className={styles.email}>{user.email}</p>
            </div>
          ))
        ) : (
          <div>Loading</div>
        )}
      </div> */}
    </div>
  );
}
