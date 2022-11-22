import { useContext } from 'react'
import { AppContext } from '../App'
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {addDoc, getDocs, collection} from 'firebase/firestore'
import {db} from '../config/firebase'

function AccountRegistrationForm(){
    const {setUsername} = useContext(AppContext)
    let navigate = useNavigate()

    const schema = yup.object().shape({ 
        username: yup.string().required("please enter a username")
                            .min(5, "username must be at least 5 characters")
                            .max(15, "username must be at most 15 characters"),
        password: yup.string().required("please enter a password")
                            .min(8, "password must be at least 8 characters")
                            .max(15, "password must be at most 15 characters")
                            .matches(/(?=.*[0-9])/, "password must contain at least 1 number")
                            .matches(/\W+/, "password must contain at least one special character"),
        confirmPassword: yup.string().oneOf([yup.ref("password")], "passwords must be identical").required("please confirm the password entered"),
        email: yup.string().email().required("please enter an email"),
      })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema) 
    })

    const usersRef = collection(db, "accounts")

    let nameExists = false
    const onSubmit = async (data) =>{
        let count = 0
        setUsername(data.username)
        //check if username already exists
            //get all documents in 'users' and check if any of their usernames are equal to this username entered
        const allDocs = await getDocs(usersRef)
        allDocs.forEach((doc) => {
            count = count +1
            if((doc.data().username) === data.username)
                nameExists = true
        })
        if(nameExists)
            return alert("This username is already taken")
        await addDoc(usersRef, {
            email: data.email,
            id: (count),
            password: data.password,
            username: data.username, 
        })
        return navigate("/confirmation")
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder='enter a username...' {...register("username")}/> 
            <p>{errors.username?.message}</p> 
            <input type="text" placeholder='enter an email...' {...register("email")}/> 
            <p>{errors.email?.message}</p>
            <input type="password" placeholder='enter a password...' {...register("password")}/> 
            <p>{errors.password?.message}</p>
            <input type="password" placeholder='confirm your password...' {...register("confirmPassword")}/> 
            <p>{errors.confirmPassword?.message}</p>
            <input type="submit" />
        </form>
    )
}

export default AccountRegistrationForm