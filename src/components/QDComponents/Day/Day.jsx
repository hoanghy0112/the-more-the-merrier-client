import './Day.scss'

const Day = (props) => {
    return (
        <div className="day-container">
            {   
                props.day.date === new Date().getDate()
                && props.day.month === new Date().getMonth()
                && props.day.year === new Date().getFullYear()
                ? <div className='date active'>{props.day.date}</div> : <div className='date'>{props.day.date}</div>
            }
            <div className='day-of-week'>{props.day.day}</div>
        </div>
    )
}

export default Day