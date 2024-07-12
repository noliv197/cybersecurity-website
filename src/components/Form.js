import Input from "./Input";

export default function Form(props){
    return (
        <form 
            className="d-flex flex-column bg-dark gap-2 p-3 w-75 rounded rounded-lg"
            onSubmit={(e) => props.submitFunc(e)}
        >
            {props.formName? <h2 className="text-light text-center">{props.formName}</h2> : null}
            {props.elements.map((element, idx) => <Input key={idx} element={element}/>)}

            {props.buttons.map((btn, idx) => 
                <button 
                    className={`btn ${btn.color ? `btn-outline-${btn.color}`: ""}`} 
                    type={btn.type}
                    key={idx}
                >
                    {btn.label}
                </button>
            )}
        </form>
    )
}