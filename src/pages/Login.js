import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App'
import {auth, provider} from '../config/firebase'
import {signInWithPopup} from 'firebase/auth'
import LoginForm from '../components/LoginForm'
import '../Login.css'

function Login(){
    const {} = useContext(AppContext)
    let navigate = useNavigate()
    
    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider)
    }

    return(
        <div className="login">
            {console.log(Date.parse(new Date()))}
            <div>
                <LoginForm/>
                <div className="sign">
                    <button id="signup-button" onClick={() => {navigate("/registration")}}>sign-up</button>
                    <button id='google-login' onClick={() =>{signInWithGoogle()}}>sign in with Google</button>   
                </div>
                
            </div>
        </div>
    )
}

export default Login