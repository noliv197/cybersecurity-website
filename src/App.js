import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import NotFoundPage from "./pages/404";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' >
          <Route index element={<UserPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
        </Route>
        <Route path='/admin' >
          <Route path='home' element={<AdminPage/>}/>
        </Route>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}