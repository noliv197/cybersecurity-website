import { useState } from "react"

export default function Button(props){
    const [btnLabel, setBtnLabel] = useState(props.value);

    const handleClick = () => {
        props.func(btnLabel, setBtnLabel);
    }
    return(
        <button 
            className={`btn btn-${props.color? props.color : "dark"}`} 
            type={props.type? props.type: "button"} 
            onClick={handleClick}
            disabled={props.disabled}
        >
            {props.value}
        </button>
    )
}