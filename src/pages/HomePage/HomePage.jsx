import React from 'react';
import DateTimePicker from '../../components/DateTimePicker/DateTimePicker';
import TabButton from '../../components/TabButton/TabButton';
import Tag from '../../components/Tag/Tag';

// import Calendar from '../../components/QDComponents/Calendar/Calendar';
import Calendar from '../../features/calendar/components/Calendar/Calendar';

export default function HomePage() {
  return (
    // <Calendar />
    <div>
      This is Home page
      <TabButton isSelected={false} />
      <Tag type="tagPending" />
      <DateTimePicker startDay={new Date()} hanldeChangeStartDay={() => {}} />
      <Calendar />
    </div>
  );
}
