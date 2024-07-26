import { useEffect, useState } from "react";
import PostService from "../services/http-service";
import Table from "./Table";
import Input from "./Input";
import Button from "./Button";
import { Link } from "react-router-dom";
import PopupWindow from "./Modal";

export default function ProjectTable(props){
    const [tableContent, setTableContent] = useState([]);
    const [assign, setAssign] = useState({});

    useEffect(() => {

        const changeObjState = (propertyName,newVal)=>{
            setAssign((prev)=>{
                return {...prev,[propertyName]:newVal};
            })
        }

        props.type === 'assignTB' ?
            setTableContent(props.projects.map(project => {
                return [
                    project.projectCode,
                    project.projectName,
                    // project.assigned? project.assigned.fname +" "+project.assigned.lname: <Input element={{
                    <Input element={{
                            tag: 'select', type:'select', label:'Choose staff', 
                            required: true, id: "staff",
                            value: assign[project.projectCode]? assign[project.projectCode].uid: "",
                            setChange: (value) => {changeObjState(project.projectCode, value)},
                                options: props.users
                            }}
                        />
                    ,
                    <Button 
                        value='Assign'
                        color="primary"
                        func={
                            ()=>{
                                let session = new FormData();

                                session.append("sid", props.sid);
                                session.append("projectCode", project.projectCode);
                                session.append("uid", assign[project.projectCode]);

                                PostService.post("projassign", session).then(
                                    (response) => {
                                        props.setAlert({
                                            message: JSON.stringify(response.data),
                                            type: 'success'
                                        });
                                    },
                                    (err) => {
                                        props.setAlert({
                                            message: 'Unable to save on backend'+JSON.stringify(err.response.data),
                                            type: 'danger'
                                        });
                                    }
                                )
                                
                            }
                        }
                    />
                ]
            }))
        : setTableContent(props.projects.map(project => {
            return [
                <PopupWindow content={project} type='project'>{`${project.projectCode} - ${project.projectName}`}</PopupWindow>,
                'test' 
            ]
        }))
    },[assign, props])

    return (
        <>
            {props.type === 'assignTB' && tableContent.length > 0 ? 
                <Table
                    header={['Project Code', 'Project Name', 'Assigned Staff', 'Action']}
                    content={tableContent}
                />
            : props.type === 'assignTB' && tableContent.length === 0 ?
                <div className="alert alert-info">All projects have an assigned staff. Check the list on <Link to='/admin'>Projects Tab</Link></div>
            :
                props.type === 'displayTB' && tableContent.length > 0 ?
                <Table
                    header={['Project', 'Assigned Staff']}
                    content={tableContent}
                /> :
                <div className="alert alert-info">No projects assigned. Check the list of available projects to assign on <Link to='/admin/assign-project'>Assign Project Tab</Link></div>
            }
        </>
    )
}