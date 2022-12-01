import {AppContext} from '../App'
import { useContext, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import '../TodoList.css'
import { HomeButton } from '../components/HomeButton'

function TodoList() {
    const navigate = useNavigate()
    const [time, setTime] = useState({total: 0, days: 0, hours: 0, minutes: 0, seconds: 0})
    const [started, setStarted] = useState(false)
    const [pause, setPause] = useState(false)
    const [timeAccum, setTimeAccum] = useState(0)
    const [running, setRunning] = useState(false)
    const {taskList, setTaskList, points, setPoints} = useContext(AppContext)
    

    const updateTime = () => {
        setRunning(true)
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
            if(time.total <= 0)
            {
                setTime({
                    total: 0,
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                })
                alert('Task failed. No points awarded')
                return removeTask()
            }
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
        if(time.total <= 0)
        {
            setPoints(points)
        }
        else
        {
            setPoints(points+Math.ceil((difference*6)/10)) //formula for calculating points
        }
        setTaskList(taskList.splice(0, taskList.length-1))
    }

    return(
        <div className='todolist-background'>
            {/* {console.log(taskList)} */}
            <HomeButton/>
            {
                taskList.length === 0? 
                    <span className='todolist-emptylist'>You have no tasks left to complete...</span>
                :
                    taskList.map((task) =>{
                        return(
                            <div className="todolist-taskbox">
                                <span className='todolist-taskname-group'>Task Name: <br/><span className='todolist-taskname'>{task.taskname}</span></span>
                                <p className='todolist-taskdetails-group'>Task Description: <br/><span className='todolist-taskdetails'>{task.description}</span></p>
                                <p className='todolist-tasktime-group'>
                                    Time Left: 
                                    <br/>
                                    <span className='todolist-tasktime'>
                                        {started && running? 
                                                `${time.days} : ${time.hours} : ${time.minutes} : ${time.seconds}` 
                                            : 
                                                task.timeleft >= 1? 
                                                    `${task.timeleft} days`
                                                : task.timeleft >= 0.0416?
                                                    `${Math.round(task.timeleft*24)} hours`
                                                : task.timeleft >= 0.000694?
                                                    `${Math.round(task.timeleft*1140)} minutes`
                                                :
                                                    `${Math.round(task.timeleft*86400)} seconds`
                                        } 
                                    </span>
                                </p>
                                <div className='todolist-buttons'>
                                    <button className='todolist-buttons-start' onClick={() =>{startTask(task.timeleft)}}>start</button>
                                    <button className='todolist-buttons-pause' onClick={() =>{resume_pause()}}>{!pause? "pause" : "resume"}</button>
                                    <button className='todolist-buttons-complete' onClick={() =>{removeTask(task.timeleft)}}>complete</button>
                                </div>    
                                
                            </div>
                        )   
                    }
                    )
            }
        </div>
    )
}

export default TodoList