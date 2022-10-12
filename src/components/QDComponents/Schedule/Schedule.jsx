import './Schedule.scss'
import WeekDay from '../WeekDay/WeekDay'
import TimeLine from '../TimeLine/TimeLine'

const isExist = (dayInWeek, day) => {
    for(let i = 0; i < 7; i++) 
        if(dayInWeek[i].getDate() === day)
            return true
    return false
}

const Schedule = (props) => {
    const startDay = props.startDay

    const dayInWeek = []

    for(let i = startDay.getDate() - startDay.getDay() + 1; i <= startDay.getDate() - startDay.getDay() + 7;i++)
        dayInWeek.push(new Date(startDay.getFullYear(), startDay.getMonth(), i))

    const listTasks = props.listTasks.filter(task => 
            new Date(task.start).getFullYear() === startDay.getFullYear() &&
            new Date(task.start).getMonth() === startDay.getMonth() &&
            isExist(dayInWeek, new Date(task.start).getDate())
    )

    return (
        <div className="schedule-container">
            <WeekDay listDays={dayInWeek}/>
            <TimeLine listTasks={listTasks}/>
        </div>
    )
}

export default Schedule