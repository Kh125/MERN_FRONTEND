import React from "react";
import { getTimeDifference, notificationAge } from "../utils/time";

const ClassAge = ({ period }) => {
  const { future, past, present } = notificationAge(period.from, period.to);
  const timeDifference = getTimeDifference(period.from);

  console.log({ future, present, past });
  return (
    <>
      {present && (
        <div className="w-full py-2 px-3 bg-blue-500 mt-2 text-white font-semibold rounded-md shadow-md">
          <p>Currently Happening</p>
        </div>
      )}
      {future && (
        <div className="w-full py-2 px-3 bg-blue-500 mt-2 text-white font-semibold rounded-md shadow-md">
          <p>Class is about to start in {period.from} </p>
        </div>
      )}
      {past && (
        <div className="w-full py-2 px-3 bg-red-500 mt-2 text-white font-semibold rounded-md shadow-md">
          <p>Class was ended at {period.to}</p>
        </div>
      )}
    </>
  );
};

export default ClassAge;
