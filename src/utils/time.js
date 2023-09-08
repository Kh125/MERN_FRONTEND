export const timeStringToDate = (timeString) => {
    const [time, amPm] = timeString.split(' ');
    const [hour, minute] = time.split(':').map(Number);
    const currentTime = new Date();
    currentTime.setHours(hour, minute, 0, 0);
    return currentTime;
}

// Function to find the nearest or equal "from" time in the schedule
export const findNearestOrEqualTime = (scheduleData, currentDateTime) => {
    let nearestTimeDiff = Infinity;
    let nearestClass = null
    let nearestClassExists = false;
    let remainingClasses = 0;

    for (const period in scheduleData) {
      if (scheduleData.hasOwnProperty(period)) {
        const classItem = scheduleData[period];
        const classTime = timeStringToDate(classItem.from);
        const timeDiff = Math.abs(classTime - currentDateTime);
        if (timeDiff < nearestTimeDiff && !nearestClassExists) {
          nearestClassExists = true
          nearestTimeDiff = timeDiff;
          nearestClass = classItem;
        }

        if (classTime >= currentDateTime) {
          remainingClasses++;
        }
      }
    }
  
    return [nearestClass, remainingClasses];
  }

  export const calculateRemainingTimeInMinute = (from, currentDateTime) => {
    const fromTimeStamp = timeStringToDate(from)
    return Math.floor((fromTimeStamp - currentDateTime)/(1000*60))
  }

  export const transformToHMSFromMinute = (minute) => {
    const hours = Math.floor(minute / 60);
    const remainingMinutes = minute % 60;
    const seconds = remainingMinutes * 60;

    return [hours, remainingMinutes, seconds]
  }

  export const formatTimeWithLeadingZero = (time) => {
    // Convert the time to a string and pad with a leading zero if it's a single digit
    return String(time).padStart(2, '0');
  }