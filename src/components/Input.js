import { useId } from "react"

export default function Input({element}){
    const inputId = useId();

    return (
        <div className="form-floating mb-3">
            { 
                element.tag === 'input' ? (
                    <input
                        className="form-control"
                        id={inputId}
                        type={element.type} 
                        name={element.id}
                        placeholder={element.placeholder}
                        value={element.value}
                        required={element.required}
                        disabled={element.disabled}
                        onChange={(e) => element.setChange(e.target.value)}
                    />
                ): element.tag === 'textarea' ? (
                    <textarea
                        className="form-control"
                        id={inputId}
                        name={element.id}
                        value={element.value}
                        placeholder={element.placeholder}
                        required={element.required}
                        disabled={element.disabled}
                        onChange={(e) => element.setChange(e.target.value)}
                    ></textarea>
                ) : element.tag === 'select' ? (
                    <select
                        className="form-select"
                        id={inputId}
                        name={element.id}
                        placeholder={element.placeholder}
                        required={element.required}
                        value={element.value}
                        onChange={(e) => element.setChange(e.target.value)}
                        disabled={element.disabled}
                    >
                        {element.options.map((option, idx) => 
                            <option 
                                key={idx} 
                                value={option.value}
                                selected={option.selected}
                            >
                                {option.label}
                            </option>
                        )}
                    </select>
                ) : null
            }
            <label htmlFor={inputId}>{element.label}</label>
        </div>
    )
}