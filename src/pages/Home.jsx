import React from "react";
import Weather from "../components/Weather";
import { useSchedule } from "../hooks/schedule";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <>
      <Weather />
    </>
  );
};
export default Home;
