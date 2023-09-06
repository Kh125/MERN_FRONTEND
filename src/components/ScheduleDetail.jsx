import React from "react";

const ScheduleDetail = (props) => {
  const schedule = props.selectedSchedule;
  const phoneRedirectLink = `tel:${schedule.TeacherPhNo}`;

  return (
    <div className="max-w-md mx-auto fixed inset-x-0 bottom-0 flex items-center justify-center bg-custom-widget-color text-custom-time rounded-t-custom-t">
      <div className="max-w-md mx-auto p-4 w-screen h-[580px] rounded-t-custom-t">
        <div className="text-right px-5">
          <div
            onClick={props.onCloseDetailPage}
            className="text-4xl cursor-pointer"
          >
            &times;
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="bg-custom-blue rounded-full w-32 py-2 mb-6 text-center text-white">
            Lecture
          </div>
          <h1 className="text-2xl font-bold text-center">{schedule.Subject}</h1>
        </div>
        <div id="schedule-detail-info" className="mt-16 w-full">
          {/* Time */}
          <div className="flex items-center justify-center bg-custom-light-blue rounded-xl mb-2 px-3 py-4 w-full">
            <div className="w-14 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-amber-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="flex-grow pl-3 font-bold">
              {schedule.from} - {schedule.to}
            </div>
          </div>

          {/* Person */}
          <div className="flex items-center justify-center bg-custom-light-blue rounded-xl mb-2 px-3 py-4 w-full">
            <div className="w-14 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-amber-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
            <div className="flex-grow pl-3 font-bold">
              {schedule.Teacher}
              <p className="font-semibold">{schedule.TeacherPhNo}</p>
            </div>
            <div>
              <a
                href={phoneRedirectLink}
                className="w-16 h-8 flex items-center justify-center border-orange-400 border-2 rounded-3xl font-bold"
              >
                Call
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center bg-custom-light-blue rounded-xl mb-2 px-3 py-4 w-full">
            <div className="w-14 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-amber-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
            </div>
            <div className="flex-grow pl-3 font-bold">{schedule.Location}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleDetail;
