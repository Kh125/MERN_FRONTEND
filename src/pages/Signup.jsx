import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
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
        setErrors(errors.response.data.error);
        console.log(errors);
      });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-start h-screen  text-blue-500">
        <div className="px-4 mb-8">
          <p className="text-5xl font-extrabold uppercase">Signup</p>
        </div>
        <form
          onSubmit={onSubmit}
          className="w-full flex flex-col justify-center items-center px-4 font-mono"
        >
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
              className="flex items-center justify-center px-8 font-semibold py-3 border border-transparent text-base  rounded-md text-white bg-blue-500 hover:bg-dark md:py-4 md:text-lg md:px-10"
            >
              Sign Up
            </button>
            <Link to="/login" className="font-semibold underline">
              Already registered?
            </Link>
          </div>
          {errors && (
            <div className="w-full  p-2 bg-red-200 my-3 rounded-lg flex items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>

              <p className="text-red-500 font-semibold pl-3">{errors}</p>
            </div>
          )}
        </form>
      </div>
    </>
  );
};
export default Signup;
