import React from "react";
import { useAuth } from "../hooks/auth";
import RedirectComponent from "../components/Redirect";
import ProfileSection from "../components/ProfileSection";
import logo from "../../public/logo.svg";

const Profile = () => {
  const user = useAuth();

  return (
    <>
      {user ? (
        <div className="max-w-md mx-auto font-mono bg-blue-500 h-screen overflow-hidden">
          <div className="px-4 mt-3 flex items-center">
            <img src={logo} className="w-14" alt="" />
            <p className="pl-2 text-lg text-white font-semibold"> Notify U</p>
          </div>
          <ProfileSection user={user} />
        </div>
      ) : (
        <RedirectComponent />
      )}
    </>
  );
};
export default Profile;
