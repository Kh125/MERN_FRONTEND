import React from 'react'
import ScheduleWidget from '../components/ScheduleWidget'

const Schedule = ()=>{
    const scheduleList = [
        {
            "Period": 2,
            "SubjectID":"HPC-42117",
            "Subject":"Mobile and Ubiquitous Computing",
            "Lecture":false,
            "TeacherPhNo":"09977996352",
            "Location":"Room 322",
            "Teacher":"Dr. Myat Pwint Phyu",
            "from":"09:40 AM",
            "to":"10:40"
        },
        {
            "Period": 3,
            "SubjectID":"CST-42506",
            "Subject":"English Language Proficiency VI",
            "Lecture":false,
            "TeacherPhNo":"09977996352",
            "Location":"Room 214",
            "Teacher":"Daw May Phyu Thwin",
            "from":"10:50 AM",
            "to":"11:50 AM"
        },
        {   
            "Period": 4,
            "SubjectID":"CST-42206",
            "Subject":"Performance and Reliability Analysis",
            "Lecture":true,
            "TeacherPhNo":"09977996352",
            "Location":"Room 321",
            "Teacher":"Daw Sandar Win",
            "from":"12:40 PM",
            "to":"01:40 PM"
        },
        {   
            "Period": 5,
            "SubjectID":"CST-42315",
            "Subject":"Data Analysis and Management",
            "Lecture":true,
            "TeacherPhNo":"09977996352",
            "Location":"Room 324",
            "Teacher":"Dr. Kyawt Kyawt San",
            "from":"01:50 PM",
            "to":"02:50 PM"
        }
    ]

    const [hourMin, amPm] = getCurrentTime12HourFormat()

    return <>
    <div className="bg-custom-light-blue h-screen overflow-hidden">
        <div className="bg-custom-light-blue py-4">
            {/* Title Section */}
            <div className="px-4 my-5">
                <h1 className="text-custom-size-30 font-bold">Uni-Notify</h1>
            </div>
            <div className="px-4 my-6">
                <h1 className="text-custom-time text-custom-size-60 font-semibold text-right">
                    {hourMin} <span className="uppercase text-custom-color text-custom-size-30">{amPm}</span>
                </h1>
            </div>
            <div className="px-4 my-4">
                <h1 className="text-2xl font-semibold text-custom-class-title">Upcoming Classes</h1>
            </div>
            {/* Title Section */}

            {/* Upcoming Class section */}
            <div className="bg-custom-blue pt-4 rounded-t-custom-t h-screen">
                <div class="flex space-x-6 justify-center mb-4">
                    <button class="bg-custom-dark text-white py-2 px-4 rounded-full w-28 h-12 font-semibold">
                        All
                    </button>
                    <button class="bg-white text-black py-2 px-4 rounded-full w-28 h-12 font-semibold">
                        New
                    </button>
                </div>
                <div className="overflow-y-scroll max-h-[500px] pt-2 pb-5">
                    {
                        scheduleList.map((schedule) => (
                            <ScheduleWidget 
                                key={schedule.SubjectID}
                                schedule={schedule}
                            />
                        ))
                    }
                </div>
            </div>
            {/* Upcoming Class section */}
        </div>
    </div>
    </>
}

const getCurrentTime12HourFormat = () => {
    const currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    const amPm = hours >= 12 ? 'PM' : 'AM';
  
    // Convert to 12-hour format
    if (hours > 12) {
      hours -= 12;
    } else if (hours === 0) {
      hours = 12;
    }
  
    // Add leading zeros to minutes if needed
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    return [`${hours}:${minutes}`, amPm];
}
export default Schedule