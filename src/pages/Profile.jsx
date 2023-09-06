import React from "react";
import { useAuth } from "../hooks/auth";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { auth } from "../shared/auth.state";
import axios from "axios";
import RedirectComponent from "../components/Redirect";
import ProfileSection from "../components/ProfileSection";

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
        <div className="max-w-md mx-auto bg-custom-light-blue h-screen overflow-hidden">
          <ProfileSection user={user} />
          <div className="w-full flex item-center justify-center py-20">
            <button
              onClick={onLogout}
              type="button"
              class=" font-mono text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-semibold rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <RedirectComponent />
      )}
    </>
  );
};
export default Profile;
