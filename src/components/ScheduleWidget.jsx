const ScheduleWidget = (props) => {
  const schedule = props.schedule;

  return (
    <>
      <div>
        <div className="bg-custom-widget-color mx-2 mb-2 px-4 py-2 h-32 rounded-xl cursor-pointer">
          <div className="flex items-center h-28 justify-between">
            <div className="flex items-center">
              <div className="w-1 h-24 bg-yellow-600"></div>
              <div className="flex-col space-y-2 mx-3 w-64">
                <p className="text-xl font-semibold">{schedule.Subject}</p>
                <p className="text-lg font-bold">{schedule.Location}</p>
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
