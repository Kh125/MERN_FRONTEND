import { color } from "../utils/generateColor";

const ScheduleWidget = ({ schedule }) => {
  const c = color();
  return (
    <>
      <div>
        <div className="bg-custom-widget-color mx-2 mb-2 px-4 py-2 h-32 rounded-xl cursor-pointer">
          <div className="flex items-center h-28 justify-between">
            <div className="flex items-center">
              <div className={`w-1 h-20 rounded-full ${c}`}></div>
              <div className="flex-col space-y-2 mx-3 w-64">
                <p className="text-xl font-semibold text-stone-900">
                  {schedule.Subject}
                </p>
                <div className="flex justify-start items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-stone-700"
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

                  <p className="pl-2 text-lg font-bold text-stone-700">
                    {schedule.Location}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-col">
              <p className="text-xl font-bold">{removeAmPm(schedule.from)}</p>
              <p className="text-lg font-bold text-custom-color text-center">
                {removeAmPm(schedule.to)}
              </p>
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
