import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App'
import LoginForm from '../components/LoginForm'

function Login(){
    const {} = useContext(AppContext)
    let navigate = useNavigate()
    
    return(
        <div>
            <LoginForm/>
            {/* <button onClick={() => {navigate("/home")}}>LOGIN</button> */}
        </div>
    )
}

export default Login