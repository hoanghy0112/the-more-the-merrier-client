/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { getAuth } from 'firebase/auth';

import { useSelector } from 'react-redux';

// import PropTypes from 'prop-types';

import styles from './AddUserModal.module.scss';
import { ICON_SEARCH } from '../../../../assets/icons';
import {
  ADD_NEW_USER_TO_GROUP,
  FIND_USER_BY_NAME,
} from '../../../../constants/apiURL';
import { selectCurrentGroupInfo } from '../../groupSlice';

export default function AddUserModal() {
  const [searchInput, setSearchInput] = useState('');
  const [users, setUsers] = useState([]);
  const [isNotFind, setIsNotFind] = useState(true);

  const currentGroup = useSelector(selectCurrentGroupInfo);

  useEffect(() => {
    const fetchData = async () => {
      const userList = await axios.get(FIND_USER_BY_NAME, {
        params: { name: searchInput },
      });
      setUsers(userList.data);
    };
    fetchData();
  }, [searchInput]);

  async function handleAddUser(user) {
    const userID = user._id;
    const groupID = currentGroup._id;
    const auth = getAuth();
    const accessToken = await auth.currentUser.getIdToken();
    await axios.put(
      `${ADD_NEW_USER_TO_GROUP}/${groupID}/add`,
      {
        members: [userID],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log({ userID });
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
                <div
                  className={styles.userContainer}
                  onClick={() => handleAddUser(user)}
                  style={{ cursor: 'pointer' }}
                >
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
