import { useNavigate } from "react-router-dom";
import PostService from "../services/http-service"
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import Logout from "../components/Logout";
import Alert from "../components/Alert";

export default function ActivateUsersPage(props){
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [alert, setAlert] = useState({message: "",type: ""});


    
    useEffect(()=>{
        const activateUser = (id) =>{
            let requestData = new FormData();
            requestData.append('sid', props.sid.value);
            requestData.append('uid', id);
    
            PostService.post('activate', requestData).then(
                () => {
                    reloadUsers();
                },
                (err)=>{
                    setAlert({
                        message: "Unable to activate user"+JSON.stringify(err.response),
                        type: 'warning'
                    });
                }
            )
        }
    
        const unblockUser = (id) =>{
            let requestData = new FormData();
            requestData.append('sid', props.sid.value);
            requestData.append('uid', id);
    
            PostService.post('rstattempt', requestData).then(
                () => {
                    reloadUsers();
                },
                (err)=>{
                    setAlert({
                        message: "Unable to unblock user",
                        type: 'warning'
                    });
                }
            )
        }
    
        const reloadUsers = () =>{
            let session = new FormData();
            session.append('sid',props.sid.value);
            PostService.post('users', session).then(
                (response) => {
                    if(response.data){
                        setUsers(response.data.map(user => {
                            return [
                                user.uid,
                                user.fname + " " + user.lname,
                                user.role === 'a'? 'Admin': user.role === 's'? 'Staff':'Client',
                                user.email,
                                user.activate === '1' ? 'Activated' : <button onClick={() => activateUser(user.uid)} className="btn btn-primary">Activate User</button>,
                                user.attempt !== '0'? 'Not blocked': <button onClick={()=> unblockUser(user.uid)} className="btn btn-primary">Unblock User</button>,
                            ]
                        }))
                    }
                },
                (err) => {
                    setAlert({
                        message: "Unable to load users"+JSON.stringify(err.response),
                        type: 'warning'
                    });
                }
            )
        }

        if(!props.user.value || !props.sid.value) navigate('/login');
        else if(props.user.value.role === 'c') navigate('/');
        else if(props.user.value.role === 's') navigate('/admin');

        reloadUsers();
        
    }, [props.sid.value, props.user.value, navigate, users]);

    const links = [
        {label:'Dashboard', href:'/admin'},
        {label:'Activate Users', href:'/admin/activate', active: true},
        {label:'Register Project', href:'/admin/register-project'},
        {label:'Assign Projects', href:'/admin/assign-project',}
    ];

    const tableHeader = ['ID', 'User Name','Role', 'Email', 'Activation','Login Status'];

    return(
        < >
            <Navbar 
                links={links} 
                button={<Logout setUser={props.user.func} setSid={props.sid.func} sid={props.sid.value}/>} 
                greeting={`${props.user.value.fname} ${props.user.value.lname}`}
            />
            <Alert alert={alert} setAlert={setAlert}/>
            <Table header={tableHeader} content={users} color="dark"/>
        </>
    )
}