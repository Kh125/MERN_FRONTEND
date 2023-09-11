import React, { useEffect, useState } from "react";

const CurrentLocation = ({ location }) => {
  const [geocodeResponse, setGeocodeResponse] = useState(null);
  const getLocationName = async () => {
    const geocoder = new google.maps.Geocoder();
    try {
      const result = await geocoder.geocode({ location });
      setGeocodeResponse(result);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getLocationName();
  }, []);

  return (
    <div className="w-full bg-blue-300 p-2 my-2 justify-start ">
      {geocodeResponse ? (
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-blue-800"
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
          <p className="pl-4 text font-semibold text-blue-800">
            {geocodeResponse?.results[3]?.formatted_address}
          </p>
        </div>
      ) : (
        <p>Loading....</p>
      )}
    </div>
  );
};
export default CurrentLocation;
