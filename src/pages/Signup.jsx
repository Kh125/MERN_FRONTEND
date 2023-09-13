import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState()
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("/api/routes/register", {
        username,
        email,
        password,
      })
      .then(() => {
        setTimeout(() => navigate("/login"), 1000);
      })
      .catch((errors) => {
        setErrors(errors.response.data.error)
        console.log(errors);
      })
  };

  return (
    <>
      <div className="flex flex-col justify-center items-start h-screen text-blue-500">
          <div className="px-4 mb-8">
              <p className="text-5xl font-extrabold uppercase">Signup</p>
          </div>
          <form onSubmit={onSubmit} className="w-full flex flex-col justify-center items-center px-4 font-mono">
          <div className="mt-4 w-full">
              <label className="block font-semibold text-xl" htmlFor="username">
                Username
              </label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                className="shadow-inner bg-gray-100 rounded-lg placeholder-black text-lg p-4 border-none block mt-1 w-full"
                id="username"
                type="text"
                name="username"
                required="required"
              ></input>
            </div>

            <div className="mt-6 w-full">
              <label className="block font-semibold text-xl" htmlFor="email">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="shadow-inner bg-gray-100 rounded-lg placeholder-black text-lg p-4 border-none block mt-1 w-full"
                id="email"
                type="email"
                name="email"
                required="required"
              ></input>
            </div>

            <div className="mt-6 w-full">
              <label className="block font-semibold text-xl" htmlFor="password">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="shadow-inner bg-gray-100 rounded-lg placeholder-black text-lg p-4 border-no w-full"
                id="password"
                type="password"
                name="password"
                required="required"
                autoComplete="new-password"
              ></input>
            </div>


            <div className="mt-6 w-full flex items-center justify-between">
              <button
                type="submit"
                className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-dark md:py-4 md:text-lg md:px-10"
              >
                Sign Up
              </button>
              <Link to="/login" className="font-semibold underline">
                Already registered?
              </Link>
            </div>
            <div>
              <p className="text-red-400">{errors}</p>
            </div>
          </form>
      </div>
    </>
  );
};
export default Signup;
