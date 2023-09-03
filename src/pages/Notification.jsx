import React from "react";
import { useAuth } from "../hooks/auth";
import RedirectComponent from "../components/Redirect";

const Notification = () => {
  const user = useAuth();
  
  return (
    <>{user ? <p>Notification Page</p> : <RedirectComponent />}</>
  );
};
export default Notification;
