import Navbar from "../components/Navbar";

export default function UserPage(props){
    const links = [
        {label:'Analysis Progress', href:'/', active: true},
        {label:'Reports', href:'/reports'},
    ]
    return(
        <>
            <Navbar links={links} greeting={props.user.email}/>
        </>
    )
}