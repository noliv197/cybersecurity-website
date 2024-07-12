import { useState } from "react";
import Form from "../components/Form";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LoginPage(props){
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPass, setLoginPass] = useState("");

    const login = (e) => {
        e.preventDefault();

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
        <section className="d-flex flex-column justify-content-between page align-items-center gap-3">
            <Navbar links={links}/>
            <Form 
                elements={formElements} 
                buttons={formButtons} 
                formName='Login'
                submitFunc={login}
            />
            <Footer/>
        </section>
    )
}