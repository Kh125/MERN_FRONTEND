import React, { useState } from "react";
import ScheduleWidget from "./ScheduleWidget";

const WeekSchedule = ({ schedule }) => {
  const [day, setDay] = useState("Monday");

  return (
    <div className="bg-custom-blue pt-4 rounded-t-custom-t h-screen">
      <div className="w-full flex items-center justify-center">
        <select
          onChange={(e) => setDay(e.target.value)}
          id="default"
          className=" border  text-stone-200 mb-6 text rounded-lg    block p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400text-white focus:ring-blue-500 focus:border-blue-500"
        >
          <option selected value="Monday">
            Monday
          </option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
        </select>
      </div>
      <div className="overflow-y-scroll max-h-[400px] pt-2 pb-[4rem]">
        {schedule[0].Schedule[day].map((s) => (
          <div key={s._id}>
            <ScheduleWidget key={s._id} schedule={s} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekSchedule;
