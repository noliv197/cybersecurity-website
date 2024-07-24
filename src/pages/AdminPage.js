import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Logout from "../components/Logout";
import Alert from "../components/Alert";

export default function AdminPage(props){
    const navigate = useNavigate();
    const [alert, setAlert] = useState({message: "",type: ""});


    useEffect(()=>{
        if(!props.user.value || !props.sid.value) navigate('/login');
        else if(props.user.value.role === 'c') navigate('/');
    }, [props.sid.value, props.user.value, navigate]);

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
            <Alert alert={alert} setAlert={setAlert} />
        </>
    )
}