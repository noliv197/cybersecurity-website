import Form from "../components/Form";
import Navbar from "../components/Navbar";
import CryptoJS from "crypto-js";
import PostService from "../services/http-service"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage(props){
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirm, setConfirm] = useState("");
    const [role, setRole] = useState("c");
    const [alert, setAlert] = useState("");
    const [alertType, setAlertType] = useState("");

    const navigate = useNavigate();

    const register = (e) => {
        e.preventDefault();
        if(pass !== confirm){
            setConfirm('');
            setAlert("The passwords should match");
            setAlertType("warning");
        }else{
            const userData = new FormData(e.target);
            PostService.post('reg', userData).then(
                (response) => {
                    let user = {fname: fname, lname: lname, role: role};
                    const encUser = CryptoJS.AES.encrypt(JSON.stringify(user),'key').toString();
                    sessionStorage.setItem("user",encUser);
                    if(role ==='c'){
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
        }
    }

    const formElements = [
        {
            tag: 'input', type:'text', id: "fname", label:'Enter First Name',  
            placeholder:"Enter First Name", required: true,
            value: fname, setChange: setLname
        },
        {
            tag: 'input', type:'text', id: "lname", label:'Enter Last Name', 
            placeholder:"Enter Last Name", required: true,
            value: lname, setChange: setFname
        },
        {
            tag: 'input', type:'email', id: "email", label:'Enter email', 
            placeholder:"example@mail.com", required: true,
            value: email, setChange: setEmail
        },
        {
            tag: 'input', type:'password', id: "pass", label:'Enter password', 
            placeholder:"enter password", required: true,
            value: pass, setChange: setPass
        },
        {
            tag: 'input', type:'password', id: "confirm", label:'Confirm password', 
            placeholder:"Confirm password", required: true,
            value: confirm, setChange: setConfirm
        },
        {
            tag: 'select', type:'select', label:'Choose', 
            required: true, id: "role",
            value: role, setChange: setRole,
            options:[
                {value: 'c', label:"Client"},
                {value: 'a', label:"Admin"},
                {value: 's', label:"Staff"},
            ]
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
                formName='Register'
                submitFunc={register}
            />
        </>
    )
}