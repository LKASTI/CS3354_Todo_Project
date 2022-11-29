import {useContext} from 'react'
import { AppContext } from '../App'
import { useNavigate } from 'react-router-dom'
import '../Login.css'

function AccountConfirmation(){
    let navigate = useNavigate()

    const {username} = useContext(AppContext)
    return(
        <div className='login'>
                <div className='success'>Successful Registration for: {username}</div>
                <button  id="confirm" className='login-button'  onClick={() =>{navigate("/login")}}>Login</button> 
        </div>
    )
}

export default AccountConfirmation 