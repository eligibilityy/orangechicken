// api/weather.ts
import { fetchWeatherApi } from 'openmeteo';

export const fetchWeatherData = async () => {
  const params = {
    latitude: 13.941659152557246,
    longitude: 121.14774890730392,
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "is_day",
      "rain",
      "wind_speed_10m",
      "weather_code"
    ],
    timezone: "Asia/Singapore",
  };
  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

  // Process the response
  const response = responses[0];
  const utcOffsetSeconds = response.utcOffsetSeconds();
  const current = response.current()!;

  return {
    time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
    temperature: current.variables(0)!.value(),
    relativeHumidity2m: current.variables(1)!.value(),
    apparentTemperature: current.variables(2)!.value(),
    isDay: current.variables(3)!.value(),
    rain: current.variables(4)!.value(),
    windSpeed: current.variables(5)!.value(),
    weatherCode: current.variables(6)!.value(),
  };
};
