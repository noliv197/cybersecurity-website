import { useEffect } from "react";

export default function Alert(props){
    const hideAlert = () => {
        props.setAlert({
            message: "",
            type: ""
        });
    }

    useEffect(()=>{
        setTimeout(()=> 
            props.setAlert({
            message: "",
            type: ""
        }),5000)
    }, [props.alert.message]);

    return(
        <div
            className={`alert alert-dismissible fade show 
                alert-${props.alert.type} 
                ${props.alert.message? "d-block": "d-none"}
                ${props.small? "w-75": ""}
            `}
            role="alert"
        >
            <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => hideAlert()}
            ></button>
            {props.alert.message}
        </div>
    )
    
}