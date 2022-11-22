import {AppContext} from '../App'
import { useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import './TodoList.css'

function TodoList() {
    const {taskList, setTaskList} = useContext(AppContext)
    const navigate = useNavigate()
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
                        <h1>Time Left: {task.timeleft} days</h1>
                        <button onClick={() =>{removeTask()}}>complete task</button>
                    </div>
                )   
            })}
        </div>
    )
}

export default TodoList