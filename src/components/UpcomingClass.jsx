import { useAuth } from "../hooks/auth";
import { useSchedule } from "../hooks/schedule";
import { storeDataInIndexedDB } from "../utils/indexDB";
import {
  calculateRemainingTimeInMinute,
  findNearestOrEqualTime,
  formatTimeWithLeadingZero
} from "../utils/time";
import Relax from "./Relax";

const UpcomingClass = () => {
  const user = useAuth()
  const schedules = useSchedule();
  const currentDateTime = new Date();
  const currentDay = currentDateTime.toLocaleDateString("en-US", {
    weekday: "long",
  });
  let remainingTime = 0;
  let nearestClass = null;
  
  // Find the nearest or equal "from" time
  if(user) {
    if (
      schedules &&
      schedules[0] &&
      schedules[0].Schedule &&
      schedules[0].Schedule[currentDay]
    ) {
      storeDataInIndexedDB(schedules[0].Schedule)
      // Find the nearest or equal "from" time
      nearestClass = findNearestOrEqualTime(
        schedules[0].Schedule[currentDay],
        currentDateTime
      );
    }
  
    // Display the result
    if (nearestClass && nearestClass[0]) {
      // console.log(`Total ${nearestClass[1]} classes remaining.`);
  
      remainingTime = calculateRemainingTimeInMinute(
        nearestClass[0].from,
        currentDateTime
      );
  
      // console.log(
      //   `Nearest or equal class: ${nearestClass[0].Subject} at ${nearestClass[0].from}`
      // );
    } else {
      console.log("No classes found for today.");
    }
  }

  return (
    <>
      {nearestClass ? (
        <div
          className={
            nearestClass[0]
              ? " text-custom-time py-4 rounded-t-custom-t mb-16 font-mono"
              : "bg-transparent"
          }
        >
          <div className="bg-custom-purple-color text-custom-size-18 flex items-center justify-between mx-3 px-4 py-5 rounded-2xl">
            <p className="font-bold">Remaining Classes</p>
            <p className="font-bold">{nearestClass[1]} classes</p>
          </div>
          {nearestClass[0] && (
            <div className="bg-custom-light-blue text-custom-upcoming-text mx-3 mt-3 rounded-2xl">
              {/* Time Display */}
              <div className="flex items-center justify-between px-4 py-2 mb-1">
                <p className="text-custom-size-36 font-bold">
                  {remainingTime[0]
                    ? `${formatTimeWithLeadingZero(remainingTime[0])}:`
                    : ""}
                  {remainingTime[1]
                    ? `${formatTimeWithLeadingZero(remainingTime[1])}`
                    : ""}
                  <span className="text-custom-upcoming-sub-text text-custom-size-18">
                    {" "}
                    mins until Period {nearestClass[0].Period}
                  </span>
                </p>
              </div>
              {/* Time Display */}
              {/* Lecture Title */}
              <div className="px-4 mb-1">
                <p className="text-custom-size-26 text-custom-upcoming-text font-semibold">
                  {nearestClass[0].Subject}
                </p>
              </div>
              {/* Lecture Title */}
              {/* {Lecture Info} */}
              <div className="lecture-info py-2">
                <div className="flex items-start justify-start px-4 text-custom-size-18 font-semibold">
                  <p className="text-custom-upcoming-sub-text w-36">
                    Lecturer Name
                  </p>
                  <p className="text-custom-upcoming-text flex-1">
                    {nearestClass[0].Teacher}
                  </p>
                  {/* Use flex-1 to make this flex item take up the remaining space */}
                </div>
                <div className="flex items-start justify-start px-4 text-custom-size-18 font-semibold mt-2">
                  <p className="text-custom-upcoming-sub-text w-36">Room No</p>
                  <p className="text-custom-upcoming-text flex-1">
                    {nearestClass[0].Location}
                  </p>
                </div>
              </div>
              {/* {Lecture Info} */}
            </div>
          )}
        </div>
      ) : (
        <Relax />
      )}
    </>
  );
};

export default UpcomingClass;
