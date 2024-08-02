import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import PostService from "../services/http-service";
import Logout from "../components/Logout";
import Alert from "../components/Alert";
import Form from "../components/Form";

export default function RegisterCompanyPage(props){
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [company, setCompany] = useState({
        user: "",
        name: ""
    })

    const [alert, setAlert] = useState({message: "",type: ""});

    useEffect(()=>{
        if(!props.user.value || !props.sid.value) navigate('/login');
        else if(props.user.value.role === 'c') navigate('/');
        else if(props.user.value.role === 's') navigate('/staff');
    }, [props.sid.value, props.user.value, navigate]);

    useEffect(()=>{
        let session = new FormData();
        session.append("sid", props.sid.value);
        session.append("role","c");

        PostService.post("users",session).then(
            (response) => {
                setUsers(response.data.map(user => {
                        return {value: user.uid, label: user.fname + " " + user.lname}
                    })
                )
            },
            (err) => {
                setAlert({
                    message: 'Unable to load staff from backend'+JSON.stringify(err.response.data),
                    type: 'warning'
                });
            }
        )
    }, [props.sid.value])

    const changeObjState = (propertyName,newVal)=>{
        setCompany((prev)=>{
            return {...prev,[propertyName]:newVal};
        })
    }

    const links = [
        {label:'Dashboard', href:'/admin'},
        {label:'Activate Users', href:'/admin/activate'},
        {label:'Register Company', href:'/admin/register-company', active: true},
        // {label:'Register Project', href:'/admin/register-project'},
        // {label:'Assign Projects', href:'/admin/assign-project'},
        {dropdown:'Projects', dropdownList:[
            {label:'Register Project', href:'/admin/register-project'},
            {label:'Assign Project to User', href:'/admin/assign-user'},
            {label:'Assign Project to Company', href:'/admin/assign-company'},
        ]}
    ];

    const formElements = [
        {
            tag: 'input', type:'text', 
            label:'Enter Company Name', placeholder:"project code", 
            required: true, id: "companyname",
            value: company.name, setChange: (value) => {changeObjState("name",value)}
        },
        {
            tag: 'select', type:'select', 
            label:'Choose user', 
            required: true, id: "uid",
            value: company.user, setChange: (value) => {changeObjState("user",value)},
            options: users
        },
    ];

    const formButtons = [
        {type: 'submit', color:'light', label: 'Submit'}
    ];

    const regCompany = (e) => {
        e.preventDefault();
        const companyData = new FormData(e.target);
        companyData.append("sid", props.sid.value);

        PostService.post('compreg', companyData).then(
            (response)=>{
                setAlert({
                    message: response.data,
                    type: 'success'
                });
                setCompany({
                    user: "",
                    name: ""
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
                formName='Register Company'
                submitFunc={regCompany}
            />
        </>
    )
}