import axios from "axios";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { auth } from "../shared/auth.state";
import { Link, useNavigate } from "react-router-dom";
import { requestNotificationPermission } from "../utils/notificationHandler";
import { storeDataInIndexedDB } from "../utils/indexDB";

const Login = () => {
  const [isAuth, setIsAuth] = useRecoilState(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("/api/routes/login", {
        email,
        password,
      })
      .then(() => {
        setIsAuth(true);

        // // Clear IndexDB
        // indexedDB.deleteDatabase("uniNotify")

        // axios.get("api/routes/getschedules", {
        //   email, password
        // })
        // .then((res) => {
        //   console.log(res.data[0]["Schedule"]);
        //   storeDataInIndexedDB(res.data[0]["Schedule"])
        // })

        requestNotificationPermission()

        navigator.serviceWorker.controller.postMessage({ action: 'login' });

        setTimeout(() => navigate("/"), 1000);
      })
      .catch((e) => {
        setError(e.response.data.error);
        console.log(e.response);
      });
  };
  return (
    <>
      <div className="flex flex-col justify-center items-start h-screen  text-blue-500">
        <div className="px-4 mb-8">
          <p className="text-5xl font-extrabold uppercase">Login</p>
        </div>
        <form
          onSubmit={onSubmit}
          className="w-full flex flex-col justify-center items-center px-4 font-mono"
        >
          <div className="mt-6 w-full">
            <label className="block font-semibold text-xl" htmlFor="email">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-inner bg-gray-100 rounded-lg placeholder-blue-500 text-lg p-4 border-none block mt-1 w-full"
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
              className="shadow-inner bg-gray-100 rounded-lg placeholder-blue-500 text-lg p-4 border-no w-full"
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
              className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-md text-white bg-blue-500 hover:bg-dark md:py-4 md:text-lg md:px-10"
            >
              Log In
            </button>
            <Link to="/signup" className="font-semibold underline">
              Haven't registered?
            </Link>
          </div>
          {error && (
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

              <p className="text-red-500 font-semibold pl-3">{error}</p>
            </div>
          )}
        </form>
      </div>
    </>
  );
};
export default Login;
