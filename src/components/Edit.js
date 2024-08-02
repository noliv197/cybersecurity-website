import { useEffect, useState } from "react";
import PostService from "../services/http-service";
import Form from "./Form";

export default function Edit(props){
    const [companies, setCompanies] = useState([]);
    const [editUser, setEditUser] = useState({
        fname: props.userInfo.fname,
        lname: props.userInfo.lname,
        email: props.userInfo.email,
        cid: props.userInfo.cid,
        phone: props.userInfo.phone,
        role: props.userInfo.role
    })

    const submitEdit = (e) => {
        e.preventDefault();
        const userData = new FormData(e.target);
        userData.append("sid", props.sid);
        userData.append("uid", props.userInfo.uid);

        PostService.post('useredit', userData).then(
            (response)=>{
                props.setAlert({
                    message: response.data,
                    type: 'info'
                });
                // props.setShwPopup(false);
                props.handleEdit();
                props.render((prev) => !prev)
            },
            (err)=>{
                props.setAlert({
                    message: JSON.stringify(err.response.status? err.response.data : 'Session Timeout'),
                    type: 'danger'
                });
            }
        )
    }

    const changeObjState = (propertyName,newVal)=>{
        setEditUser((prev)=>{
            return {...prev,[propertyName]:newVal};
        })
    }

    useEffect(()=>{
        let session = new FormData();
        session.append("sid", props.sid);
        PostService.post("copall",session).then(
            (response) => {
                setCompanies(response.data.map(company => {
                        return {value: company.cid, label: company.companyName}
                    })
                )
            },
            (err) => {
                props.setAlert({
                    message: 'Unable to load companies from backend'+JSON.stringify(err.response.data),
                    type: 'warning'
                });
            }
        )
    }, [props]);

    const formElements = [
        {
            tag: 'input', type:'text', id: "fname", label:'Change First Name',  
            placeholder:"First Name", required: true,
            value: editUser.fname, setChange: (value) => {changeObjState("fname",value)}
        },
        {
            tag: 'input', type:'text', id: "lname", label:'Change Last Name', 
            placeholder:"Last Name", required: true,
            value: editUser.lname, setChange: (value) => {changeObjState("lname",value)}
        },
        {
            tag: 'input', type:'email', id: "email", label:'Change Email', 
            placeholder:"example@mail.com", required: true,
            value: editUser.email, setChange: (value) => {changeObjState("email",value)}
        },
        {
            tag: 'input', type:'text', id: "phone", label:'Change Phone', 
            placeholder:"XXXXXXXXXXXXXXX", required: false,
            value: editUser.phone, setChange: (value) => {changeObjState("phone",value)}
        },
        {
            tag: 'select', type:'select', label:'Change Role', 
            required: true, id: "role",
            value: editUser.role, setChange: (value) => {changeObjState("role",value)},
            options:[
                {value: 'c', label:"Client"},
                {value: 'a', label:"Admin"},
                {value: 's', label:"Staff"},
            ]
        },
        {
            tag: 'select', type:'select', label:'Change Company', 
            required: true, id: "cid",
            value: editUser.cid, setChange: (value) => {changeObjState("cid",value)},
            options: companies
        }
    ]

    return(                   
        <Form 
            elements={formElements} 
            buttons={[{type: 'submit', color:'light', label: 'Edit'}]}  
            formName='Edit User Info'
            submitFunc={submitEdit}
            small={true}
        />
    )
}