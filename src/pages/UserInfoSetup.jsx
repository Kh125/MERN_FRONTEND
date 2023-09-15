import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { convert } from "../utils/expend";
import axios from "axios";
import { useAuth } from "../hooks/auth";
import { storeDataInIndexedDB } from "../utils/indexDB";

const UserInfoSetup = () => {
    const [roll, setRoll] = useState("");
    const [major, setMajor] = useState("");
    const [year, setYear] = useState("");
    const [availableMajors, setAvailableMajors] = useState([])
    const navigate = useNavigate();
    const user = useAuth();
    
    const handleYearChange = (e) => {
        const selectedYear = e.target.value;
        setYear(selectedYear);

        // Define the available majors based on the selected academic year
        if (selectedYear === "3") {
            setAvailableMajors(["CS", "CT"]);
        } else if (selectedYear === "4" || selectedYear === "5") {
            setAvailableMajors(["HPC", "CN", "KE", "SE", "BIS", "ES"]);
        } else {
            setAvailableMajors([]);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        axios
        .post("/api/routes/updateinfo", {
            studentId: roll,
            academicYear: year,
            major: major,
        })
        .then((response) => {
            const updatedUser = response.data.user
            localStorage.setItem("user", JSON.stringify(updatedUser));
            console.log("Userinfo setup page", user);
            const email = user.email
            const password = user.password

            axios.get("api/routes/getschedules", {
                email, password
              })
              .then((res) => {
                console.log("setupinfo response", major);
                storeDataInIndexedDB(res.data[0]["Schedule"], major)
                navigator.serviceWorker.controller.postMessage({ action: 'info-setup', major })
              })

            setTimeout(() => navigate("/"), 1000);
        });
    };

    return (
        <>
            <div class="flex flex-col justify-center items-start h-screen text-blue-500">
                <div className="px-4 mb-8">
                    <p className="text-5xl font-extrabold uppercase">Setup your profile</p>
                </div>
                <form onSubmit={onSubmit} className="w-full flex flex-col justify-center items-center px-4 font-mono">
                    <div className="mt-4 w-full">
                        <label class="block font-semibold text-xl" htmlFor="roll">
                        Roll Number
                        </label>
                        <input
                            onChange={(e) => setRoll(e.target.value)}
                            className="shadow-inner bg-gray-100 rounded-lg placeholder-blue-500 text-lg p-4 border-none block mt-1 w-full"
                            id="roll"
                            type="text"
                            name="roll"
                            required="required"
                            placeholder="Please input only number"
                        ></input>
                    </div>

                    <div className="mt-8 w-full">
                        <label className="block font-semibold text-xl" htmlFor="year">
                            Academic Year
                        </label>
                        <select
                            onChange={handleYearChange}
                            className="shadow-inner bg-gray-100 rounded-lg placeholder-black text-lg p-4 border-none mt-1 w-full"
                            id="year"
                            name="year"
                            required
                        >
                            <option value="">Select Academic Year</option>
                            <option value="1">1st Year</option>
                            <option value="2">2nd Year</option>
                            <option value="3">3rd Year</option>
                            <option value="4">4th Year</option>
                            <option value="5">5th Year</option>
                        </select>
                    </div>

                    <div className="mt-8 w-full">
                        <label className="block font-semibold text-xl" htmlFor="major">
                            Major
                        </label>
                        <select
                            onChange={(e) => setMajor(e.target.value)}
                            className="shadow-inner bg-gray-100 rounded-lg placeholder-black text-lg p-4 border-none mt-1 w-full"
                            id="major"
                            name="major"
                            required
                            disabled={!availableMajors.length}
                        >
                            <option value="">Select Major</option>
                            {availableMajors.map((availableMajor) => (
                                <option key={availableMajor} value={availableMajor}>
                                    {convert(availableMajor)}
                                </option>
                            ))}
                        </select>
                    </div>
        
                    <div class="mt-6 w-full">
                        <button
                        type="submit"
                        class="flex items-start justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-dark md:py-4 md:text-lg md:px-10"
                        >
                        Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default UserInfoSetup