import Navbar from "./components/common/Navbar";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPwd from "./components/ForgotPwd";
import Dashboard from "./components/Dashboard";


function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/forget-password" element={<ForgotPwd />} />
      <Route exact path="/dashboard" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;

