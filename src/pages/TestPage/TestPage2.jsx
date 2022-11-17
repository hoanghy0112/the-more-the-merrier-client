import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Profile from '../../features/userManagement/Profile';
import DescriptionPopUp from '../../components/DescriptionPopUp/DescriptionPopUp';
import DescriptionPopUpMinimize from '../../components/DescriptionPopUpMinimize/PopUpMinimize';
import CreateNewTask from '../../components/CreateNewTask/CreateNewTask';
import AddTag from '../../components/AddTag/AddTag';
import AddParticipant from '../../components/AddParticipant/AddParticipant';
import CreateNewGroup from '../../components/CreateNewGroup/CreateNewGroup';
import GroupDetail from '../../components/GroupDetail/GroupDetail';

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
      <CreateNewGroup />
      {/* <AddUserModal /> */}
    </div>
  );
}
