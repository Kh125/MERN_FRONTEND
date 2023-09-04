import React from "react";
import { Link } from "react-router-dom";

const RedirectComponent = () => {
    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col justify-center items-center mx-4 px-10 py-6 bg-custom-light-blue rounded-lg">
                    <div className="">
                        <h1 className="mb-2 font-semibold text-2xl text-center">Login Required!</h1>
                        <p className="text-center mb-6">You need to be authenticated user to access this feature!</p>
                        <div className="flex items-center justify-center mt-8">
                            <Link to="/login"
                                type="submit"
                                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-custom-dark hover:bg-dark md:py-4 md:text-lg md:px-10"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
      );
}

export default RedirectComponent