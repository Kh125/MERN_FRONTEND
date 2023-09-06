import React from "react";
import { useAuth } from "../hooks/auth";
import RedirectComponent from "../components/Redirect";

const Notification = () => {
  const user = useAuth();

  return (
    <>
      {user ? (
        <div className="max-w-md mx-auto font-mono bg-custom-light-blue h-screen overflow-hidden">
          <p>Notification</p>
        </div>
      ) : (
        <RedirectComponent />
      )}
    </>
  );
};
export default Notification;
