import { useId, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar(props){
    const idDropdown = useId();
    const [isOpen, setDropdown] = useState({});

    const toggleOpen = (id)=>{
        setDropdown((prev)=>{
            return {...prev,[id]: !prev[id]};
        });
    }

    return(
        <nav
            className="w-100 navbar navbar-expand-sm navbar-dark bg-dark px-2"
        >
            <Link className="navbar-brand brand" to="/">CB Analysis</Link>
            <button
                className="navbar-toggler d-lg-none order-last"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapsibleNavId"
                aria-controls="collapsibleNavId"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav me-auto mt-lg-0">
                    {props.links.map((link, idx) => {
                        if(link.dropdown){
                            return (
                                <li className="nav-item dropdown" key={idx} onClick={() => toggleOpen(link.dropdown)}>
                                    <Link 
                                        className="nav-link dropdown-toggle"
                                        // id='navbarDropdownMenuLink'
                                        id={`${idDropdown}-${link.dropdown}`}
                                        aria-haspopup="true" 
                                        aria-expanded="false"
                                        data-toggle="dropdown"
                                        to="#"
                                    >{link.dropdown}</Link>
                                    <div className={`dropdown-menu${isOpen[link.dropdown] ? " show" : ""}`} aria-labelledby={`${idDropdown}-${link.dropdown}`}>
                                    {link.dropdownList.map((item, idx) =>( 
                                        <Link className="dropdown-item" key={idx} to={item.href}>{item.label}</Link>
                                        ))}
                                    </div>
                              </li>
                            )
                        }
                        return (
                            <li className="nav-item" key={idx}>
                                <Link className={`nav-link ${link.active ? "active": ""}`} to={link.href}>{link.label}</Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="d-flex align-items-center gap-3">
                {props.greeting? <p className="text-light mb-0">Welcome, {props.greeting}</p> : null}
                {props.button? props.button : null}
            </div>
        </nav>
        
    )
}