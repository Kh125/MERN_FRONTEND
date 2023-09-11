import React from "react";
import { notificationAge } from "../utils/time";
import { Link } from "react-router-dom";

const NotiWidget = ({ period }) => {
  console.log(period);

  const { future, past } = notificationAge(period.from);
  console.log({ future, past });
  return (
    <>
      <Link
        to={`${future ? `/location/${period.id}` : "#"}`}
        className={`w-full my-2 p-2 ${future && "bg-white"} ${
          past && "bg-stone-100"
        } rounded-lg shadow flex items-center `}
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-8  h-8 ${future && "text-stone-400"} ${
              past && "text-stone-300"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
          </svg>
        </div>
        <div className="pl-2">
          <p
            className={`${future && "text-stone-400"} ${
              past && "text-stone-300"
            } font-semibold`}
          >
            Upcomming Class
          </p>
          <span
            className={`${future && "text-stone-400"} ${
              past && "text-stone-300"
            } text-sm`}
          >
            {period.subject} is about to start at {period.from}
          </span>
        </div>
      </Link>
    </>
  );
};
export default NotiWidget;
