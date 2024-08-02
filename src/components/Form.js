import Input from "./Input";

export default function Form(props){
    return (
        <form 
            className={`d-flex bg-dark gap-2 p-3 rounded rounded-lg ${props.small ? "flex-wrap" : "col-6 flex-column"}`}
            onSubmit={(e) => props.submitFunc(e)}
        >
            {props.formName? <h2 className="text-light text-center w-100">{props.formName}</h2> : null}

            {props.elements.map((element, idx) => <Input key={idx} element={element}/>)}


            {props.buttons.map((btn, idx) => 
                <button 
                    className={`btn ${btn.color ? `btn-outline-${btn.color}`: ""} w-100`} 
                    type={btn.type}
                    key={idx}
                >
                    {btn.label}
                </button>
            )}
        </form>
    )
}