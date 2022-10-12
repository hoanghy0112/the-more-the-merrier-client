import React from 'react';
import { useDispatch } from 'react-redux';

import DateTimePicker from '../../components/DateTimePicker/DateTimePicker';
import TabButton from '../../components/TabButton/TabButton';
import Tag from '../../components/Tag/Tag';

// import Calendar from '../../components/QDComponents/Calendar/Calendar';
import Calendar from '../../features/calendar/components/Calendar/Calendar';
import { getUserProfile } from '../../features/userManagement/ProfileSlice';

export default function TestPage() {
  const dispatch = useDispatch();

  async function handleClick() {
    dispatch(getUserProfile());
  }

  return (
    <div>
      <button onClick={handleClick} type="button">
        Click me
      </button>
      This is Home page
      <TabButton isSelected={false} />
      <Tag type="tagPending" />
      <DateTimePicker startDay={new Date()} hanldeChangeStartDay={() => {}} />
      <Calendar />
    </div>
  );
}
