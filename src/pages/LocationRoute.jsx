import React, { useEffect, useState } from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import CurrentLocation from "../components/CurrentLocation";
import { style } from "../utils/mapStyle";
import { useParams } from "react-router-dom";
import { getPeriodData } from "../utils/indexDB";
import PeriodInfo from "../components/PeriodInfo";

const LocationRoute = () => {
  const { id } = useParams();
  const [location, setLocation] = useState({});
  const [directionResponse, setDirectionRespone] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [notifiedPeriod, setNotifiedPeriods] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  });

  const university = {
    lat: 16.8559,
    lng: 96.1353,
  };
  const getNotifiedPeriods = async () => {
    const periods = await getPeriodData();
    setNotifiedPeriods(periods.filter((p) => p.id == id));
  };
  useEffect(() => {
    getNotifiedPeriods();
  }, []);
  console.log({ notifiedPeriod });
  const calculateRoute = async () => {
    const directionService = new google.maps.DirectionsService();
    const result = await directionService.route({
      origin: location,
      destination: university,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionRespone(result);
    setDistance(result.routes[0].legs[0].distance.text);
    setDuration(result.routes[0].legs[0].duration.text);
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);
  useEffect(() => {
    if (isLoaded) calculateRoute();
  }, [isLoaded]);
  console.log({ location });
  return (
    <>
      <div className="max-w-md mx-auto font-mono bg-blue-100 h-screen overflow-hidden">
        {isLoaded && (
          <div className="w-full h-full p-1 border rounded shadow-md">
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "40%" }}
              center={location}
              zoom={20}
              options={{
                disableDefaultUI: true, // disable default map UI
                draggable: true, // make map draggable
                keyboardShortcuts: false, // disable keyboard shortcuts
                scaleControl: true, // allow scale controle
                scrollwheel: true, // allow scroll wheel
                styles: style,
              }}
            >
              {directionResponse && (
                <DirectionsRenderer directions={directionResponse} />
              )}
            </GoogleMap>
            <CurrentLocation location={location} />
            <div className="flex w-full  items-center justify-around  rounded-lg">
              <div className=" w-1/2 m-2 flex flex-col justify-between items-center bg-white py-2 rounded-md">
                <p className="text font-semibold text-blue-600">Distance </p>
                <p className="text-lg font-semibold text-blue-700 pt-2">
                  {distance}
                </p>
              </div>
              <div className="w-1/2 m-2 flex flex-col justify-between items-center bg-white py-2 rounded-md">
                <p className="text font-semibold text-blue-600 inline-flex">
                  ETA
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 ml-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                    />
                  </svg>
                </p>
                <p className="text-lg font-semibold text-blue-700 pt-2">
                  {duration}
                </p>
              </div>
            </div>
            {notifiedPeriod && <PeriodInfo period={notifiedPeriod[0]} />}
          </div>
        )}
      </div>
    </>
  );
};

export default LocationRoute;
