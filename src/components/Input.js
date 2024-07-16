export default function Input({element}){
    return (
        <div className="form-floating mb-3">
            { 
                element.tag === 'input' ? (
                    <input
                        className="form-control"
                        id={element.id}
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
                        id={element.id}
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
                        id={element.id}
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
            <label htmlFor={element.id}>{element.label}</label>
        </div>
    )
}