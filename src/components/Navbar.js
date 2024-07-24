import { Link } from "react-router-dom";

export default function Navbar(props){
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