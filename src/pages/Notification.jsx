import React from "react";
import { useAuth } from "../hooks/auth";
import { Link } from "react-router-dom";

const Notification = () => {
  const user = useAuth();
  return (
    <>{user ? <p>Notification Page</p> : <Link to="/login">Login</Link>}</>
  );
};
export default Notification;
