import Footer from "../components/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CryptoJS from "crypto-js";

export default function Main(props){
    
    const navigate = useNavigate();
    const setUser = props.setUser;
    
    useEffect(() => {
      if(sessionStorage.getItem("user")!== null){
        const encUser = sessionStorage.getItem("user");
        setUser(JSON.parse(CryptoJS.AES.decrypt(encUser,'key').toString(CryptoJS.enc.Utf8)));
      } else{
        navigate("/login");
      }
    },[setUser, navigate])

    return(
        <section className="d-flex flex-column justify-content-between page align-items-center gap-3">
            <Outlet/>
            <Footer/>
        </section>
    )
}