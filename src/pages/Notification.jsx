import React from "react";
import { useAuth } from "../hooks/auth";
import RedirectComponent from "../components/Redirect";

const Notification = () => {
  const user = useAuth();

  return (
    <>
      {user ? (
        <div className="max-w-md mx-auto font-mono bg-custom-light-blue h-screen overflow-hidden">
          <div className="w-full pt-20 px-4 my-10 font-mono">
            <p className="text-3xl font-semibold space-x-5"> Notifications</p>
          </div>
        </div>
      ) : (
        <RedirectComponent />
      )}
    </>
  );
};
export default Notification;
