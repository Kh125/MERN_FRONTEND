import "./App.css";

import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'

import Weather from "./components/Weather";
import NavBar from "./components/Navbar";
import Schedule from "./pages/Schedule";
import Notification from "./pages/Notification";
import Profile from "./pages/Profile";
import Home from "./pages/Home"

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
            </Routes>
            <NavBar/>
        </Router>

        </>
    );
}

export default App;
