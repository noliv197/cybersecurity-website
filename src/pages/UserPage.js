import Navbar from "../components/Navbar";
import Table from "../components/Table";
import ProgressBar from "../components/Progress"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserPage(props){
    const navigate = useNavigate();

    useEffect(()=>{
        if(!props.user || props.user.role !== 'c'){
            navigate('/login');
        }
    });

    const links = [
        {label:'Analysis Progress', href:'/', active: true},
        {label:'Reports', href:'/reports'},
    ]

    const tableHeader = ['Analysis name', 'Tech Responsible','Progress', 'View Report'];
    const tableContent = [
        ['Test','Maureen',<ProgressBar percentage={10}/>,<button className="btn btn-light" type="click" disabled>Not available</button>],
        ['Test2','Maureen',<ProgressBar percentage={35}/>,<button className="btn btn-light" type="click">View Report</button>]
    ];
    return(
        <>
            <Navbar links={links} greeting={`${props.user.fname} ${props.user.lname}`}/>
            <Table header={tableHeader} content={tableContent} color="dark"/>
        </>
    )
}