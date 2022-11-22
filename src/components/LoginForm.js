import {useContext} from 'react'
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import "../Login.css"
import { getDocs, collection} from 'firebase/firestore'
import {db} from '../config/firebase'
import { AppContext } from '../App'


function LoginForm(){
    const {username, setUsername} = useContext(AppContext)
    let navigate = useNavigate()

    const schema = yup.object().shape({ 
        username: yup.string().required("must enter a username").min(5).max(15),
        password: yup.string().required("must enter a password"),
      })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema) 
    })

    const usersRef = collection(db, "accounts")

    const onSubmit = async (data) =>{
        let valid = false
        const allDocs = await getDocs(usersRef)
        allDocs.forEach((doc) =>{
            if(doc.data().username === data.username && doc.data().password === data.password)
                valid = true 
        })
        if(valid)
        {
            setUsername(data.username)
            return navigate("/home")
        }
            
        return alert("incorrect username or password")
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-boxes"> 
                <p className='error'>{errors.username?.message}</p> 
                <input id='username' type="text" placeholder='username...' {...register("username")}/> 
                <p className='error'>{errors.password?.message}</p>
                <input id='password' type="password" placeholder='password...' {...register("password")}/> 
            </div>
            <div>
                 <input className="login-button" type="submit" value="login"/>
            </div>
        </form>
    )
}

export default LoginForm