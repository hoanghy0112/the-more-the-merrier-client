import React, { useEffect } from 'react';

import CreateNewGroup from '../../components/CreateNewGroup/CreateNewGroup';
import GroupDetail from '../../components/GroupDetail/GroupDetail';
import AddUserModal from '../../features/groupsManagement/components/AddUserModal/AddUserModal';
import AddUserScreen from '../../features/groupsManagement/components/AddUserScreen/AddUserScreen';

const x = new Date();
x.setHours(x.getHours() - Math.random() * (3 - 1));
const y = new Date();
y.setHours(y.getHours() + Math.random() * (3 - 1));
const data = [
  {
    id: 1,
    type: 'tagUIT',
    input: 'UIT',
    shape: 'circle',
    description: 'Các môn học thuộc trường Đại học công nghệ thông tin',
  },
  {
    id: 2,
    type: 'tagLearn',
    input: 'Learning',
    shape: 'circle',
    description: 'Các hoạt động tự học\nLiên quan đến việc lập trình',
  },
];

export default function TestPage2() {
  useEffect(() => {
    // dispatch(getUserProfile());
  }, []);

  return (
    <div style={{ padding: 40 }}>
      {/* <CreateNewTask data={data} /> */}
      {/* <AddTag data={data} /> */}
      {/* <Profile /> */}
      {/* <AddParticipant /> */}
      {/* <CreateNewGroup /> */}
      {/* <AddUserModal /> */}
      <AddUserScreen />
    </div>
  );
}
