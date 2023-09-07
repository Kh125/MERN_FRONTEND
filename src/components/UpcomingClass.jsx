import { useSchedule } from "../hooks/schedule";
import { calculateRemainingTimeInMinute, findNearestOrEqualTime, formatTimeWithLeadingZero, transformToHMSFromMinute } from "../utils/time";
import Relax from "./Relax";

const UpcomingClass = (props) => {
    const schedules = useSchedule();
    const currentDateTime = new Date();
    const currentDay = currentDateTime.toLocaleDateString('en-US', { weekday: 'long' });
    let remainingTime = 0
    let nearestClass = null
  
    // Find the nearest or equal "from" time
    if (schedules && schedules[0] && schedules[0].Schedule && schedules[0].Schedule[currentDay]) {
        // Find the nearest or equal "from" time
        nearestClass = findNearestOrEqualTime(schedules[0].Schedule[currentDay], currentDateTime);
    }
  
    // Display the result
    if (nearestClass && nearestClass[0]) {
        console.log(`Total ${nearestClass[1]} classes remaining.`)
      
        remainingTime = calculateRemainingTimeInMinute(nearestClass[0].from, currentDateTime)

        setInterval(() => {
            remainingTime = calculateRemainingTimeInMinute(nearestClass[0].from, currentDateTime)
        }, 1000)

        console.log(`Nearest or equal class: ${nearestClass[0].Subject} at ${nearestClass[0].from}`);
    } else {
      console.log('No classes found for today.');
    }


    return(
        <>
        {nearestClass ? (
            <div className={nearestClass[0] ? "bg-custom-blue text-custom-time py-4 rounded-t-custom-t mb-16" : "bg-transparent"}>
                <div className="bg-custom-purple-color text-custom-size-18 flex items-center justify-between mx-3 px-4 py-5 rounded-2xl">
                    <p className="font-bold">Remaining Classes</p>
                    <p className="font-bold">{nearestClass[1]} classes</p>
                </div>
                {nearestClass[0] && (
                    <div className="bg-custom-light-blue text-custom-upcoming-text mx-3 mt-3 rounded-2xl">
                        {/* Time Display */}
                        <div className="flex items-center justify-between px-4 py-2 mb-1">
                            <p className="text-custom-size-36 font-bold">
                                {remainingTime[0] ? `${formatTimeWithLeadingZero(remainingTime[0])}:` : ''}
                                {remainingTime[1] ? `${formatTimeWithLeadingZero(remainingTime[1])}` : ''}
                                <span className="text-custom-upcoming-sub-text text-custom-size-18"> mins until Period {nearestClass[0].Period}</span>
                            </p>
                            <svg height="40px" width="40px" viewBox="0 0 512 512" fill="#2F69FC">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                                <g id="SVGRepo_iconCarrier"><g> <path className="st0" d="M81.44,116.972c23.206,0,42.007-18.817,42.007-42.008c0-23.215-18.801-42.016-42.007-42.016 c-23.216,0-42.016,18.801-42.016,42.016C39.424,98.155,58.224,116.972,81.44,116.972z"/> <path className="st0" d="M224.166,245.037c0-0.856-0.142-1.673-0.251-2.498l62.748-45.541c3.942-2.867,4.83-8.411,1.963-12.362 c-1.664-2.285-4.342-3.652-7.17-3.652c-1.877,0-3.667,0.589-5.191,1.689l-62.874,45.636c-2.341-1.068-4.909-1.704-7.65-1.704 h-34.178l-8.294-47.222c-4.555-23.811-14.112-42.51-34.468-42.51h-86.3C22.146,136.873,0,159.019,0,179.383v141.203 c0,10.178,8.246,18.432,18.424,18.432c5.011,0,0,0,12.864,0l7.005,120.424c0,10.83,8.788,19.61,19.618,19.61 c8.12,0,28.398,0,39.228,0c10.83,0,19.61-8.78,19.61-19.61l9.204-238.53h0.463l5.27,23.269c1.744,11.097,11.293,19.28,22.524,19.28 h51.534C215.92,263.461,224.166,255.215,224.166,245.037z M68.026,218.861v-67.123h24.126v67.123l-12.817,15.118L68.026,218.861z"/> <polygon className="st0" points="190.326,47.47 190.326,200.869 214.452,200.869 214.452,71.595 487.874,71.595 487.874,302.131 214.452,302.131 214.452,273.113 190.326,273.113 190.326,326.256 512,326.256 512,47.47 "/> <path className="st0" d="M311.81,388.597c0-18.801-15.235-34.029-34.028-34.029c-18.801,0-34.036,15.228-34.036,34.029 c0,18.785,15.235,34.028,34.036,34.028C296.574,422.625,311.81,407.381,311.81,388.597z"/> <path className="st0" d="M277.781,440.853c-24.259,0-44.866,15.919-52.782,38.199h105.565 C322.648,456.771,302.04,440.853,277.781,440.853z"/> <path className="st0" d="M458.573,388.597c0-18.801-15.235-34.029-34.028-34.029c-18.801,0-34.036,15.228-34.036,34.029 c0,18.785,15.235,34.028,34.036,34.028C443.338,422.625,458.573,407.381,458.573,388.597z"/> <path className="st0" d="M424.545,440.853c-24.259,0-44.866,15.919-52.783,38.199h105.565 C469.411,456.771,448.804,440.853,424.545,440.853z"/> </g> </g>
                            </svg>
                        </div>
                        {/* Time Display */}
                        {/* Lecture Title */}
                        <div className="px-4 mb-1">
                            <p className="text-custom-size-26 text-custom-upcoming-text font-semibold">{nearestClass[0].Subject}</p>
                        </div>
                        {/* Lecture Title */}
                        {/* {Lecture Info} */}
                        <div className="lecture-info py-2">
                            <div className="flex items-start justify-start px-4 text-custom-size-18 font-semibold">
                                <p className="text-custom-upcoming-sub-text w-36">
                                    Lecturer Name
                                </p>
                                <p className="text-custom-upcoming-text flex-1">{nearestClass[0].Teacher}</p>
                                {/* Use flex-1 to make this flex item take up the remaining space */}
                            </div>
                            <div className="flex items-start justify-start px-4 text-custom-size-18 font-semibold mt-2">
                                <p className="text-custom-upcoming-sub-text w-36">
                                    Room No
                                </p>
                                <p className="text-custom-upcoming-text flex-1">{nearestClass[0].Location}</p>
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
    )
}

export default UpcomingClass