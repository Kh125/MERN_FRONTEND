import React from "react";
import { Link } from "react-router-dom";

const RedirectComponent = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col justify-center items-center mx-4 px-10 py-6 bg-blue-400 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12 text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>

          <div className="">
            <p className="text-center mb-6">
              You need to be authenticated user to access this feature!
            </p>
            <div className="flex items-center justify-center mt-8">
              <Link
                to="/login"
                type="submit"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-dark md:py-4 md:text-lg md:px-10"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RedirectComponent;
