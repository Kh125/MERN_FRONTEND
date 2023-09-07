export const timeStringToDate = (timeString) => {
    const [time, amPm] = timeString.split(' ');
    const [hour, minute] = time.split(':').map(Number);
    const currentTime = new Date();
    currentTime.setHours(hour, minute, 0, 0);
    return currentTime;
}

// Function to find the nearest or equal "from" time in the schedule
export const findNearestOrEqualTime = (scheduleData, currentDateTime) => {
    let nearestClass = null
    let nearestClassExists = false;
    let remainingClasses = 0;

    for (const period in scheduleData) {
      if (scheduleData.hasOwnProperty(period)) {
        const classItem = scheduleData[period];
        const fromTime = classItem.from;
        let classTime = timeStringToDate(fromTime);
        const timeDiff = classTime - currentDateTime;

        if (timeDiff > 0 && !nearestClassExists) {
          nearestClassExists = true
          nearestClass = classItem;
        }

        const [hours, minutes] = fromTime.split(':');
        let classTime24Hours = parseInt(hours, 10);

        // Adjust hours for PM
        if (fromTime.includes('PM') && classTime24Hours !== 12) {
          classTime24Hours += 12;
        }

        const classTime24Minutes = parseInt(minutes, 10);

        // Get current time in 24-hour format
        const currentHours = currentDateTime.getHours();
        const currentMinutes = currentDateTime.getMinutes();

        // Compare the hours and minutes
        if (classTime24Hours > currentHours || (classTime24Hours === currentHours && classTime24Minutes > currentMinutes)) {
          remainingClasses++;
        }
      }
    }
  
    return [nearestClass, remainingClasses];
  }

  export const calculateRemainingTimeInMinute = (givenTime) => {
    let givenTimeParts = givenTime.split(':');
    let hours = parseInt(givenTimeParts[0], 10);
    let minutes = parseInt(givenTimeParts[1].split(' ')[0], 10);

    // Adjust for AM/PM
    if (givenTimeParts[1].includes('PM') && hours !== 12) {
        hours += 12;
    } else if (givenTimeParts[1].includes('AM') && hours === 12) {
        hours = 0;
    }

    // Get current time
    let now = new Date();
    let currentHours = now.getHours();
    let currentMinutes = now.getMinutes();

    let differenceInHours = hours - currentHours;
    let differenceInMinutes = minutes - currentMinutes;

    // Handle cases where the time difference may cross midnight
    if (differenceInHours < 0) {
        differenceInHours += 24;
    }

    if (differenceInMinutes < 0) {
        differenceInMinutes += 60;
        differenceInHours--;
    }
    
    return [differenceInHours, differenceInMinutes];
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