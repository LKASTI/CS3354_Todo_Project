import react from 'react'
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

function LoginForm(){
    let navigate = useNavigate()

    const schema = yup.object().shape({ 
        username: yup.string().required("must enter a username").min(5).max(15),
        password: yup.string().required("must enter a password")
                            .min(8, "password must be at least 8 characters")
                            .max(15, "password must be at most 15 characters")
                            .matches(/(?=.*[0-9])/, "password must contain at least 1 number")
                            .matches(/\W+/, "password must contain at least one special character"),
      })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema) 
    })

    const onSubmit = (data) =>{
        data ? navigate("/home") : console.log(data)
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder='username...' {...register("username")}/> 
            <p>{errors.username?.message}</p>
            <input type="password" placeholder='password...' {...register("password")}/> 
            <p>{errors.password?.message}</p>
            <input type="submit" value="login"/>
        </form>
    )
}

export default LoginForm