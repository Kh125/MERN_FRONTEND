import React from "react";
import Weather from "../components/Weather";
import { useSchedule } from "../hooks/schedule";

const Home = () => {
  const schedules = useSchedule();
  console.log(schedules);
  return (
    <>
      <Weather />
    </>
  );
};
export default Home;
