import axios from "axios";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { auth } from "../shared/auth.state";
import { useNavigate } from "react-router-dom";

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
        navigate("/");
      });
  };
  return (
    <>
      <div class="p-10">
        <h1 class="mb-8 font-extrabold text-4xl">Login</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form onSubmit={onSubmit}>
            <div class="mt-4">
              <label class="block font-semibold" for="email">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                class="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1 w-full"
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
                class="w-full shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1 w-full"
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
                class="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              >
                Login
              </button>
              <a class="font-semibold">Already registered?</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
