import React, { useState } from "react";
import AnalogClock from "analog-clock-react";
import ScheduleWidget from "../components/ScheduleWidget";
import { useAuth } from "../hooks/auth";
import RedirectComponent from "../components/Redirect";
import ScheduleDetail from "../components/ScheduleDetail";
import { useSchedule } from "../hooks/schedule";
import Relax from "../components/Relax";
import WeekSchedule from "../components/WeekSchedule";
import { useUserInfo } from "../hooks/userInfo";
import logo from "../../public/logo.svg";

const Schedule = () => {
  const user = useAuth();
  const userInfo = useUserInfo();
  const schedules = useSchedule();

  // Schedule Detail
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [showDetailPage, setShowDetailPage] = useState(false);
  const [isWeekTab, setWeekTab] = useState(false);

  const handleScheduleClick = (schedule) => {
    setSelectedSchedule(schedule);
    setShowDetailPage(true);
  };

  const date = new Date();
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
  const options = {
    width: "100px",
    baseColor: "#282D35",
    centerColor: "#2F69FC",
    centerBorderColor: "#ffffff",
    handColors: {
      second: "#CF8D3F",
      minute: "#DEF0FF",
      hour: "#DEF0FF",
    },
  };
  const currentDay = date.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const day = date.toLocaleTimeString();
  console.log(day);
  return (
    <>
      {user ? (
        <div className="max-w-md mx-auto font-mono bg-blue-500 h-screen overflow-hidden">
          <div className="bg-blue-500 py-4">
            {/* Title Section */}
            <div className="px-4 flex items-center">
              <img src={logo} className="w-14" alt="" />
              <p className="pl-2 text-lg text-white font-semibold"> Notify U</p>
            </div>
            <div className=" px-4 py-10 flex w-full items-center justify-end  rounded-lg">
              <p className="text-3xl px-4 py-2 bg-white rounded-xl text-blue-800">
                {day}
              </p>
            </div>

            {!showDetailPage && (
              <>
                {" "}
                {/* <div className="px-4 my-4">
                  <h1 className="text-2xl font-semibold text-custom-class-title">
                    {isWeekend ? "No Classes for Today" : "Today Classes"}
                  </h1>
                </div> */}
                {!isWeekend && (
                  <div className="flex space-x-6 justify-center mb-4">
                    <button
                      onClick={() => setWeekTab(false)}
                      className={`${
                        isWeekTab
                          ? "bg-blue-700 text-white"
                          : "bg-white text-custom-dark"
                      }  py-2 px-4 rounded-full w-28 h-12 font-semibold shadow-md`}
                    >
                      Today
                    </button>
                    <button
                      onClick={() => setWeekTab(true)}
                      className={`${
                        isWeekTab
                          ? "bg-white text-custom-dark"
                          : "bg-blue-700 text-white"
                      }  py-2 px-4 rounded-full w-28 h-12 font-semibold shadow-md`}
                    >
                      All
                    </button>
                  </div>
                )}
              </>
            )}
            {/* Title Section */}

            {/* Today Class section */}
            {isWeekTab ? (
              schedules && <WeekSchedule schedule={schedules} />
            ) : (
              <>
                {!isWeekend && !showDetailPage ? (
                  <div className="bg-white pt-4 bottom-10 fixed rounded-t-custom-t shadow-lg">
                    <p className="px-8 py-4 text-black text-2xl font-bold">
                      Today Classes
                    </p>
                    <div className="overflow-y-scroll max-h-[500px] pt-2 pb-[4rem]">
                      {schedules &&
                        schedules[0] &&
                        schedules[0].Schedule &&
                        schedules[0].Schedule[currentDay].map((s) => (
                          <div
                            key={s._id}
                            onClick={() => handleScheduleClick(s)}
                          >
                            <ScheduleWidget key={s._id} schedule={s} />
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  <Relax />
                )}
              </>
            )}
            {/* Today Class section */}
          </div>

          {/* Show Widget Detail Component */}
          {showDetailPage && selectedSchedule && (
            <ScheduleDetail
              selectedSchedule={selectedSchedule}
              onCloseDetailPage={() => setShowDetailPage(false)}
            />
          )}
        </div>
      ) : (
        <RedirectComponent />
      )}
    </>
  );
};

export default Schedule;
