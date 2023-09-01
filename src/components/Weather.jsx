import { useState, useEffect, useCallback } from "react";

function Weather() {
    const [currentWeather, setCurrentWeather] = useState({
        city: "",
        description: "",
        icon: "",
        current_time: 0,
        celsius: 0,
        feels_like: 0,
        windspeed: 0,
        humidity: 0,
        pressure: 0,
    });

    const [hourlyWeather, setHourlyWeather] = useState({
        lists: [],
    });

    // For refresh button rotation
    const [rotationDegree, setRotationDegree] = useState(0);

    const rotateRefreshBtn = () => {
        const degree = rotationDegree === 360 ? 0 : 360;
        setRotationDegree(degree);
    };

    const fetchWeather = useCallback(async () => {
        try {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    const currentWeatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=594356e3da022f96b9f518b50120bd4e&units=metric`;

                    const hourlyWeatherApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=594356e3da022f96b9f518b50120bd4e&units=metric&cnt=6`;

                    const [response1, response2] = await Promise.all([
                        fetch(currentWeatherApi),
                        fetch(hourlyWeatherApi),
                    ]);

                    const currentWeatherData = await response1.json();
                    const hourlyWeatherData = await response2.json();

                    console.log(currentWeatherData);
                    console.log(hourlyWeatherData);

                    setCurrentWeather({
                        city: currentWeatherData.name,
                        description: currentWeatherData.weather[0].description,
                        icon: currentWeatherData.weather[0].icon,
                        current_time: currentWeatherData.dt,
                        celsius: currentWeatherData.main.temp,
                        feels_like: currentWeatherData.main.feels_like,
                        windspeed: currentWeatherData.wind.speed,
                        humidity: currentWeatherData.main.humidity,
                        pressure: currentWeatherData.main.pressure,
                    });

                    setHourlyWeather({
                        lists: hourlyWeatherData.list.slice(2),
                    });
                },
                (error) => {
                    console.log("Error getting location:", error);
                }
            );
        } catch (error) {
            console.log("Error:", error);
        }
    }, []);

    useEffect(() => {
        // Initial fetch
        fetchWeather();

        const intervalId = setInterval(fetchWeather, 300000); // Fetch every 5 minute

        return () => {
            clearInterval(intervalId);
        };
    }, [fetchWeather]);

    return (
        <div>
            <div className="max-w-md mx-auto p-4 text-lg">
                {/* Current Weather */}
                <div className="p-5 mb-5 flex justify-between items-center bg-[#003B6D] text-white rounded-3xl">
                    <div>
                        <h2 className="text-3xl mb-1">{currentWeather.city}</h2>
                        <h2 className="mb-4 text-xl capitalize">
                            {currentWeather.description}
                        </h2>

                        <div className="flex items-baseline gap-2 font-bold mb-4">
                            {/* Celsius Temperature */}
                            <h1 className="text-4xl">
                                {Math.round(currentWeather.celsius)} &deg;C |
                            </h1>

                            {/* Fahrenheit Temperature */}
                            <h1 className="text-2xl">
                                {Math.round(currentWeather.celsius * 1.8 + 32)}{" "}
                                &deg;F
                            </h1>
                        </div>

                        <div className="flex items-center gap-3">
                            <h2>
                                {new Date(
                                    currentWeather.current_time * 1000
                                ).toLocaleTimeString("en-us", {
                                    timeStyle: "short",
                                })}
                            </h2>

                            <h2>
                                {new Date(
                                    currentWeather.current_time * 1000
                                ).toLocaleDateString("en-us", {
                                    weekday: "short",
                                    day: "2-digit",
                                    month: "short",
                                })}
                            </h2>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        {/* Refresh Button */}
                        <button
                            className="self-end me-1 transition-transform duration-700 ease-in-out"
                            style={{
                                transform: `rotate(${rotationDegree}deg)`,
                            }}
                            onClick={() => {
                                rotateRefreshBtn();
                                fetchWeather();
                            }}
                        >
                            {/* Refresh Icon SVG */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="1.5em"
                                viewBox="0 0 512 512"
                            >
                                <path
                                    fill="#FFFFFF"
                                    d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H176c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"
                                />
                            </svg>
                        </button>

                        {/* Current Weather Image */}
                        <img
                            src={
                                currentWeather.icon
                                    ? `http://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`
                                    : ""
                            }
                            className="w-36 h-auto"
                            alt=""
                        />
                    </div>
                </div>

                {/* Hourly Weather */}
                <div className="p-5 mb-5 flex justify-between items-center bg-[#003B6D] text-white rounded-3xl">
                    {hourlyWeather.lists.map((list, index) => (
                        <div
                            key={index}
                            className="flex flex-col justify-center items-center"
                        >
                            <p>
                                {new Date(list.dt_txt).toLocaleTimeString(
                                    "en-us",
                                    { hour: "numeric" }
                                )}
                            </p>

                            {/* Hourly Weather Image */}
                            <img
                                src={
                                    list.weather[0].icon
                                        ? `http://openweathermap.org/img/wn/${list.weather[0].icon}@2x.png`
                                        : ""
                                }
                                className="max-w-[80px] h-auto -my-1"
                                alt=""
                            />

                            <p>{Math.round(list.main.temp)} &deg;C</p>
                        </div>
                    ))}
                </div>

                {/* Other Weather Status */}
                <div className="p-5 flex items-center gap-28 bg-[#003B6D] text-white rounded-3xl">
                    <div className="flex flex-col gap-4">
                        <div>
                            <h2 className="font-bold">Feels Like</h2>
                            <p className="text-2xl">
                                {Math.round(currentWeather.feels_like)} &deg;C
                            </p>
                        </div>

                        <div>
                            <h2 className="font-bold">Wind</h2>
                            <p className="text-2xl">
                                {currentWeather.windspeed} m/s
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div>
                            <h2 className="font-bold">Humidity</h2>
                            <p className="text-2xl">
                                {currentWeather.humidity} %
                            </p>
                        </div>

                        <div>
                            <h2 className="font-bold">Pressure</h2>
                            <p className="text-2xl">
                                {currentWeather.pressure} hPa
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;
