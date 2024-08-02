import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import PostService from "../services/http-service"
import Logout from "../components/Logout";
import Alert from "../components/Alert";
import Form from "../components/Form";

export default function RegisterProjectPage(props){
    const navigate = useNavigate();
    const [project, setProject] = useState({
        code: "",
        name: "",
        scheme:"",
        pps: "NDcPP",
        fgaTime:""
    })

    const [alert, setAlert] = useState({message: "",type: ""});

    useEffect(()=>{
        if(!props.user.value || !props.sid.value) navigate('/login');
        else if(props.user.value.role === 'c') navigate('/');
        else if(props.user.value.role === 's') navigate('/staff');
    }, [props.sid.value, props.user.value, navigate]);

    const changeObjState = (propertyName,newVal)=>{
        setProject((prev)=>{
            return {...prev,[propertyName]:newVal};
        })
    }

    const links = [
        {label:'Dashboard', href:'/admin'},
        {label:'Activate Users', href:'/admin/activate'},
        {label:'Register Company', href:'/admin/register-company'},
        {dropdown:'Projects', dropdownList:[
            {label:'Register Project', href:'/admin/register-project', active: true},
            {label:'Assign Project to User', href:'/admin/assign-user'},
            {label:'Assign Project to Company', href:'/admin/assign-company'},
        ]}
    ];

    const formElements = [
        {
            tag: 'input', type:'text', id: "projectCode", label:'Enter Project Code', 
            placeholder:"project code", required: true,
            value: project.code, setChange: (value) => {changeObjState("code",value)}
        },
        {
            tag: 'input', type:'text', id: "projectName", label:'Enter Project Name', 
            placeholder:"project name", required: true,
            value: project.name, setChange: (value) => {changeObjState("name",value)}
        },
        {
            tag: 'input', type:'text', id: "projectScheme", label:'Enter Project Scheme', 
            placeholder:"project scheme", required: true,
            value: project.scheme, setChange: (value) => {changeObjState("scheme",value)}
        },
        {
            tag: 'input', type:'number', id: "fgaTime", label:'Enter FGA Time', 
            placeholder:"fga time", required: true,
            value: project.fgaTime, setChange: (value) => {changeObjState("fgaTime",value)}
        },
        {
            tag: 'select', type:'select', label:'Choose protection profile', 
            required: true, id: "pps",
            value: project.pps, setChange: (value) => {changeObjState("pps",value)},
            options:[
                {value: 'NDcPP', label:"NDcPP"},
                {value: 'OSPP', label:"OSPP"},
                {value: 'APP_PP', label:"APP_PP"},
                {value: 'MAIL_PP', label:"MAIL_PP"},
                {value: 'MDM_PP', label:"MDM_PP"},
                {value: 'BIO_PP', label:"BIO_PP"},
                {value: 'BT_PP', label:"BT_PP"},
            ]
        },
    ];

    const formButtons = [
        {type: 'submit', color:'light', label: 'Submit'}
    ];

    const regProject = (e) => {
        e.preventDefault();
        const projectData = new FormData(e.target);
        projectData.append("sid", props.sid.value);

        PostService.post('projreg', projectData).then(
            (response)=>{
                setAlert({
                    message: response.data,
                    type: 'success'
                });
                setProject({
                    code: "",
                    name: "",
                    scheme:"",
                    pps: "NDcPP",
                    fgaTime:""
                });
            },
            (err)=>{
                setAlert({
                    message: JSON.stringify(err.response.data),
                    type: 'danger'
                });
            }
        )
    }

    return(
        < >
            <Navbar 
                links={links} 
                button={<Logout setUser={props.user.func} setSid={props.sid.func} sid={props.sid.value}/>} 
                greeting={`${props.user.value.fname} ${props.user.value.lname}`}
            />
            <Alert alert={alert} setAlert={setAlert}/>
            <Form
                elements={formElements} 
                buttons={formButtons} 
                formName='Register Project'
                submitFunc={regProject}
            />
        </>
    )
}