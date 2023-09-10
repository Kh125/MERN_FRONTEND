import React, { useEffect, useState } from "react";
import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import CurrentLocation from "../components/CurrentLocation";
import { style } from "../utils/mapStyle";

const LocationRoute = () => {
  const [location, setLocation] = useState({});
  const [directionResponse, setDirectionRespone] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  });
  const university = {
    lat: 16.8559,
    lng: 96.1353,
  };

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
  return (
    <>
      <div className="max-w-md mx-auto font-mono bg-custom-light-blue h-screen overflow-hidden">
        <div className="w-full pt-10 px-4 my-2 font-mono">
          <p className="text-3xl font-semibold space-x-5"> Geolocation</p>
        </div>

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
              <div className=" w-1/2 m-2 flex flex-col justify-between items-center bg-cyan-200 py-2 rounded-xl">
                <p className="text font-semibold text-cyan-600">Distance </p>
                <p className="text-lg font-semibold text-cyan-700 pt-2">
                  {distance}
                </p>
              </div>
              <div className="w-1/2 m-2 flex flex-col justify-between items-center bg-stone-200 py-2 rounded-xl">
                <p className="text font-semibold text-stone-600 inline-flex">
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
                <p className="text-lg font-semibold text-stone-700 pt-2">
                  {duration}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LocationRoute;
