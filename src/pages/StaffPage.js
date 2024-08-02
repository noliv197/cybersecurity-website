import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Logout from "../components/Logout";
import Alert from "../components/Alert";
import PostService from "../services/http-service";
import ProjectTable from "../components/ProjectTable";

export default function StaffPage(props){
    const navigate = useNavigate();
    const [alert, setAlert] = useState({message: "",type: ""});
    const [projects, setProjects] = useState([]);

    useEffect(()=>{
        if(!props.user.value || !props.sid.value) navigate('/login');
        else if(props.user.value.role === 'c') navigate('/');
        else if(props.user.value.role === 'a') navigate('/admin');
    }, [props.sid.value, props.user.value, navigate]);

    useEffect(() => {
        let session = new FormData();
        session.append("sid", props.sid.value);
        session.append('uid', props.user.value.uid)
        
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

        }, [props.sid.value, props.user.value.uid]);

    return(
        < >
            <Navbar 
                links={[{label:'Dashboard', href:'/admin', active: true}]} 
                button={<Logout setUser={props.user.func} setSid={props.sid.func} sid={props.sid.value}/>} 
                greeting={`${props.user.value? props.user.value.fname : ""} ${props.user.value? props.user.value.lname: ""}`}
            />
            <h1 className="text-light">Assigned Projects</h1>
            <Alert alert={alert} setAlert={setAlert} />
            <ProjectTable
                projects={projects}
                header={['Project', 'Status', 'Progess', 'Action']}
                type='progressTB'
                setAlert={setAlert}
                sid={props.sid.value}
            />
        </>
    )
}