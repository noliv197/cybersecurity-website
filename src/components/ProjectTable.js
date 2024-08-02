import { useEffect, useState } from "react";
import PostService from "../services/http-service";
import Table from "./Table";
import Input from "./Input";
import Button from "./Button";
import PopupWindow from "./Modal";

export default function ProjectTable(props){
    const [tableContent, setTableContent] = useState([]);
    const [assign, setAssign] = useState({});
    const [progress, setProgress] = useState({});

    useEffect(()=> {
        if(props.type === 'progressTB'){
            props.projects.forEach(project => {
                setProgress((prev)=>{return {...prev,[project.projectCode]: Number(project.progress)}})
            })
        }
        else if (props.type === 'assignTB'){
        props.projects.forEach(project => 
            setAssign((prev)=>{
                return {...prev,[project.projectCode]: props.assign[0].value};
            }))
        }
    },[])

    useEffect(() => {

        props.type === 'assignTB' ?
            setTableContent(props.projects.map(project => {
                return [
                    project.projectCode,
                    project.projectName,
                    <Input 
                        element={{
                            tag: 'select', type:'select', label:'Choose', 
                            required: true, id: props.id,
                            value: assign[project.projectCode],
                            setChange: (value) => {
                                setAssign((prev)=>{ return {...prev,[project.projectCode]: value}})
                            },
                            options: props.assign
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
                                session.append(props.id, assign[project.projectCode]);

                                PostService.post(props.request, session).then(
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
        : props.type === 'progressTB'?
            setTableContent(props.projects.map(project => {
                return [
                    <PopupWindow content={project} type='project'>{`${project.projectCode} - ${project.projectName}`}</PopupWindow>,
                    project.status === 'n'? 'Not started': project.status === 'p' ? 'In progress' : 'Finished',
                    <Input
                        element={{
                            tag: 'input', type:'number', label:'Project Progress', 
                            required: true, id: 'progress',
                            value: progress[project.projectCode],
                            setChange: (value) => {
                                setProgress((prev)=>{ return {...prev,[project.projectCode]: value}})
                            },
                        }}
                    />,
                    <div className="d-flex gap-2">
                        <Button 
                            value='Update Progress'
                            color="primary"
                            func={
                                ()=>{
                                    alert('updated'+progress[project.projectCode])
                                    // let session = new FormData();
    
                                    // session.append("sid", props.sid);
                                    // session.append("projectCode", project.projectCode);
                                    // session.append(props.id, assign[project.projectCode]);
    
                                    // PostService.post(props.request, session).then(
                                    //     (response) => {
                                    //         props.setAlert({
                                    //             message: JSON.stringify(response.data),
                                    //             type: 'success'
                                    //         });
                                    //     },
                                    //     (err) => {
                                    //         props.setAlert({
                                    //             message: 'Unable to save on backend'+JSON.stringify(err.response.data),
                                    //             type: 'danger'
                                    //         });
                                    //     }
                                    // )
                                    
                                }
                            }
                        />
                        <Button 
                            value='Complete'
                            color="success"
                            disabled={false}
                            func={
                                ()=>{
                                    alert('completed')
                                    // let session = new FormData();
    
                                    // session.append("sid", props.sid);
                                    // session.append("projectCode", project.projectCode);
                                    // session.append(props.id, assign[project.projectCode]);
    
                                    // PostService.post(props.request, session).then(
                                    //     (response) => {
                                    //         props.setAlert({
                                    //             message: JSON.stringify(response.data),
                                    //             type: 'success'
                                    //         });
                                    //     },
                                    //     (err) => {
                                    //         props.setAlert({
                                    //             message: 'Unable to save on backend'+JSON.stringify(err.response.data),
                                    //             type: 'danger'
                                    //         });
                                    //     }
                                    // )
                                    
                                }
                            }
                        />

                    </div>
                ]
            }))
        :    setTableContent(props.projects.map(project => {
                return [
                    <PopupWindow content={project} type='project'>{`${project.projectCode} - ${project.projectName}`}</PopupWindow>,
                    <PopupWindow 
                        content={props.users.find(user => user.uid === project.uid)} 
                        type='user' 
                        sid={props.sid}
                        render={props.render}
                    >{project.fname} {project.lname}</PopupWindow>,
                    project.status === 'n'? 'Not started': project.status === 'p' ? 'In progress' : 'Finished'
                ]
            }))
    },[assign, progress, props])

    return (
        <>
            {tableContent.length > 0 ? 
                <Table
                    header={props.header}
                    content={tableContent}
                />
            : 
                <div className="alert alert-info">No data to show</div>

            }
        </>
    )
}