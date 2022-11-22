import {useContext} from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import App, { AppContext } from '../App'

function Home(){
    const {username} = useContext(AppContext)
    const navigate = useNavigate()
    if(!username)
    {
        return(
            <div>
                <h1>PLEASE LOGIN TO ACCESS HOME</h1>
                <button onClick={() =>{navigate("/login")}}>Login Page</button>
            </div>
        )
    }
    return(
        <div>
            <h1>HOME PAGE</h1>
            <button onClick={() => {navigate("/todolist")}}>TODO LIST</button>
        </div>
    )
}

export default Home