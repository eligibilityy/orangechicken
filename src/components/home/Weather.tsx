// components/Weather.tsx
import React, { useEffect, useState } from "react";
import { fetchWeatherData } from "@/app/api/weather";
import {
  SunIcon,
  CloudSunIcon,
  CloudRainIcon,
  Droplet,
  Droplets,
  MapPin,
  MoonStarIcon,
  Calendar,
  Clock4,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BigSkeleton } from "./Skeleton";

const Weather = () => {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}-${
    currentDate.getMonth() + 1 < 10
      ? `0${currentDate.getMonth() + 1}`
      : currentDate.getMonth() + 1
  }-${currentDate.getFullYear()}`;

  const [weatherData, setWeatherData] = useState<{
    apparentTemperature: number;
    isDay: boolean;
    relativeHumidity2m: number;
    rain: number;
  } | null>(null);

  useEffect(() => {
    const getWeather = async () => {
      const data = await fetchWeatherData();
      setWeatherData({
        ...data,
        isDay: Boolean(data.isDay),
      });
    };
    getWeather();
  }, []);

  if (!weatherData)
    return <BigSkeleton />;

  // Dynamically set background gradient based on temperature and theme
  const getTemperatureGradient = (day: boolean) => {
    if (day) return "bg-gradient-to-tl from-orange-600 to-yellow-500"; // Cold (Blue - Darker for dark mode)
    return "bg-gradient-to-tl from-sky-500 to-indigo-800"; // Mild (Blue to Orange)
  };

  return (
    <div
      className={`${getTemperatureGradient(
        weatherData.isDay
      )} rounded-lg p-4 space-y-4`}
    >
      <div className="flex flex-col">
        <div className="mb-5 flex justify-between px-4 items-center gap-2">
          <div className="flex items-center gap-2 text-white">
            <Clock4 />
            <div>
              <h4 className="text-xs text-white/80">Time</h4>
              <p className="font-medium">
                {currentTime.split(" ")[0]}{" "}
                <span className="text-xs text-white/80 font-thin">
                  {currentTime.split(" ")[1]}
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-white">
            <Calendar />
            <div>
              <h4 className="text-xs text-white/80">Date</h4>
              <p className="font-medium">{formattedDate}</p>
            </div>
          </div>
        </div>
        <div className="mb-5 text-center">
          <h3 className="text-white/80 flex items-center justify-center gap-1 py-2">
            Lipa City
            <MapPin className="h-5 w-5" strokeWidth="2px" />
          </h3>
          <div className="text-7xl font-thin text-white flex items-center justify-center gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <h1 className="flex items-baseline justify-center">
                    {Math.round(weatherData.apparentTemperature)}&deg;
                    {/* <p className="text-4xl text-white/80">C</p> */}
                  </h1>
                </TooltipTrigger>
                <TooltipContent className="bg-muted text-lg">
                  <p className="text-secondary-foreground opacity-80">Celsius</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {weatherData.isDay ? (
              <SunIcon fill="#fff" className="h-12 w-12 opacity-80" />
            ) : (
              <MoonStarIcon fill="#fff" className="h-12 w-12 opacity-80" />
            )}
          </div>

          <p className="text-white/80">
            {Math.round(weatherData.apparentTemperature) < -10
              ? "Very Cold"
              : Math.round(weatherData.apparentTemperature) < 0
              ? "Cold"
              : Math.round(weatherData.apparentTemperature) > 35
              ? "Extremely Hot"
              : Math.round(weatherData.apparentTemperature) > 30
              ? "Very Hot"
              : "Moderate"}
          </p>
        </div>
        <div className="flex justify-between px-4 items-center gap-2">
          <div className="flex items-center gap-2 text-white">
            {weatherData.rain > 0 ? (
              <>
                <CloudRainIcon />
                <div>
                  <h4 className="text-xs">Rain</h4>
                  <p>{weatherData.rain}mm</p>
                </div>
              </>
            ) : (
              <>
                <CloudSunIcon />
                <div>
                  <h4 className="text-xs text-white/80">Rain</h4>
                  <p className="font-medium">Clear</p>
                </div>
              </>
            )}
          </div>
          <div className="flex items-center gap-2 text-white">
            {weatherData.relativeHumidity2m > 80 ? (
              <>
                <Droplets />
                <div>
                  <h4 className="text-xs text-white/80">High Humidity</h4>
                  <p className="font-medium">
                    {weatherData.relativeHumidity2m}
                    <span className="text-xs font-thin">%</span>
                  </p>
                </div>
              </>
            ) : (
              <>
                <Droplet />
                <div>
                  <h4 className="text-xs text-white/80">Humidity</h4>
                  <p className="font-medium">
                    {weatherData.relativeHumidity2m}
                    <span className="text-xs font-thin">%</span>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
