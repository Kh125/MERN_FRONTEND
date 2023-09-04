import React, { useEffect, useState } from "react";
import ScheduleWidget from "../components/ScheduleWidget";
import axios from "axios";
import { useAuth } from "../hooks/auth";
import RedirectComponent from "../components/Redirect";
import ScheduleDetail from "../components/ScheduleDetail";

const Schedule = () => {
  const user = useAuth();
  const [schedule, setSchedule] = useState(undefined);
  
  // Schedule Detail
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [showDetailPage, setShowDetailPage] = useState(false);

  const handleScheduleClick = (schedule) => {
    setSelectedSchedule(schedule);
    setShowDetailPage(true);
  };

  // for current time
  const [hourMin, amPm] = getCurrentTime12HourFormat();
  const date = new Date();
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;

  const fetchSchedule = async () => {
    const response = await axios.get("/api/routes/getSchedules");
    if (response.status == 200) setSchedule(response.data);
  };

  useEffect(() => {
    if(user) {
      fetchSchedule();
    }
  }, [user, isWeekend]);

  return (
    <>
      {user ? (
        <div className="bg-custom-light-blue h-screen overflow-hidden">
          <div className="bg-custom-light-blue py-4">
            {/* Title Section */}
            <div className="px-4 my-5">
              <h1 className="text-custom-size-30 font-bold">Uni-Notify</h1>
            </div>
            <div className="px-4 my-6">
              <h1 className="text-custom-time text-custom-size-60 font-extrabold text-right">
                {hourMin}{" "}
                <span className="uppercase text-custom-color text-custom-size-30">
                  {amPm}
                </span>
              </h1>
            </div>
            <div className="px-4 my-4">
              <h1 className="text-2xl font-semibold text-custom-class-title">
                {isWeekend ? 'No Upcoming Classes' : 'Upcoming Classes'}
              </h1>
            </div>
            {/* Title Section */}

            {/* Upcoming Class section */}
            {!isWeekend ? (
                <div className="bg-custom-blue pt-4 rounded-t-custom-t h-screen">
                    <div className="flex space-x-6 justify-center mb-4">
                        <button className="bg-white text-black py-2 px-4 rounded-full w-28 h-12 font-semibold">
                        Today
                        </button>
                        <button className="bg-custom-dark text-white py-2 px-4 rounded-full w-28 h-12 font-semibold">
                        All
                        </button>
                    </div>
                    <div className="overflow-y-scroll max-h-[500px] pt-2 pb-[4rem]">
                        {date.getDay() === 1 &&
                        schedule &&
                        schedule[0].Schedule.Monday.map((s) => (
                          <div onClick={() => handleScheduleClick(s)}>
                            <ScheduleWidget key={s.SubjectID} schedule={s} />
                          </div>
                        ))}
                        {date.getDay() === 2 &&
                        schedule &&
                        schedule[0].Schedule.Tuesday.map((s) => (
                          <div onClick={() => handleScheduleClick(s)}>
                            <ScheduleWidget key={s.SubjectID} schedule={s} />
                          </div>
                        ))}
                        {date.getDay() === 3 &&
                        schedule &&
                        schedule[0].Schedule.Wednesday.map((s) => (
                          <div onClick={() => handleScheduleClick(s)}>
                            <ScheduleWidget key={s.SubjectID} schedule={s} />
                          </div>
                        ))}
                        {date.getDay() === 4 &&
                        schedule &&
                        schedule[0].Schedule.Thursday.map((s) => (
                          <div onClick={() => handleScheduleClick(s)}>
                            <ScheduleWidget key={s.SubjectID} schedule={s} />
                          </div>
                        ))}
                        {date.getDay() === 5 &&
                        schedule &&
                        schedule[0].Schedule.Friday.map((s) => (
                          <div onClick={() => handleScheduleClick(s)}>
                            <ScheduleWidget key={s.SubjectID} schedule={s} />
                          </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="bg-transparent mx-2 my-32 p-4 flex flex-col justify-center items-center h-54 rounded-lg">
                    <div className="flex justify-center items-center mb-4">
                        <img src="/relax.svg" alt="Relax Img" style={{ width: "200px" }} />
                    </div>
                    <p className="text-custom-size-30 font-semibold text-center text-custom-time">Enjoy Your Weekend!</p>
                </div>
            )}
            {/* Upcoming Class section */}
          </div>

          {/* Show Widget Detail Component */}
          {showDetailPage && selectedSchedule && (
            <ScheduleDetail selectedSchedule={selectedSchedule} 
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

const getCurrentTime12HourFormat = () => {
  const currentTime = new Date();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  const amPm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }

  // Add leading zeros to minutes if needed
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return [`${hours}:${minutes}`, amPm];
};

export default Schedule;
