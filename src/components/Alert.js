export default function Alert(props){
    const hideAlert = () => {
        props.setAlert({
            message: "",
            type: ""
        });
    }

    return(
        <div
            className={`alert alert-${props.alert.type} alert-dismissible fade show ${props.alert.message? "d-block": "d-none"}`}
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