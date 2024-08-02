import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostService from "../services/http-service";
import Navbar from "../components/Navbar";
import Logout from "../components/Logout";
import Alert from "../components/Alert";
import ProjectTable from "../components/ProjectTable";

export default function AssignUserPage(props){
    const navigate = useNavigate();

    useEffect(()=>{
        if(!props.user.value || !props.sid.value) navigate('/login');
        else if(props.user.value.role === 'c') navigate('/');
        else if(props.user.value.role === 's') navigate('/staff');
    }, [props.sid.value, props.user.value, navigate]);

    const [alert, setAlert] = useState({message: "",type: ""});
    const [projects, setProjects] = useState([]);
    const [assignedProjects, setAssignedProjects] = useState([]);
    const [staff, setStaff] = useState([]);

    useEffect(()=>{
        let session = new FormData();
        session.append("sid", props.sid.value);
        session.append("role","s");
        PostService.post("users",session).then(
            (response) => {
                setStaff(response.data.map(user => {
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
    }, [props.sid.value]);


    useEffect(() => {
        let session = new FormData();
        session.append("sid", props.sid.value);

        PostService.post("projassignall",session).then(
            (response) => {
                setAssignedProjects(response.data)
            },
            (err) => {
                setAlert({
                    message: 'Unable to load data from backend'+JSON.stringify(err.response.data),
                    type: 'warning'
                });
            }
        )

        PostService.post("projall",session).then(
            (response) => {
                // setProjects(response.data.map(project => {
                //     let projectAssigned = assignedProjects.find(proj => proj.projectCode === project.projectCode)
                //     return {...project, 'assigned': projectAssigned}
                // }))
                setProjects(response.data.filter(project => !assignedProjects.find(proj => proj.projectCode === project.projectCode)))
            },
            (err) => {
                setAlert({
                    message: 'Unable to load data from backend'+JSON.stringify(err.response.data),
                    type: 'warning'
                });
            }
        )

    },[props.sid.value, assignedProjects])

    const links = [
        {label:'Dashboard', href:'/admin'},
        {label:'Activate Users', href:'/admin/activate'},
        {label:'Register Company', href:'/admin/register-company'},
        {dropdown:'Projects', dropdownList:[
            {label:'Register Project', href:'/admin/register-project'},
            {label:'Assign Project to User', href:'/admin/assign-user', active: true},
            {label:'Assign Project to Company', href:'/admin/assign-company'},
        ]}
    ];

    return(
        < >
            <Navbar 
                links={links} 
                button={<Logout setUser={props.user.func} setSid={props.sid.func} sid={props.sid.value}/>} 
                greeting={`${props.user.value? props.user.value.fname : ""} ${props.user.value? props.user.value.lname: ""}`}
            />
            <Alert alert={alert} setAlert={setAlert}/>
            <h1 className="text-light">Assign User to Project</h1>
            <ProjectTable
                projects={projects}
                assign={staff}
                header={['Project Code', 'Project Name', 'Staff', 'Action']}
                id={'uid'}
                type='assignTB'
                request='projassign'
                setAlert={setAlert}
                sid={props.sid.value}
            />
        </>
    )
    
}