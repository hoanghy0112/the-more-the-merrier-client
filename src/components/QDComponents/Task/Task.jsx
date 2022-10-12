const Task = (props) => {
    const task = props.task

    const height = new Date(task.end).getHours() - new Date(task.start).getHours()
    + (new Date(task.end).getMinutes()/60) - (new Date(task.start).getMinutes()/60)

    const y = new Date(task.start).getHours() + (new Date(task.start).getMinutes()/60)

    let x

    switch (new Date(task.start).getDay()) {
        case 0:
            x=6
            break;
        case 1:
            x=0
            break;
        case 2:
            x=1
            break
        case 3:
            x=2
            break
        case 4:
            x=3
            break
        case 5:
            x=4
            break
        case 6:
            x=5
            break
        default:
            break;
    }

    const taskContainer = {
        width: "calc(80%/7)",
        height: `calc(${height}*calc(40px + 2vmin))`,
        backgroundColor: "black",
        color: "white",
        position: "absolute",
        left: `calc(10% + calc(${x}*calc(1/7*80%) + ${x}px))`,
        top: `calc(3vmin + calc(${y}*calc(40px + 2vmin)))`,
    }

    return (
        <div style={taskContainer}>
            {task.text}
        </div>
    )
}

export default Task