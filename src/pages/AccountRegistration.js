import React from 'react'
import { AppContext } from '../App'
import AccountRegistrationForm from '../components/AccountRegistrationForm' 
import '../Registration.css'

function AccountRegistration(){
    return(
        <div className='background'>
            <AccountRegistrationForm/>
        </div>
    )
}

export default AccountRegistration