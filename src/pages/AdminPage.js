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


    useEffect(()=>{
        if(!props.user.value || !props.sid.value) navigate('/login');
        else if(props.user.value.role === 'c') navigate('/');
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

        session.append("sid", props.sid.value);

        }, [props.sid.value]);

    const links = [
        {label:'Dashboard', href:'/admin', active: true},
        {label:'Activate Users', href:'/admin/activate'},
        {label:'Register Project', href:'/admin/register-project'},
        {label:'Assign Projects', href:'/admin/assign-project'}
    ];

    return(
        < >
            <Navbar 
                links={links} 
                button={<Logout setUser={props.user.func} setSid={props.sid.func} sid={props.sid.value}/>} 
                greeting={`${props.user.value? props.user.value.fname : ""} ${props.user.value? props.user.value.lname: ""}`}
            />
            <h1 className="text-light">Projects Informations</h1>
            <Alert alert={alert} setAlert={setAlert} />
            <ProjectTable
                projects={projects}
                users={staff}
                type='displayTB'
                setAlert={setAlert}
                sid={props.sid.value}
            />
        </>
    )
}