import React, { useEffect } from 'react';

import PropTypes from 'prop-types';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Calendar from '../Calendar/Calendar';

import {
  getBusyTimeOfGroup,
  selectGroupBusyTime,
} from '../../../groupsManagement/groupSlice';

// import styles from './GroupCalendar.module.scss';

export default function GroupCalendar({ startDate }) {
  const dispatch = useDispatch();
  const location = useLocation();

  const groupBusyTimes = useSelector(selectGroupBusyTime);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const groupID = location.pathname.split('/').slice(-1)[0];
        const from = new Date(startDate).getTime();
        const to = new Date(from + 7 * 24 * 60 * 60 * 1000).getTime();
        dispatch(getBusyTimeOfGroup({ groupID, from, to }));
      }
    });

    return () => unsubscribe();
  }, [startDate]);

  return <Calendar startDate={startDate} groupBusyTimes={groupBusyTimes} isGroup />;
}

GroupCalendar.propTypes = {
  startDate: PropTypes.instanceOf(Date),
};

GroupCalendar.defaultProps = {
  startDate: new Date(),
};
