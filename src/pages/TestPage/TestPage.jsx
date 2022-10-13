import React from 'react';

import TagDetail from '../../components/TagDetail/TagDetail';
import DesPopUp from '../../components/DescriptionPopUp/DescriptionPopUp';

const listTasks = [
  {
    id: 1,
    text: 'event 1',
    start: '14h',
    end: '18h',
    priority: 1,
  },
  {
    id: 1,
    text: 'event 1',
    start: '14h',
    end: '18h',
    priority: 1,
  },
];

export default function TestPage() {
  return (
    <div style={{ padding: 50 }}>
      {/* <TagDetail tagTitle="uit" description="abc" listTasks={listTasks} /> */}
      <DesPopUp />
    </div>
  );
}
