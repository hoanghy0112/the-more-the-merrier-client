import React from 'react';
import TabButton from '../../components/TabButton/TabButton';
import Tag from '../../components/Tag/Tag';

import Calendar from '../../components/QDComponents/Calendar/Calendar';

export default function HomePage() {
  return (
    <Calendar />
    // <div>
    //   This is Home page
    //   <TabButton isSelected={false} />
    //   <Tag type="tagPending" />
    //   <Calendar />
    // </div>
  );
}
