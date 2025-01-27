import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Logout from "../components/Logout";
import Alert from "../components/Alert";
import PostService from "../services/http-service";
import ProjectTable from "../components/ProjectTable";

export default function AdminPage(props){
    const navigate = useNavigate();
    const [alert, setAlert] = useState({message: "",type: ""});
    const [projects, setProjects] = useState([]);
    const [staff, setStaff] = useState([]);
    const [render, setRender] = useState(false);


    useEffect(()=>{
        if(!props.user.value || !props.sid.value) navigate('/login');
        else if(props.user.value.role === 'c') navigate('/');
        else if(props.user.value.role === 's') navigate('/staff');
    }, [props.sid.value, props.user.value, navigate]);

    useEffect(() => {
        let session = new FormData();
        session.append("sid", props.sid.value);
        
        PostService.post("projassignall",session).then(
            (response) => {
                setProjects(response.data)
            },
            (err) => {
                setAlert({
                    message: 'Unable to load data from backend'+JSON.stringify(err.response.data),
                    type: 'warning'
                });
            }
        )

        session.append("role","s");
        PostService.post("users",session).then(
            (response) => {
                setStaff(response.data);
            },
            (err) => {
                setAlert({
                    message: 'Unable to load staff from backend'+JSON.stringify(err.response.data),
                    type: 'warning'
                });
            }
        )

    }, [props.sid.value, props.user.value.role, render]);

    const links = props.user.value.role === 'a' ? [
        {label:'Dashboard', href:'/admin', active: true},
        {label:'Activate Users', href:'/admin/activate'},
        {label:'Register Company', href:'/admin/register-company'},
        {dropdown:'Projects', dropdownList:[
            {label:'Register Project', href:'/admin/register-project'},
            {label:'Assign Project to User', href:'/admin/assign-user', active: true},
            {label:'Assign Project to Company', href:'/admin/assign-company'},
        ]}
    ] : [{label:'Dashboard', href:'/admin', active: true}];

    return(
        < >
            <Navbar 
                links={links} 
                button={<Logout setUser={props.user.func} setSid={props.sid.func} sid={props.sid.value}/>} 
                greeting={`${props.user.value? props.user.value.fname : ""} ${props.user.value? props.user.value.lname: ""}`}
            />
            <h1 className="text-light">Projects</h1>
            <Alert alert={alert} setAlert={setAlert} />
            <ProjectTable
                projects={projects}
                users={staff}
                header={['Project', 'Assigned Staff', 'Status']}
                type='displayTB'
                setAlert={setAlert}
                sid={props.sid.value}
                render={setRender}
            />
        </>
    )
}