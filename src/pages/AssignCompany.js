import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostService from "../services/http-service";
import Navbar from "../components/Navbar";
import Logout from "../components/Logout";
import Alert from "../components/Alert";
import ProjectTable from "../components/ProjectTable";

export default function AssignCompanyPage(props){
    const navigate = useNavigate();

    useEffect(()=>{
        if(!props.user.value || !props.sid.value) navigate('/login');
        else if(props.user.value.role === 'c') navigate('/');
        else if(props.user.value.role === 's') navigate('/staff');
    }, [props.sid.value, props.user.value, navigate]);

    const [alert, setAlert] = useState({message: "",type: ""});
    const [projects, setProjects] = useState([]);
    const [company, setCompanies] = useState([]);

    useEffect(()=>{
        let session = new FormData();
        session.append("sid", props.sid.value);
        session.append("role","s");
        PostService.post("copall",session).then(
            (response) => {
                setCompanies(response.data.map(company => {
                        return {value: company.cid, label: company.companyName}
                    })
                )
            },
            (err) => {
                setAlert({
                    message: 'Unable to load companies from backend'+JSON.stringify(err.response.data),
                    type: 'warning'
                });
            }
        )
    }, [props.sid.value]);


    useEffect(() => {
        let session = new FormData();
        session.append("sid", props.sid.value);

        PostService.post("projall",session).then(
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

    },[props.sid.value])

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
            <h1 className="text-light">Assign Company to Project</h1>
            <ProjectTable
                projects={projects}
                assign={company}
                header={['Project Code', 'Project Name', 'Company', 'Action']}
                id={'cid'}
                type='assignTB'
                request='projassigncom'
                setAlert={setAlert}
                sid={props.sid.value}
            />
        </>
    )
    
}