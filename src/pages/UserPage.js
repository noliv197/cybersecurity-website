import Navbar from "../components/Navbar";
import Table from "../components/Table";
import ProgressBar from "../components/Progress"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "../components/Logout";
import Alert from "../components/Alert";

export default function UserPage(props){
    const navigate = useNavigate();
    const [alert, setAlert] = useState({message: "",type: ""});

    useEffect(()=>{
        if(!props.user.value || !props.sid.value) navigate('/login');
        else if(props.user.value.role === 's') navigate('/staff');
        else if(props.user.value.role === 'a') navigate('/admin');
    }, [props.sid.value, props.user.value, navigate]);

    const links = [
        {label:'Analysis Progress', href:'/', active: true},
        {label:'Reports', href:'/reports'},
    ];

    const tableHeader = ['Analysis name', 'Tech Responsible','Progress', 'View Report'];
    const tableContent = [
        ['Test','Maureen',<ProgressBar percentage={10}/>,<button className="btn btn-light" type="click" disabled>Not available</button>],
        ['Test2','Maureen',<ProgressBar percentage={35}/>,<button className="btn btn-light" type="click">View Report</button>]
    ];
    
    return(
        <>
            <Navbar 
                links={links} 
                button={<Logout setUser={props.user.func} setSid={props.sid.func} sid={props.sid.value}/>} 
                greeting={`${props.user.value ? props.user.value.fname : ""} ${props.user.value ? props.user.value.lname : ""}`}
            />
            <Alert alert={alert} setAlert={setAlert}/>
            <Table header={tableHeader} content={tableContent} color="dark"/>
        </>
    )
}