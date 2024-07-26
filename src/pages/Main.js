import Footer from "../components/Footer";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CryptoJS from "crypto-js";
import { Admin, Client, Staff } from "../classes/User";

export default function Main(props){
    
    const navigate = useNavigate();
    const location = useLocation();
    const setUser = props.setUser;
    const setSid = props.setSid;
    
    useEffect(() => {
      if(!props.user && sessionStorage.getItem("user")!== null){
        const encUser = sessionStorage.getItem("user");
        
        let decUser = JSON.parse(CryptoJS.AES.decrypt(encUser,'key').toString(CryptoJS.enc.Utf8));
        let loginUser;
        switch (decUser.role) {
          case 'a':
              loginUser = new Admin(decUser.uid,decUser.fname, decUser.lname,decUser.email, decUser.phone);
          break;
          case 's':
              loginUser = new Staff(decUser.uid,decUser.fname, decUser.lname,decUser.email, decUser.phone);
          break;
          default:
              loginUser = new Client(decUser.uid,decUser.fname, decUser.lname,decUser.email, decUser.phone, decUser.company);
          break;
        }
        setUser(loginUser);
      } else{
        if (location.pathname !=='/register') navigate("/login");
      }

      if(!props.sid && sessionStorage.getItem("sid")!== null){
        setSid(sessionStorage.getItem("sid"));
      } else{
        if (location.pathname !=='/register') navigate("/login");
      }
    },[props.sid, props.user, setUser, setSid, navigate, location.pathname])

    return(
        <section className="d-flex flex-column justify-content-between page align-items-center gap-3">
            <Outlet/>
            <Footer/>
        </section>
    )
}