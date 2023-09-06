import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <>
      <div class="transition-all flex justify-center items-center h-screen font-mono">
        <div>
          <h1 class="mb-8 font-bold text-4xl">Register</h1>
          <form>
            <div>
              <label class="block font-semibold" for="name">
                Username
              </label>
              <input
                class="shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1 w-full"
                id="name"
                type="text"
                name="name"
                required="required"
                autofocus="autofocus"
              ></input>
            </div>

            <div class="mt-4">
              <label class="block font-semibold" for="email">
                Email
              </label>
              <input
                class="shadow-inner bg-gray-100 rounded-lg placeholder-black text-2xl p-4 border-none block mt-1 w-full"
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
                class="flex items-center font-semibold justify-center px-3 py-3 border border-transparent text-base font-medium rounded-md text-white bg-custom-dark md:py-4 md:text-lg md:px-10"
              >
                Register
              </button>
              <Link to="/login" class="font-semibold">
                Already registered?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Signup;
