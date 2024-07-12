import UserPage from "./pages/UserPage";
import NotFoundPage from "./pages/404";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Main from "./pages/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

export default function App() {
  const [user, setUser] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main setUser={setUser}/>}>
          <Route index element={<UserPage user={user}/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Route>
        <Route path='/admin' >
          <Route path='home' element={<AdminPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}