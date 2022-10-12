import './WeekDay.scss'
import Day from '../Day/Day'

const dayInWeek = (day) => {
    switch (day) {
        case 0:
            return 'Sun'
        case 1:
            return 'Mon'
        case 2:
            return 'Tue'
        case 3:
            return 'Wed'
        case 4:
            return 'Thu'
        case 5:
            return 'Fri'
        case 6:
            return 'Sat'
        default:
            return 'Mon'
    }
}

const WeekDay = (props) => {
    const listDays = props.listDays
    return (
        <div className="weekday-container">
            {
                listDays && listDays.length > 0 && listDays.map(day => {
                    const propsDay = {date: day.getDate(), year: day.getFullYear(), month: day.getMonth(), day: dayInWeek(day.getDay())}
                    return(
                        <Day key={day.getDate()} day={propsDay} />
                    )
                })
            }
        </div>
    )
}

export default WeekDay