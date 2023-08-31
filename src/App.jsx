import "./App.css";
import Navbar from "./components/button-nav/Navbar";
import Weather from "./Weather";

function App() {
    return (
        <div className="w-screen h-screen bg-red-300">
            <Navbar />
            <Weather />
        </div>
    );
}

export default App;
