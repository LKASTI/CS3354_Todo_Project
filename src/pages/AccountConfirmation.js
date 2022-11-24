import {useContext} from 'react'
import { AppContext } from '../App'
import { useNavigate } from 'react-router-dom'

function AccountConfirmation(){
    let navigate = useNavigate()

    const {username} = useContext(AppContext)
    return(
        <div>
            <h1>succesful account creation for {username}</h1>
            <button onClick={() =>{navigate("/login")}}>continue</button>
        </div>
    )
}

export default AccountConfirmation 