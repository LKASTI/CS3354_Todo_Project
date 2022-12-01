import {useNavigate} from 'react-router-dom'
import { HomeButton } from '../components/HomeButton'
import '../task-creation-success.css'

function TaskCreationSuccess(){
    const navigate = useNavigate()

    return(
        <div>
            <span className="task-creation-success">
                <span>Task Creation Successful</span>
            </span>
            <span className='task-creation-return'>
                <span>Click the Home button to<br></br> return home</span>
            </span>
            <HomeButton/>
        </div>
    )
}

export default TaskCreationSuccess