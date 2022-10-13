import React from 'react';
import { useDispatch } from 'react-redux';

import DateTimePicker from '../../components/DateTimePicker/DateTimePicker';
import TabButton from '../../components/TabButton/TabButton';
import Tag from '../../components/Tag/Tag';
import TagDetail from '../../components/TagDetail/TagDetail';
import CreateNewTag from '../../components/CreateNewTag/CreateNewTag';

// import Calendar from '../../components/QDComponents/Calendar/Calendar';
import Calendar from '../../features/calendar/components/Calendar/Calendar';
import { getUserProfile } from '../../features/userManagement/ProfileSlice';

const listTasks = [
  {
    id: 1,
    text: "Event 1",
    start: "1h24 AM",
    end: "4AM",
    priority: 1
  },
  {
    id: 2,
    text: "Event 2",
    start: "1h24 AM",
    end: "4AM",
    priority: 2
  },
  {
    id: 3,
    text: "Event 3",
    start: "1h24 AM",
    end: "4AM",
    priority: 3
  },
  {
    id: 4,
    text: "Event 4",
    start: "1h24 AM",
    end: "4AM",
    priority: 4
  }
]

const description = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque doloremque, quis deleniti voluptatum cupiditate reprehenderit, eveniet iure officia veniam, aut maiores vel consectetur explicabo quisquam rem dolores in doloribus minu."

export default function TestPage() {
  const dispatch = useDispatch();

  async function handleClick() {
    dispatch(getUserProfile());
  }

  return (
    <div>
<<<<<<< HEAD
      <TagDetail tagTitle={"UIT"} description={description} listTasks={listTasks}/>
      <CreateNewTag />
=======
      <button onClick={handleClick} type="button">
        Click me
      </button>
      This is Home page
      <TabButton isSelected={false} />
      <Tag type="tagPending" />
      <DateTimePicker startDay={new Date()} hanldeChangeStartDay={() => {}} />
      <Calendar />
>>>>>>> a57cfd2e4676e0eccbbb34a33103938796783045
    </div>
  );
}
