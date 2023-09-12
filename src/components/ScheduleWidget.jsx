import { color } from "../utils/generateColor";

const ScheduleWidget = ({ schedule }) => {
  const c = color();
  return (
    <>
      <div>
        <div
          className={`${c} shadow-md mx-2 mb-2 px-4 py-2  rounded-xl cursor-pointer`}
        >
          <div className="flex flex-col items-start justify-between">
            <div className="flex items-center">
              <div className="flex-col space-y-2 mx-3">
                <div className="flex w-full text-stone-400 ">
                  <p className="text-lg font-bold">
                    {removeAmPm(schedule.from)}
                  </p>
                  <p className="text-lg font-bold pl-4 ">
                    {removeAmPm(schedule.to)}
                  </p>
                </div>
                <p className="text-xl font-semibold text-stone-900">
                  {schedule.Subject}
                </p>
                <div className="flex justify-start items-center">
                  <p className=" text-lg font-bold text-stone-700">
                    {schedule.Location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const removeAmPm = (timeString) => {
  // Use regular expression to remove " AM" or " PM" (with space) at the end
  return timeString.replace(/ AM$| PM$/, "");
};

export default ScheduleWidget;
