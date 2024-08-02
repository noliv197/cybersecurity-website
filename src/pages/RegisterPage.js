import Alert from "../components/Alert";
import Form from "../components/Form";
import Navbar from "../components/Navbar";
import PostService from "../services/http-service"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage(){
    const [regUser, setRegUser] = useState({
        fname: "",
        lname: "",
        email: "",
        companyName: "",
        phone: "",
        pass: "",
        confirm: "",
        role: "c"
    })

    const [disableCompany, setDisableCompany] = useState(false);
    const [alert, setAlert] = useState({message: "",type: ""});

    const navigate = useNavigate();

    const changeObjState = (propertyName,newVal)=>{
        setRegUser((prev)=>{
            return {...prev,[propertyName]:newVal};
        })
    }
    useEffect(() => {
        if(regUser.role !== 'c') {
            setDisableCompany(true);
            changeObjState('role','Staff');
        };
    }, [regUser.role])

    const register = (e) => {
        e.preventDefault();
        if(regUser.pass !== regUser.confirm){
            changeObjState('confirm','');
            setAlert({
                message: "The passwords should match",
                type: 'warning'
            });
        }else{
            const userData = new FormData(e.target);
            if(disableCompany) userData.append('companyName',regUser.companyName);

            PostService.post('reg', userData).then(
                () => {
                    navigate("/login");
                },
                (err) => {
                    setAlert({
                        message: JSON.stringify(err.response.data),
                        type: 'danger'
                    });
                }
            )
        }
    }

    const formElements = [
        {
            tag: 'input', type:'text', id: "fname", label:'Enter First Name',  
            placeholder:"Enter First Name", required: true,
            value: regUser.fname, setChange: (value) => {changeObjState("fname",value)}
        },
        {
            tag: 'input', type:'text', id: "lname", label:'Enter Last Name', 
            placeholder:"Enter Last Name", required: true,
            value: regUser.lname, setChange: (value) => {changeObjState("lname",value)}
        },
        {
            tag: 'input', type:'email', id: "email", label:'Enter email', 
            placeholder:"example@mail.com", required: true,
            value: regUser.email, setChange: (value) => {changeObjState("email",value)}
        },
        {
            tag: 'input', type:'text', id: "phone", label:'Enter phone', 
            placeholder:"enter phone", required: true,
            value: regUser.phone, setChange: (value) => {changeObjState("phone",value)}
        },
        {
            tag: 'select', type:'select', label:'Choose', 
            required: true, id: "role",
            value: regUser.role, setChange: (value) => {changeObjState("role",value)},
            options:[
                {value: 'c', label:"Client"},
                {value: 'a', label:"Admin"},
                {value: 's', label:"Staff"},
            ]
        },
        {
            tag: 'input', type:'text', id: "companyName", label:'Enter company', 
            placeholder:"enter company", required: true, disabled: disableCompany,
            value: regUser.companyName, setChange: (value) => {changeObjState("companyName",value)}
        },
        {
            tag: 'input', type:'password', id: "pass", label:'Enter password', 
            placeholder:"enter password", required: true,
            value: regUser.pass, setChange: (value) => {changeObjState("pass",value)}
        },
        {
            tag: 'input', type:'password', id: "confirm", label:'Confirm password', 
            placeholder:"Confirm password", required: true,
            value: regUser.confirm, setChange: (value) => {changeObjState("confirm",value)}
        }
    ];

    const formButtons = [
        {type: 'submit', color:'light', label: 'Submit'}
    ];
    
   
    return(
        <>
            <Navbar links={ [
                {label:'Login', href:'/login', active: true},
                {label:'Register', href:'/register'},
            ]}/>
            <Alert alert={alert} setAlert={setAlert}/>
            <Form 
                elements={formElements} 
                buttons={formButtons} 
                formName='Register'
                submitFunc={register}
            />
        </>
    )
}