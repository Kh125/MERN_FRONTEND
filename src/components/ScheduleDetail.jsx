import React from "react";

const ScheduleDetail = (props) => {
    const schedule = props.selectedSchedule
    const phoneRedirectLink = `tel:${schedule.TeacherPhNo}`

    return (
        <div className="max-w-md mx-auto fixed inset-x-0 bottom-0 flex items-center justify-center bg-custom-widget-color text-custom-time rounded-t-custom-t">
            <div className="max-w-md mx-auto p-4 w-screen h-[580px] rounded-t-custom-t">
              <div className="text-right px-5">
                <div onClick={props.onCloseDetailPage } className="text-4xl cursor-pointer">&times;</div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="bg-custom-blue rounded-full w-32 py-2 mb-6 text-center text-white">Lecture</div>
                <h1 className="text-2xl font-bold text-center">{schedule.Subject}</h1>
              </div>
              <div id="schedule-detail-info" className="mt-16 w-full">
                {/* Time */}
                <div className="flex items-center justify-center bg-custom-light-blue rounded-xl mb-2 px-3 py-4 w-full">
                  <div className="w-14 flex items-center justify-center">
                    <img src="/clock.svg" alt="Clock Img" style={{ width: "30px" }} />
                  </div>
                  <div className="flex-grow pl-3 font-bold">
                    {schedule.from} - {schedule.to}
                  </div>
                </div>

                {/* Person */}
                <div className="flex items-center justify-center bg-custom-light-blue rounded-xl mb-2 px-3 py-4 w-full">
                  <div className="w-14 flex items-center justify-center">
                    <img src="/person.svg" alt="Clock Img" style={{ width: "32px" }} />
                  </div>
                  <div className="flex-grow pl-3 font-bold">
                    {schedule.Teacher}
                    <p className="font-semibold">{schedule.TeacherPhNo}</p>
                  </div>
                  <div>
                    <a href={phoneRedirectLink} className="w-16 h-10 flex items-center justify-center border-orange-400 border-2 rounded-3xl font-bold">Call</a>
                  </div>
                </div>

                <div className="flex items-center justify-center bg-custom-light-blue rounded-xl mb-2 px-3 py-4 w-full">
                  <div className="w-14 flex items-center justify-center">
                    <img src="/location.svg" alt="Clock Img" style={{ width: "28px" }} />
                  </div>
                  <div className="flex-grow pl-3 font-bold">
                    {schedule.Location}
                  </div>
                </div>
              </div>
            </div>
          </div>
    )
}

export default ScheduleDetail