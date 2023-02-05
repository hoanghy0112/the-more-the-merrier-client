/* eslint-disable indent */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { useUserProfileByIDQuery } from '../../features/userManagement/profileAPI';
import { ICON_CLOSE, ICON_TICK, ICON_WARNING } from '../../assets/icons';
import { replyResponseOfUserAPI } from '../../features/tasksManagement/TasksAPI';
import useTaskByID from '../../features/tasksManagement/hooks/useTaskByID';
import { selectUserProfile } from '../../features/userManagement/ProfileSlice';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import styles from './UserIcon.module.scss';

export default function UserIcon({
  userID,
  taskID,
  size = 35,
  marginLeft = 0,
  response,
  withName = false,
  withResponse = false,
  isChoosing = false,
  choosable = false,
  onClick = () => {},
}) {
  const [isSentResponse, setIsSentResponse] = useState(false);

  const { data, error, isLoading } = useUserProfileByIDQuery(userID);
  const userInfo = useSelector(selectUserProfile);
  const { task, isLoading: isTaskLoading } = useTaskByID(taskID);

  const fullName = useMemo(() => {
    if (data) return `${data?.familyName || ''} ${data?.givenName || ''}`;
    return '';
  }, [data]);

  const backgroundColor = useMemo(() => {
    if (!isChoosing) return 'transparent';
    const state = response?.state || '';
    if (state === 'approve') return '#00cc2950';
    if (state === 'hover') return '#fada98';
    if (state === 'decline') return '#fc6d6d';
    return '#00a5ca50';
  }, [response?.state, isChoosing]);

  useEffect(() => {
    if (response?.adminState) setIsSentResponse(response.adminState);
  }, [response]);
  // console.log(data?._id, task?.admin);

  const stateColor = (state) => {
    if (state === 'hover') {
      return '#f9b122';
    }
    if (state === 'approve') {
      return '#52df4f';
    }
    if (state === 'decline') {
      return 'rgb(230, 0, 0)';
    }
    return 'gray';
  };

  return (
    <div className={response?.state === 'hover' && styles.wrapper}>
      <div
        className={[
          styles.container,
          isChoosing && choosable ? styles.choosing : null,
          withName ? styles.withName : null,
        ].join(' ')}
        userName={fullName}
        onClick={onClick}
        style={{
          marginLeft,
          backgroundColor,
        }}
      >
        <div className={styles.info}>
          {isLoading && !error ? (
            <p>...</p>
          ) : (
            <img
              src={data?.photo}
              alt="user icon"
              style={{ '--size': `${size}px` }}
            />
          )}
          {error ? <p>!</p> : null}
          {withName ? (
            <div className={styles.userInfo}>
              <p>{fullName}</p>
            </div>
          ) : null}
          {withResponse ? (
            <div className={styles.state}>
              <div style={{ backgroundColor: stateColor(response?.state) }}>
                {response?.state === 'hover' && (
                  <ICON_WARNING size={20} style={{ color: 'white' }} />
                )}
                {response?.state === 'approve' && (
                  <ICON_TICK size={20} style={{ color: 'white' }} />
                )}
                {response?.state === 'decline' && (
                  <ICON_CLOSE size={20} style={{ color: 'white' }} />
                )}
                <p>{response?.state || 'No response'}</p>
              </div>
            </div>
          ) : null}
        </div>
        {response?.state && withResponse ? (
          <div className={styles.response}>
            <p>{response?.message}</p>
          </div>
        ) : null}
      </div>

      {isSentResponse ? (
        <>
          {isSentResponse === 'approve' ? (
            <p className={styles.notiApprove}>This request was approved</p>
          ) : null}
          {isSentResponse === 'decline' ? (
            <p className={styles.notiDecline}>This request was rejected</p>
          ) : null}
        </>
      ) : null}

      {response?.state === 'hover' &&
      !isLoading &&
      !isTaskLoading &&
      userInfo?._id === task.admin ? (
        <div className={styles.adminReply}>
          <PrimaryButton
            onClick={() => {
              setIsSentResponse('approve');
              replyResponseOfUserAPI({
                id: taskID,
                userID: data?._id,
                state: 'approve',
              });
            }}
          >
            Approve
          </PrimaryButton>
          <PrimaryButton
            onClick={() => {
              setIsSentResponse('decline');
              replyResponseOfUserAPI({
                id: taskID,
                userID: data?._id,
                state: 'decline',
              });
            }}
            backgroundColor="rgb(230, 0, 0)"
            shadowColor="rgb(255, 183, 0)"
          >
            Decline
          </PrimaryButton>
        </div>
      ) : null}
    </div>
  );
}
