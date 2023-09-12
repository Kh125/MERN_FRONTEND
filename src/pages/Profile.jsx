import React from "react";
import { useAuth } from "../hooks/auth";
import RedirectComponent from "../components/Redirect";
import ProfileSection from "../components/ProfileSection";

const Profile = () => {
  const user = useAuth();

  return (
    <>
      {user ? (
        <div className="max-w-md mx-auto h-screen overflow-hidden">
          <ProfileSection user={user} />
        </div>
      ) : (
        <RedirectComponent />
      )}
    </>
  );
};
export default Profile;
