import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, useHistory } from "react-router-dom"

import Home from "./Home";

const COHORT_NAME = '2209-FTB-ET-WEB-FT' //Creates our special key.
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`



const Login = async (Username, Password) => {
    const LoginSucess = document.querySelector('#LoginSucess')
    await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
                username: Username,
                password: Password
            }
        })

    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Username or password incorrect');
        }
    }).then((sucess) => {
        localStorage.setItem('LoggedIn', 'TRUE')
        localStorage.setItem('Username', Username)
        LoginSucess.innerHTML = 'Sucessfuly Logged in'
    }).catch((error) => {
        LoginSucess.innerHTML = error.message

    });
    
}

const Signup = async (NewUsername, NewEmail, NewPassword) => {
    const SignupSucess = document.querySelector('#SignupSucess')
    await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ //Adds in new data to our Json.file, to be sent to the server.
            user: {
                email: NewEmail,
                username: NewUsername,
                password: NewPassword,
            }
        })

    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            console.log(response)
            throw new Error('Account Already Exist');
        }
    }).then((sucess) => {
        SignupSucess.innerHTML = sucess.data.message
    }).catch((error) => {
        console.log(error)
        SignupSucess.innerHTML = error.message
    });
}


const Logout = () => {


    const [Password, setPassword] = useState('')
    const [Username, setUsername] = useState('')

    const [NewUsername, setNewUsername] = useState('')
    const [NewEmail, setNewEmail] = useState('')
    const [NewPassword, setNewPassword] = useState('')

    localStorage.setItem('LoggedIn', 'FALSE')

    function HandleClick(event) {
        event.preventDefault()
        let FormID = event.target.id
        if (FormID === "LoginForm") {

            Login(Username, Password)
        } else if (FormID === "SignupForm") {

            let result = Signup(NewUsername, NewEmail, NewPassword)
        }
    }

    return (
        <section id="LoginPage">

            <form id="LoginForm" onSubmit={HandleClick}>
                <div id="Login">
                    <label>Login</label>
                    <input
                        required
                        autoComplete="username"
                        value={Username} onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        placeholder="Email or Username"
                        className="Log"
                        id="Username"
                    ></input>
                    <input
                        required
                        autoComplete="current-password"
                        value={Password} onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        className="Log"
                        id="Password"
                    ></input>
                    <button id="LoginButton">Login</button>
                    <p id="LoginSucess"></p>
                </div>
            </form>

            <form id="SignupForm" onSubmit={HandleClick}>
                <div id="Signup">
                    <label>Sign Up</label>
                    <input
                        required
                        autoComplete="username"
                        value={NewUsername} onChange={(e) => setNewUsername(e.target.value)}
                        type="text"
                        placeholder="Username"
                        className="Log"
                        id="NewUsername"
                    ></input>

                    <input
                        required
                        autoComplete="email"
                        value={NewEmail} onChange={(e) => setNewEmail(e.target.value)}
                        type="email"
                        placeholder="Email"
                        className="Log"
                        id="NewEmail"
                    ></input>
                    <input
                        required
                        autoComplete="current-password"
                        value={NewPassword} onChange={(e) => setNewPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        className="Log"
                        id="NewPassword"
                    ></input>
                    <button id="SignupButton">Signup</button>
                    <p id="SignupSucess"></p>
                </div>
            </form>
        </section>
    )

}



export default Logout