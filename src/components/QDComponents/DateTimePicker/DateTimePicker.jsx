import './DateTimePicker.scss'
import CalendarLogo from './calendar.svg'
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useEffect, useState } from 'react';

const DateTimePicker = (props) => {

    const [isOpenDateTimePicker, setIsOpenDateTimePicker] = useState(false)
    const [selected, setSelected] = useState(props.startDay);
    const selectedDay = props.startDay

    useEffect(() => {
        if (!selected)
            props.hanldeChangeStartDay(new Date())
        else
            props.hanldeChangeStartDay(selected)
    }, [selected])

    return (
        <div>
            <div className="date-time-picker-container">
                <div className='selected-month'>{format(selectedDay, 'LLLL')}</div>
                <div onClick={() => setIsOpenDateTimePicker(!isOpenDateTimePicker)} className='date-time-picker-logo' >
                    <img src={CalendarLogo}></img>
                </div>
            </div>
            {isOpenDateTimePicker &&
                <div className='date-time-picker'>
                    <DayPicker mode='single' selected={selected} onSelect={setSelected} />
                </div>
            }
        </div>

    )

}

export default DateTimePicker