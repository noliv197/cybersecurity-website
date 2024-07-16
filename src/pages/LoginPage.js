import Form from "../components/Form";
import Navbar from "../components/Navbar"
import CryptoJS from "crypto-js";
import PostService from "../services/http-service"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage(props){
    const navigate = useNavigate();
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPass, setLoginPass] = useState("");
    const [alert, setAlert] = useState("");
    const [alertType, setAlertType] = useState("");

    const login = (e) => {
        e.preventDefault();

        let userData = new FormData(e.target);
        PostService.post('login', userData).then(
            (response) => {
                let session = new FormData();
                session.append('sid', response.data)
                PostService.post('info', session).then(
                    (response)=>{
                        const encUser = CryptoJS.AES.encrypt(JSON.stringify(response.data),'key').toString();
                        sessionStorage.setItem("user",encUser);
                        if(response.data.role === 'c'){
                            navigate("/");
                        } else {
                            navigate("/admin");
                        }
                    },
                    (err) => {
                        setAlert(JSON.stringify(err));
                        setAlertType('danger');
                    }
                )
            },
            (err) => {
                setAlert(JSON.stringify(err));
                setAlertType('danger');
            }
        )
    }

    const formElements = [
        {
            tag: 'input', type:'email', id: "email", label:'Enter email', 
            placeholder:"example@mail.com", required: true,
            value: loginEmail, setChange: setLoginEmail
        },
        {
            tag: 'input', type:'password', id: "pass", label:'Enter password', 
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
            <p className={`alert ${alertType? `alert-${alertType}` : ""}`}>{alert}</p>
            <Form 
                elements={formElements} 
                buttons={formButtons} 
                formName='Login'
                submitFunc={login}
            />
        </>
    )
}