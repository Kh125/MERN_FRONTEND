import axios from "axios";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { auth } from "../shared/auth.state";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [isAuth, setIsAuth] = useRecoilState(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("/api/routes/login", {
        email,
        password,
      })
      .then(() => {
        setIsAuth(true);
        setTimeout(() => navigate("/"), 1000);
      });
  };
  console.log(isAuth);
  return (
    <>
      <div class="flex justify-center items-center h-screen font-mono">
        <div class="py-6 rounded-lg">
          <h1 class="text-left mb-8 font-bold text-4xl">Login</h1>
          <form onSubmit={onSubmit}>
            <div class="mt-4">
              <label class="block font-semibold" for="email">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                class="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1"
                id="email"
                type="email"
                name="email"
                required="required"
              ></input>
            </div>

            <div class="mt-4">
              <label class="block font-semibold" for="password">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                class="shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1 w-full"
                id="password"
                type="password"
                name="password"
                required="required"
                autocomplete="new-password"
              ></input>
            </div>

            <div class="flex items-center justify-between mt-8">
              <button
                type="submit"
                class="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-custom-dark hover:bg-dark md:py-4 md:text-lg md:px-10"
              >
                Login
              </button>
              <Link to="/signup" class="font-semibold underline">
                Haven't registered?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
