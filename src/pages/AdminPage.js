import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export default function AdminPage(props){
    const navigate = useNavigate();

    useEffect(()=>{
        console.log(props.user)
        if(!props.user || props.user.role === 'c'){
            navigate('/login');
        }
    });

    const links = [
        {label:'Test', href:'/admin', active: true},
        {label:'Register', href:'/register'},
    ]
    return(
        < >
            <Navbar links={links}/>
        </>
    )
}