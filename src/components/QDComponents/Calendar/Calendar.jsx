import './Calendar.scss'
import Schedule from '../Schedule/Schedule'
import DateTimePicker from '../DateTimePicker/DateTimePicker'
import { useState } from 'react'

const Calendar = () => {

    const [startDay, setStartDay] = useState(new Date())

    const hanldeChangeStartDay = (day) => {
        setStartDay(day)
    }

    const [listTasks, setListTasks] = useState([
        {
            id: 1,
            text: "Event 1",
            start: "2022-10-17T10:30:00",
            end: "2022-10-17T13:00:00"
        },
        {
            id: 2,
            text: "Event 2",
            start: "2022-10-20T09:30:00",
            end: "2022-10-20T11:30:00",
        },
        {
            id: 3,
            text: "Event 3",
            start: "2022-10-10T12:00:00",
            end: "2022-10-10T15:00:00",
        },
        {
            id: 4,
            text: "Event 4",
            start: "2023-03-06T11:30:00",
            end: "2023-03-06T14:30:00",
        }
    ])

    return (
        <div className="calendar-container">
            <DateTimePicker startDay={startDay} hanldeChangeStartDay={hanldeChangeStartDay}/>
            <Schedule startDay={startDay} listTasks={listTasks}/>
        </div>
    )
}

export default Calendar