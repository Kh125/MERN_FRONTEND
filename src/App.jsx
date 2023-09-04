import "./App.css";

import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'

import Weather from "./components/Weather";
import NavBar from "./components/Navbar";
import Schedule from "./pages/Schedule";
import Notification from "./pages/Notification";
import Profile from "./pages/Profile";
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup";

function App() {
    return (
        // <div className="w-screen h-screen bg-blue-400">
        //     <Weather />
        // </div>

        <>
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/schedule" element={<Schedule/>}/>
                <Route path="/notification" element={<Notification/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
            </Routes>
            <NavBar/>
        </Router>

        </>
    );
}

export default App;
