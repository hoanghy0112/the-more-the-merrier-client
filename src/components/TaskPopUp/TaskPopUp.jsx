/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useGroupInformation from '../../features/groupsManagement/hooks/useGroupInformation';
import useTaskByID from '../../features/tasksManagement/hooks/useTaskByID';
import CenteredModal from '../CenteredModal/CenteredModal';

import {
  ICON_CHART,
  ICON_CLOSE,
  ICON_LOCATE,
  ICON_TICK,
  ICON_WARNING,
} from '../../assets/icons';
import { selectUserProfile } from '../../features/userManagement/ProfileSlice';
import DateTimePicker from '../DateTimePicker/DateTimePicker';
import DescriptionLine from '../DescriptionLine/DescriptionLine';
import InviteUserModal from '../InviteUserModal/InviteUserModal';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import TimeTag from '../TimeTag/TimeTag';
import styles from './TaskPopUp.module.scss';
import { sendResponseAPI } from '../../features/tasksManagement/TasksAPI';
import {
  getResponseMessage,
  getResponseStateColor,
} from '../../utils/response';

export default function TaskPopUp({ id, isOpen, onClose }) {
  const navigate = useNavigate();

  const [isViewResponse, setIsViewResponse] = useState(false);

  const { task } = useTaskByID(id);

  const {
    title,
    belongTo,
    time,
    location: position,
    priority,
    responses,
  } = task || {};
  const { from: startTime, to: endTime } = time || [];
  const descriptions = (task?.descriptions || []).map((description, index) => ({
    id: index,
    sentence: description,
  }));
  const participants = new Set(task?.participants || []);
  const isDisable = true;

  const userProfile = useSelector(selectUserProfile);
  const messageRef = useRef();
  const response = useMemo(
    () => responses?.find(({ userID }) => userID === userProfile?._id),
    [responses],
  );

  const [responseState, setResponseState] = useState(
    responses?.find(({ userID }) => userID === userProfile?._id)?.state,
  );

  useEffect(() => {
    setResponseState(
      responses?.find(({ userID }) => userID === userProfile?._id)?.state,
    );
  }, [userProfile._id, responses]);

  useEffect(() => {
    if (response) setIsViewResponse(true);
    else setIsViewResponse(false);
  }, [response?.message, response?.state]);

  const { groupInfo } = useGroupInformation(belongTo);

  function getTagStyle(priorityNum) {
    switch (priorityNum) {
      case 1:
        return ["Can't be ignored", '#1572A1', 'white'];
      case 2:
        return ['Important', '#9AD0EC', 'black'];
      case 3:
        return ['Normal', '#EFDAD7', 'black'];
      case 4:
        return ['Can be ignored', '#E3BEC6', 'black'];

      default:
        return ['Normal', '#EFDAD7', 'black'];
    }
  }

  const [priorityText, priorityBackgroundColor, priorityColor] =
    getTagStyle(priority);

  function sendResponse() {
    const message = messageRef?.current.value;
    setIsViewResponse(true);
    sendResponseAPI({ id, message, state: responseState });
    onClose();
  }

  return (
    <CenteredModal isOpen={isOpen} onClose={onClose}>
      {task?._id ? (
        <div className={styles.container}>
          <span className={styles.taskTitle}>
            <input
              value={title}
              tabIndex="0"
              className={styles.input}
              placeholder="Task’s title..."
              spellCheck="false"
              disabled={isDisable}
            />
            <p>
              <span>Task of </span>
              <span onClick={() => navigate(`/home/group/${belongTo}`)}>
                {groupInfo?.name}
              </span>
            </p>
          </span>
          <div className={styles.timeContainer}>
            <div className={styles.todoTime}>
              <TimeTag time={startTime} disabled={isDisable} />
              -
              <TimeTag time={endTime} disabled={isDisable} />
            </div>
            <span className={styles.timePicker}>
              <DateTimePicker
                startDay={startTime}
                hanldeChangeStartDay={() => {}}
                disabled={isDisable}
              />
            </span>
          </div>
          <div className={styles.sentencesContainer}>
            <div className={styles.desSentence}>
              <img src={ICON_LOCATE} alt="time" />
              <input
                className={styles.input}
                value={position}
                style={{ overflowWrap: '-moz-initial' }}
                placeholder={
                  isDisable ? 'No data' : 'Enter your task’s location here...'
                }
                spellCheck="false"
                disabled={isDisable}
              />
            </div>
            <div className={styles.desSentence_2}>
              <img src={ICON_CHART} alt="priority" />
              <div className={styles.priorityDropDown}>
                <div
                  className={styles.priorityHeader}
                  style={{
                    '--background-color': priorityBackgroundColor,
                    '--color': priorityColor,
                  }}
                >
                  <p>{priorityText}</p>
                </div>
              </div>
            </div>
            <InviteUserModal
              time={{ from: startTime, to: endTime }}
              responses={responses}
              participants={participants}
              disabled={isDisable}
            />
          </div>
          <div className={styles.descriptionContainer}>
            <p className={styles.text}>Description</p>
            <div className={styles.detailDescription}>
              {descriptions.map(({ sentence, id }) => (
                <DescriptionLine
                  key={id}
                  sentence={sentence}
                  disabled={isDisable}
                />
              ))}
            </div>
          </div>

          {isViewResponse ? (
            <div className={styles.userResponse}>
              <p>Your response</p>
              <div className={styles.content}>
                <p
                  className={styles.state}
                  style={{
                    backgroundColor: getResponseStateColor(response?.state),
                  }}
                >
                  {getResponseMessage(response?.state)}
                </p>
                <p>{response?.message}</p>
              </div>
              {response?.state === 'hover' ? (
                <>
                  {response?.adminState === 'approve' ? (
                    <p className={styles.approve}>
                      Your request has been approved
                    </p>
                  ) : null}
                  {response?.adminState === 'decline' ? (
                    <p className={styles.decline}>
                      Your request has been declined
                    </p>
                  ) : null}
                  {response?.adminState === 'no-response' ? (
                    <p className={styles.noreply}>Admin has not replied yet</p>
                  ) : null}
                </>
              ) : null}
              <PrimaryButton onClick={() => setIsViewResponse(false)}>
                Edit your response
              </PrimaryButton>
            </div>
          ) : (
            <div className={styles.response}>
              <p>Your response</p>
              <textarea
                className={styles.comment}
                rows="4"
                defaultValue={response?.message}
                spellCheck={false}
                placeholder="Write your comment here"
                ref={messageRef}
              />
              <div className={styles.buttons}>
                <PrimaryButton
                  backgroundColor={getResponseStateColor('decline')}
                  shadowColor={getResponseStateColor('decline')}
                  onClick={() => {
                    setResponseState('decline');
                  }}
                  reversed={responseState !== 'decline'}
                  disabled={responseState === 'decline'}
                >
                  <div className={styles.ok}>
                    <ICON_CLOSE
                      size={25}
                      style={{
                        color:
                          responseState !== 'decline'
                            ? getResponseStateColor('decline')
                            : 'white',
                      }}
                    />
                    <p>Decline</p>
                  </div>
                </PrimaryButton>
                <PrimaryButton
                  backgroundColor={getResponseStateColor('hover')}
                  shadowColor={getResponseStateColor('hover')}
                  reversed={responseState !== 'hover'}
                  disabled={responseState === 'hover'}
                  onClick={() => {
                    setResponseState('hover');
                  }}
                >
                  <div className={styles.ok}>
                    <ICON_WARNING
                      size={25}
                      style={{
                        color:
                          responseState !== 'hover'
                            ? getResponseStateColor('hover')
                            : 'white',
                      }}
                    />
                    <p>Discuss</p>
                  </div>
                </PrimaryButton>
                <PrimaryButton
                  backgroundColor={getResponseStateColor('approve')}
                  shadowColor={getResponseStateColor('approve')}
                  reversed={responseState !== 'approve'}
                  disabled={responseState === 'approve'}
                  onClick={() => {
                    setResponseState('approve');
                  }}
                >
                  <div className={styles.ok}>
                    <ICON_TICK
                      size={25}
                      style={{
                        color:
                          responseState !== 'approve'
                            ? getResponseStateColor('approve')
                            : 'white',
                      }}
                    />
                    <p>Approve</p>
                  </div>
                </PrimaryButton>
              </div>
              <div className={styles.send}>
                <PrimaryButton onClick={sendResponse}>
                  Send response
                </PrimaryButton>
                <PrimaryButton
                  backgroundColor="rgb(230, 0, 0)"
                  shadowColor="rgb(255, 183, 0)"
                  onClick={() =>
                    response ? setIsViewResponse(true) : onClose()
                  }
                >
                  Cancel
                </PrimaryButton>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </CenteredModal>
  );
}
