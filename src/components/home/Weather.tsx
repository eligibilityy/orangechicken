"use client";

import { useEffect, useState } from "react";
import {
  MapPin,
  Calendar,
  Clock4,
  CloudRain,
  Sun,
  Moon,
  Wind,
  Droplet,
} from "lucide-react";

const Weather = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState({
    temperature: 0,
    apparentTemperature: 0,
    isDay: true,
    humidity: 0,
    rain: 0,
    windSpeed: 0,
  });

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=13.9411&longitude=121.1625&current=temperature_2m,apparent_temperature,is_day,rain,wind_speed_10m,relative_humidity_2m"
        );
        const data = await response.json();

        setWeather({
          temperature: data.current.temperature_2m,
          apparentTemperature: data.current.apparent_temperature,
          isDay: data.current.is_day,
          humidity: data.current.relative_humidity_2m,
          rain: data.current.rain,
          windSpeed: data.current.wind_speed_10m,
        });
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchWeather();
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      fetchWeather();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-0">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-neutral-500">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>
              {currentTime.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "2-digit",
              })}
            </span>
            <Clock4 className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
            <span>
              {currentTime.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
          </div>
          <div className="py-1 sm:py-2">
            <div className="text-4xl sm:text-5xl font-semibold text-neutral-50">
              {Math.round(weather.temperature)}°
              <span className="text-xl sm:text-2xl text-neutral-500">C</span>
            </div>
            <span className="text-xs sm:text-sm text-neutral-500">
              Feels like {Math.round(weather.apparentTemperature)}°
            </span>
          </div>
          <div className="flex items-center gap-1 text-sm sm:text-base text-neutral-500">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
            Lipa City
          </div>
        </div>
        <div className="pt-1 sm:pt-2">
          {weather.rain > 0 ? (
            <CloudRain className="w-10 h-10 sm:w-12 sm:h-12 text-neutral-50" />
          ) : weather.isDay ? (
            <Sun className="w-10 h-10 sm:w-12 sm:h-12 text-neutral-50" />
          ) : (
            <Moon className="w-10 h-10 sm:w-12 sm:h-12 text-neutral-50" />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
        <div className="bg-neutral-800 p-4 sm:p-5 flex items-center gap-3">
          <Wind className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-500" />
          <span className="text-xs sm:text-sm text-neutral-100/70">
            {weather.windSpeed} km/h
          </span>
        </div>
        <div className="bg-neutral-800 p-4 sm:p-5 flex items-center gap-3">
          <Droplet className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-500" />
          <span className="text-xs sm:text-sm text-neutral-100/70">
            {weather.humidity}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default Weather;
