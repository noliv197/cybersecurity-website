import Form from "../components/Form";
import Navbar from "../components/Navbar";
import CryptoJS from "crypto-js";
import PostService from "../services/http-service";
import { Client, Staff, Admin} from "../classes/User"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";


export default function LoginPage(props){
    const navigate = useNavigate();
    const [alert, setAlert] = useState({message: "",type: ""});
    const [login, setLogin] = useState({
        email: "",
        pass: "",
        role: "c"
    });

    const changeObjState = (propertyName,newVal)=>{
        setLogin((prev)=>{
            return {...prev,[propertyName]:newVal};
        })
    }
    
    const submitLogin = (e) => {
        e.preventDefault();

        let userData = new FormData(e.target);
        PostService.post('login', userData).then(
            (response) => {
                if(response.data !== null){
                    let session = new FormData();
                    session.append('sid', response.data);
                    sessionStorage.setItem("sid", response.data);
                    props.setSid(response.data);

                    PostService.post('info', session).then(
                        (response)=>{
                            let loginUser;
                            switch (response.data.role) {
                                case 'a':
                                    loginUser = new Admin(response.data.uid,response.data.fname, response.data.lname,response.data.email, response.data.phone);
                                break;
                                case 's':
                                    loginUser = new Staff(response.data.uid,response.data.fname, response.data.lname,response.data.email, response.data.phone);
                                break;
                                default:
                                    loginUser = new Client(response.data.uid,response.data.fname, response.data.lname,response.data.email, response.data.phone, response.data.company);
                                break;
                            }
                            props.setUser(loginUser);
                            const encUser = CryptoJS.AES.encrypt(JSON.stringify(loginUser),'key').toString();
                            sessionStorage.setItem("user",encUser);
                            if(response.data.role === 'c'){
                                navigate("/");
                            } else {
                                navigate("/admin");
                            }
                        },
                        (err) => {
                            setAlert({
                                message: JSON.stringify(err.response.data),
                                type: 'danger'
                            });
                        }
                    )
                }
            },
            (err) => {
                setAlert({
                    message: JSON.stringify(err.response.data),
                    type: 'danger'
                });
            }
        )
    }

    const formElements = [
        {
            tag: 'input', type:'email', id: "email", label:'Enter email', 
            placeholder:"example@mail.com", required: true,
            value: login.email, setChange: (value) => {changeObjState("email",value)}
        },
        {
            tag: 'input', type:'password', id: "pass", label:'Enter password', 
            placeholder:"enter password", required: true,
            value: login.pass, setChange: (value) => {changeObjState("pass",value)}
        },
        {
            tag: 'select', type:'select', label:'User role', 
            required: true, id: "role",
            value: login.role, setChange: (value) => {changeObjState("role",value)},
            options:[
                {value: 'c', label:"Client"},
                {value: 'a', label:"Admin"},
                {value: 's', label:"Staff"},
            ]
        },
    ];

    const formButtons = [
        {type: 'submit', color:'light', label: 'Submit'}
    ];
    
    const links = [
        {label:'Login', href:'/login', active: true},
        {label:'Register', href:'/register'},
    ];
    
    return(
        <>
            <Navbar links={links}/>
            <Alert alert={alert} setAlert={setAlert}/>
            <Form 
                elements={formElements} 
                buttons={formButtons} 
                formName='Login'
                submitFunc={submitLogin}
            />
        </>
    )
}