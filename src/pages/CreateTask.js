import { useContext } from 'react'
import {AppContext} from '../App'
import react from 'react'
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {addDoc, getDocs, doc, setDoc, collection} from 'firebase/firestore'
import {db} from '../config/firebase'
import Box from '@mui/material/Box'
// import "../TaskCreation.css"
import { useNavigate } from 'react-router-dom'

function CreateTask(){
    let navigate = useNavigate()
    const {username} = useContext(AppContext)
    const {taskList, setTaskList} = useContext(AppContext)
    
    const schema = yup.object().shape({
        taskname: yup.string().max(100, "max of 100 characters").required("you must enter a task name"),
        timeleft: yup.number("you must enter a number").min(0.00001574, "min of one second").max(7, "max of 7 days").required("you must enter the time to complete task"),
        description: yup.string().max(200, "max of 200 characters").required("you must enter a description"),
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema) 
    })

    const tasksRef = collection(db, "tasks")

    const onSubmit = async (data) =>{
        setTaskList([...taskList, {
            taskname: data.taskname,
            timeleft: data.timeleft,
            description: data.description,
        }])
        await addDoc(tasksRef, {
            taskname: data.taskname,
            timeleft: data.timeleft,
            description: data.description,
        })    

        return navigate("/todolist")
    }
    
    return(
        <div className='task-creation'>
            {/* {console.log(taskList)} */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    Create a Task
                </Box>
                <Box>
                    <label>Task Name</label>
                    <input type="text" placeholder='ex) Take Out Trash' autoComplete='off' {...register("taskname")}/>
                    <p style={{color:"red"}}>{errors.taskname?.message}</p>
                    <label>Days to Complete</label>
                    <input type="number" step='0.0000000001' placeholder='ex) 5' autoComplete='off' {...register("timeleft")}/>
                    <p style={{color:"red"}}>{errors.timeleft?.message}</p>
                    <label>Task Details</label>
                    <textarea placeholder='ex) Take out the trash in the living room and the kitchen' autoComplete='off' {...register("description")}/>
                    <p style={{color:"red"}}>{errors.description?.message}</p>
                </Box>
                <Box>
                    <input type="submit"/> 
                </Box>
            </form>
        </div>
    )
}

export default CreateTask