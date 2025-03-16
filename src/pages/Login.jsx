import React from 'react'
import LoginForm from '../components/auth/LoginForm'
import './../styles/auth.css'
import SwitchLanguage from '../components/common/SwitchLanguage'


const Login = () => {

    return (
        <div className='login-container'>
            <div className='switch-language-container'>
                <SwitchLanguage handleDirection={() => {
                    if (localStorage.getItem("lang") === "en") {
                        document.body.style.direction = "ltr";
                    } else {
                        document.body.style.direction = "rtl";
                    }
                }} />
            </div>
            <LoginForm />
        </div>
    )
}

export default Login
