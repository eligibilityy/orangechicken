"use client";

import React, { useEffect, useState, useRef } from "react"
import {
  Droplet,
  Droplets,
  MapPin,
  Calendar,
  Clock4,
  CloudRain,
  Sun,
  Moon,
  Wind,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "../ui/separator";
import gsap from "gsap";
import { Card, CardContent } from "@/components/ui/card";
import { SmallSkeleton } from "./Skeleton";

interface WeatherData {
  apparentTemperature: number;
  temperature: number;
  isDay: boolean;
  relativeHumidity2m: number;
  rain: number;
  windSpeed: number;
  weatherCode: number;
}

const Weather = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const weatherRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch("/api/weather");
        const data = await response.json();
        setWeatherData(data);
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation
      gsap.from(weatherRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });

      // Add hover effect
      const card = cardRef.current;
      const handleMouseMove = (e: MouseEvent) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;

        gsap.to(card, {
          rotateX,
          rotateY,
          duration: 0.5,
          ease: "power2.out",
          transformPerspective: 1000
        });

        // Animate weather icon
        gsap.to(".weather-icon", {
          x: (x - centerX) / 15,
          y: (y - centerY) / 15,
          duration: 0.5,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        if (!card) return;
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: "power2.out"
        });
        gsap.to(".weather-icon", {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        });
      };

      if (card) {
        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);
      }

      return () => {
        if (card) {
          card.removeEventListener("mousemove", handleMouseMove);
          card.removeEventListener("mouseleave", handleMouseLeave);
        }
      };
    });

    return () => ctx.revert();
  }, []);

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });

  if (!weatherData) return <SmallSkeleton />;

  // Dynamically set background gradient based on temperature and theme
  const getTemperatureGradient = (day: boolean) => {
    if (day) return "bg-gradient-to-tl from-orange-600 to-yellow-500"; // Cold (Blue - Darker for dark mode)
    return "bg-gradient-to-tl from-sky-500 to-indigo-800"; // Mild (Blue to Orange)
  };

  const getWeatherIcon = () => {
    if (weatherData.rain > 0) return <CloudRain className="weather-icon w-10 h-10 text-blue-400" />;
    if (weatherData.isDay) return <Sun className="weather-icon w-10 h-10 text-yellow-400" />;
    return <Moon className="weather-icon w-10 h-10 text-blue-200" />;
  };

  const getBackgroundClass = () => {
    const hour = currentTime.getHours();
    if (hour >= 5 && hour < 12) return "bg-gradient-to-br from-orange-400/10 to-yellow-300/10"; // Morning
    if (hour >= 12 && hour < 17) return "bg-gradient-to-br from-blue-400/10 to-cyan-300/10"; // Afternoon
    if (hour >= 17 && hour < 20) return "bg-gradient-to-br from-orange-500/10 to-pink-400/10"; // Evening
    return "bg-gradient-to-br from-blue-900/10 to-purple-800/10"; // Night
  };

  return (
    <div ref={weatherRef}>
      <Card
        ref={cardRef}
        className={`overflow-hidden backdrop-blur-sm border-muted/20 ${getBackgroundClass()}`}
      >
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Header Section */}
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {currentTime.toLocaleDateString("en-US", {
                      weekday: 'short',
                      month: "short",
                      day: "2-digit",
                    })}
                  </span>
                  <Clock4 className="w-4 h-4 ml-2" />
                  <span>
                    {currentTime.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>
                </div>
                <div className="space-y-1 py-3">
                  <h3 className="text-5xl font-bold">
                    {Math.round(weatherData.temperature)}°<span className="text-2xl text-muted-foreground">C</span>
                  </h3>
                  <span className="text-sm text-muted-foreground block">
                    Feels Like {Math.round(weatherData.apparentTemperature)}°
                  </span>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Lipa City
                </p>
              </div>
              <div className="weather-icon p-2">
                {getWeatherIcon()}
              </div>
            </div>

            <Separator className="bg-muted/20" />
            
            {/* Weather Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-muted/10 transition-colors">
                    <Droplet className="w-5 h-5 text-blue-400" />
                    <span className="font-medium">{weatherData.relativeHumidity2m}%</span>
                    <span className="text-xs text-muted-foreground">Humidity</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Current humidity level</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-muted/10 transition-colors">
                    <Wind className="w-5 h-5 text-cyan-400" />
                    <span className="font-medium">{Math.round(weatherData.windSpeed)} km/h</span>
                    <span className="text-xs text-muted-foreground">Wind</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Wind speed</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {weatherData.rain > 0 && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-muted/10 transition-colors">
                      <Droplets className="w-5 h-5 text-blue-400" />
                      <span className="font-medium">{weatherData.rain}mm</span>
                      <span className="text-xs text-muted-foreground">Rain</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Precipitation amount</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Weather;
