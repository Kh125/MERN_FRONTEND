import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Schedule from "./pages/Schedule";
import Notification from "./pages/Notification";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";
<<<<<<< HEAD
import UserInfoSetup from "./pages/UserInfoSetup";
=======
import LocationRoute from "./pages/LocationRoute";
>>>>>>> b61c9b3971a8792d5ad664860591d5be66e6b8da

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
<<<<<<< HEAD
          <Route path="/info-setup" element={<UserInfoSetup />} />
=======
          <Route path="/location" element={<LocationRoute />} />
>>>>>>> b61c9b3971a8792d5ad664860591d5be66e6b8da
        </Routes>
        <NavBar />
      </Router>
    </>
  );
}

export default App;
