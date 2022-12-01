import { useContext, useState } from 'react'
import {AppContext} from '../App'
import react from 'react'
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {addDoc, getDocs, doc, setDoc, collection} from 'firebase/firestore'
import {db} from '../config/firebase'
import Box from '@mui/material/Box'
import '../create-task.css'
// import "../TaskCreation.css"
import { useNavigate } from 'react-router-dom'
import { HomeButton } from '../components/HomeButton'

function CreateTask(){
    const navigate = useNavigate()
    const {username} = useContext(AppContext)
    const {taskList, setTaskList} = useContext(AppContext)
    const [nameCharacters, setNameCharacters] = useState(0)
    const [descriptionCharacters, setDescriptionCharacters] = useState(0)
    
    const schema = yup.object().shape({
        taskname: yup.string().max(30, "max of 30 characters").required("you must enter a task name"),
        timeleft: yup.number().typeError("you must enter a number").min(0.00001574, "min of one second").max(7, "max of 7 days").required("you must enter a completion time"),
        description: yup.string().max(250, "max of 250 characters").required("you must enter a description"),
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

        return navigate("/task-creation/success")
    }
    
    return(
        <div className="create-task-container">
            
            <span className="create-task-title">
                <span>Create a Task</span>
            </span>
            
            <form onSubmit={handleSubmit(onSubmit)} className="create-task-taskpage">
                <HomeButton/> 
                <div className="create-task-task-name-group">
                    <span className="create-task-text">
                        <span>Task Name:</span>
                        <input className='create-task-nameinput' type="text" placeholder='Ex) Take Out Trash' autoComplete='off' 
                            {...register("taskname", {onChange : (e) => {setNameCharacters(e.target.value.length)}})}/>
                    </span>
                    <span className="create-task-name-chars">
                        <span style={{color: nameCharacters > 30? 'red' : 'inherit'}}>{nameCharacters}/30</span>
                    </span>
                    <span className='create-task-name-errors'>
                        <span style={{color:"red"}}>{errors.taskname?.message}</span>
                    </span>
                </div>

                <div className="create-task-dayto-complete-group">
                    <span className="create-task-text06">
                        <span>Days to Complete:</span>
                        <input className='create-task-timeinput' type="number" step='0.0000000001' placeholder='Ex) 5 days' autoComplete='off' {...register("timeleft")}/>
                    </span>
                    <span className="create-task-time-errors">
                        <span style={{color:"red"}}>{errors.timeleft?.message}</span>
                    </span>
                </div>

                <div className="create-task-task-details-group">
                    <span className="create-task-text10">
                        <span>Task Details:</span>
                        <textarea className='create-task-detailsinput' placeholder='Ex) Take out the trash in the living room and the kitchen' autoComplete='off' 
                            {...register("description", {onChange : (e) => {setDescriptionCharacters(e.target.value.length)}})}/>
                    </span>
                    <span className="create-task-details-chars">
                        <span style={{color: descriptionCharacters > 250? 'red' : 'inherit'}}>{descriptionCharacters}/250</span>
                    </span>
                    <span className='create-task-details-errors'>
                        <span style={{color:"red"}}>{errors.description?.message}</span>
                    </span>
                </div>
                <input 
                    type='submit'
                    value=''
                    className='create-task-submit-button'
                />
            </form>
        </div>
        // <div className='task-creation'>
        //     {console.log(taskList)}
        //     <form onSubmit={handleSubmit(onSubmit)}>
        //         <Box>
        //             Create a Task
        //         </Box>
        //         <Box>
        //             <label>Task Name</label>
        //             <input type="text" placeholder='ex) Take Out Trash' autoComplete='off' {...register("taskname")}/>
        //             <p style={{color:"red"}}>{errors.taskname?.message}</p>
        //             <label>Days to Complete</label>
        //             <input type="number" step='0.0000000001' placeholder='ex) 5' autoComplete='off' {...register("timeleft")}/>
        //             <p style={{color:"red"}}>{errors.timeleft?.message}</p>
        //             <label>Task Details</label>
        //             <textarea placeholder='ex) Take out the trash in the living room and the kitchen' autoComplete='off' {...register("description")}/>
        //             <p style={{color:"red"}}>{errors.description?.message}</p>
        //         </Box>
        //         <Box>
        //             <input type="submit"/> 
        //         </Box>
        //     </form>
        // </div>
    )
}

export default CreateTask