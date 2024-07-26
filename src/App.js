import UserPage from "./pages/UserPage";
import NotFoundPage from "./pages/404";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Main from "./pages/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import ActivateUsersPage from "./pages/AcivateUsersPage";
import CryptoJS from "crypto-js";
import { Admin, Client, Staff } from "./classes/User";
import AssignProjectPage from "./pages/AssignProject";
import RegisterProjectPage from "./pages/RegisterProject";

export default function App() {
  const [user, setUser] = useState(() => {
    if(sessionStorage.getItem("user")){
      let decUser = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem("user"),'key').toString(CryptoJS.enc.Utf8));
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
        return loginUser;
    } else {
      return null;
    }
  }
  );
  const [sid, setSid] = useState(sessionStorage.getItem("sid"));

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main setUser={setUser} setSid={setSid} user={user} sid={sid}/>}>
          <Route index element={<UserPage user={{value:user, func:setUser}} sid={{value: sid, func: setSid}}/>}/>
          <Route path='/login' element={<LoginPage setUser={setUser} setSid={setSid}/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Route>
        <Route path='/admin' element={<Main setUser={setUser} setSid={setSid}/>}>
          <Route index element={<AdminPage user={{value:user, func:setUser}} sid={{value: sid, func: setSid}}/>}/>
          <Route path="/admin/activate" element={<ActivateUsersPage user={{value:user, func:setUser}} sid={{value: sid, func: setSid}}/>}/>
          <Route path="/admin/register-project" element={<RegisterProjectPage user={{value:user, func:setUser}} sid={{value: sid, func: setSid}}/>}/>
          <Route path="/admin/assign-project" element={<AssignProjectPage user={{value:user, func:setUser}} sid={{value: sid, func: setSid}}/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}