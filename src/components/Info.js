import { useEffect, useState } from "react";
import PostService from "../services/http-service";

export default function Info(props){
    const content = props.content;
    const [projectList, setProjectList] = useState(null)

    useEffect(()=>{
        if(props.type === 'user'){
            let request = new FormData();
            request.append('uid', props.content.uid);
            request.append('sid', props.sid);
            PostService.post("projassignall",request).then(
                (response) =>{
                    setProjectList(response.data)
                },
                () => {
                    setProjectList(null);
                }
            )
        }
    },[props])
    return(
        <div className="popup-card text-dark w-50">
            {props.type === 'project'?
                <>
                    <h2>Project Details</h2>
                    <ul>
                        <li className="d-flex align-items-center mb-0 gap-2">
                            <h3 className="font-weight-bold">Code:</h3>
                            <p className="mb-0">{content.projectCode}</p>
                        </li>
                        <li className="d-flex align-items-center mb-0 gap-2">
                            <h3 className="font-weight-bold">Name:</h3>
                            <p className="mb-0">{content.projectName}</p>
                        </li>
                        <li className="d-flex align-items-center mb-0 gap-2">
                            <h3 className="font-weight-bold">Scheme:</h3>
                            <p className="mb-0">{content.projectScheme}</p>
                        </li>
                        <li className="d-flex align-items-center mb-0 gap-2">
                            <h3 className="font-weight-bold">FGA Time:</h3>
                            <p className="mb-0">{content.fgaTime}</p>
                        </li>
                        <li className="d-flex align-items-center mb-0 gap-2">
                            <h3 className="font-weight-bold">Protection Profile:</h3>
                            <p className="mb-0">{content.pps}</p>
                        </li>
                    </ul>
                </>
                :
                <>
                    <h2>Staff Details</h2>
                    <ul>
                        <li className="d-flex align-items-center mb-0 gap-2">
                            <h3 className="font-weight-bold">Name:</h3>
                            <p className="mb-0">{content.fname} {content.lname}</p>
                        </li>
                        <li className="d-flex align-items-center mb-0 gap-2">
                            <h3 className="font-weight-bold">Email:</h3>
                            <p className="mb-0">{content.email}</p>
                        </li>
                        <li className="d-flex align-items-center mb-0 gap-2">
                            <h3 className="font-weight-bold">Assigned Projects:</h3>
                            <ol>
                                {projectList && projectList.length > 0 ? 
                                    projectList.map(proj => 
                                        <li key={proj.projectCode}>{proj.projectCode} {proj.projectName}</li>
                                    )
                                : <li>No project information</li>}
                            </ol>
                        </li>
                    </ul>
                </>
            }
        </div>
    )
}