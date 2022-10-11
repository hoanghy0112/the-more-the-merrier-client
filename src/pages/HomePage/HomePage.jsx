import React from 'react';
import TabButton from '../../components/TabButton/TabButton';
import Tag from '../../components/Tag/Tag';

import Calendar from '../../features/calendar/components/Calendar/Calendar';

export default function HomePage() {
  return (
    <div>
      This is Home page
      <TabButton isSelected={false} />
      <Tag type="tagPending" />
      <Calendar />
    </div>
  );
}
