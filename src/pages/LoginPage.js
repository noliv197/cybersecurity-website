import Form from "../components/Form";
import Navbar from "../components/Navbar"
import { useState } from "react";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";

export default function LoginPage(props){
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPass, setLoginPass] = useState("");
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();

        let user = {email: loginEmail}
        const encUser = CryptoJS.AES.encrypt(JSON.stringify(user),'key').toString();
        sessionStorage.setItem("user",encUser);
        navigate("/");
    }

    const formElements = [
        {
            tag: 'input', type:'email', label:'Enter email', 
            placeholder:"example@mail.com", required: true,
            value: loginEmail, setChange: setLoginEmail
        },
        {
            tag: 'input', type:'password', label:'Enter password', 
            placeholder:"enter password", required: true,
            value: loginPass, setChange: setLoginPass
        },
    ];

    const formButtons = [
        {type: 'submit', color:'light', label: 'Submit'}
    ]
    
    const links = [
        {label:'Login', href:'/login', active: true},
        {label:'Register', href:'/register'},
    ]
    return(
        <>
            <Navbar links={links}/>
            <Form 
                elements={formElements} 
                buttons={formButtons} 
                formName='Login'
                submitFunc={login}
            />
        </>
    )
}