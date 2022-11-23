import {AppContext} from '../App'
import { useContext, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './TodoList.css'

function TodoList() {
    const navigate = useNavigate()
    const {taskList, setTaskList} = useContext(AppContext)
    const {time, setTime} = useState({})
    const {currentTime, setCurrentTime} = useState(0)


    useEffect(() => {
        if(started)
        {
           const interval = setInterval(() => changeTime(), 1000)

            return () => clearInterval(interval) 
        }
        
    }, [time])
    
    const changeTime = () => {
        setCurrentTime((currentTime - 1000))
        setTime({
            days: (Math.floor(currentTime / (1000 * 60 * 60 * 24))),
            hours: (Math.floor((currentTime / (1000 * 60 * 60)) % 24)),
            minutes: (Math.floor((currentTime / (1000 * 60)) % 60)),
            seconds: (Math.floor((currentTime / (1000)) % 60)),
        })
    }
    let started = false
    const startTask = (days) =>{
        started = true
        setCurrentTime(days*24*60*60*1000)
        setTime({
            days: days,
            hours: 0,
            minutes: 0,
            seconds: 0,
        })
        
    }

    const removeTask = () => {
        setTaskList(taskList.splice(0, taskList.length-1))
    }

    return(
        <div>
            {console.log(taskList)}
            <h1>TODO LIST PAGE</h1>
            <button onClick={() =>{navigate("/task-creation")}}>create task</button>
            {taskList.map((task) =>{
                return(
                    <div className="taskbox">
                        <h1>Task Name: {task.taskname}</h1>
                        <h1>Task Description: {task.description}</h1>
                        <h1>Time Left: {started? `${time.days} : ${time.hours} : ${time.minutes} : ${time.seconds}` : `${task.timeleft} days`} </h1>
                        <button onClick={() =>{startTask(task.timeleft)}}>start task</button>
                        <button onClick={() =>{console.log(currentTime)}}>pause task</button>
                        <button onClick={() =>{removeTask()}}>complete task</button>
                    </div>
                )   
            })}
        </div>
    )
}

export default TodoList