import {AppContext} from '../App'
import { useContext, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './TodoList.css'

function TodoList() {
    const navigate = useNavigate()
    const [time, setTime] = useState({total: 0, days: 0, hours: 0, minutes: 0, seconds: 0})
    const [started, setStarted] = useState(false)
    const [pause, setPause] = useState(false)
    const [timeAccum, setTimeAccum] = useState(0)
    const {taskList, setTaskList, points, setPoints} = useContext(AppContext)
    

    const updateTime = () => {
        setTimeAccum(timeAccum+1000)
        setTime({
            total: time.total - 1000,
            days: Math.floor((time.total/(1000*60*60*24))),
            hours: Math.floor((time.total/(1000*60*60)) % 24),
            minutes: Math.floor((time.total/(1000*60)) % 60),
            seconds: Math.floor((time.total/(1000)) % 60),
        })
    }
        
    const startTask = (days) =>{
        setStarted(true)
        setTime({
            total: days*24*60*60*1000,
            days: days,
            hours: 0,
            minutes: 0,
            seconds: 0,
        })
        
    }

    const resume_pause = async () =>{
        await setPause(!pause)
        if(pause === true)
        {
            console.log("working")
            setTime({
                total: time.total,
                days: time.days,
                hours: time.hours,
                minutes: time.minutes,
                seconds: time.seconds,
            })
        }
    }

    useEffect(() => {
        if(started && !pause)
        {
            const interval = setInterval(() => {updateTime()}, 1000)

            return () => clearInterval(interval) 
        }
        
    }, [time])

    const removeTask = (days) => {
        setStarted(false)
        setPause(false)
        const timeAccumulated = timeAccum/(1000*60*60) //in hours
        const timeToComplete = (days*24) //in hours
        const difference = timeToComplete - timeAccumulated 
        setPoints(points+Math.ceil((difference*6)/10)) //formula for calculating points
        setTaskList(taskList.splice(0, taskList.length-1))
    }

    return(
        <div>
            {/* {console.log(taskList)} */}
            <h1>TODO LIST PAGE</h1>
            <p>Points: {points}</p>
            <button onClick={() =>{navigate("/task-creation")}}>create task</button>
            {taskList.map((task) =>{
                return(
                    <div className="taskbox">
                        <h1>Task Name: {task.taskname}</h1>
                        <h1>Task Description: {task.description}</h1>
                        <h1>Time Left: {started? `${time.days} : ${time.hours} : ${time.minutes} : ${time.seconds}` : `${task.timeleft} days`} </h1>
                        <button onClick={() =>{startTask(task.timeleft)}}>start task</button>
                        <button onClick={() =>{resume_pause()}}>{!pause? "pause task" : "resume task"}</button>
                        <button onClick={() =>{removeTask(task.timeleft)}}>complete task</button>
                    </div>
                )   
            })}
        </div>
    )
}

export default TodoList