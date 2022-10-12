import './TimeLine.scss'
import Task from '../Task/Task'

const hours = ['0 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM',
    '9 AM', '10 AM', '11 AM', '12 AM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM',
    '8 PM', '9 PM', '10 PM', '11 PM']

const TimeLine = (props) => {

    const listTasks = props.listTasks

    return (
        
        <div className='time-line-container' >
            <div className='space'></div>
            {
                hours.map(hour => {
                    return (
                        <div key={hour} className='hour-line-wrapper'>
                            <div className='time'>
                                {hour}
                            </div>
                            <div className='line'></div>
                        </div>
                    )
                })
            }
            {
                listTasks && listTasks.length > 0 && listTasks.map(task => {
                    return (
                        <Task key={task.id} task={task}/>
                    )
                })
            }
        </div>
    )
}

export default TimeLine