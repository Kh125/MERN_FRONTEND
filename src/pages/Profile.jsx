import React from "react";
import { useAuth } from "../hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { auth } from "../shared/auth.state";
import axios from "axios";

const Profile = () => {
  const user = useAuth();
  const [isAuth, setIsAuth] = useRecoilState(auth);
  const navigate = useNavigate();
  const onLogout = async () => {
    await axios.post("/api/routes/logout").then(() => {
      setIsAuth(false);
      navigate("/");
    });
  };
  return (
    <>
      {user ? (
        <div>
          <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
            <li class="mr-2">
              <a
                href="#"
                aria-current="page"
                class="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
              >
                User Profile
              </a>
            </li>
            <li class="mr-2">
              <a
                href="#"
                class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              >
                Major
              </a>
            </li>
            <li class="mr-2">
              <a
                href="#"
                class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              >
                Settings
              </a>
            </li>
          </ul>
          <button
            onClick={onLogout}
            type="button"
            class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </>
  );
};
export default Profile;
