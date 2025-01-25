// api/weather.ts
import { fetchWeatherApi } from 'openmeteo';

export const fetchWeatherData = async () => {
  const params = {
    latitude: 13.941659152557246,
    longitude: 121.14774890730392,
    current: [
      "relative_humidity_2m",
      "apparent_temperature",
      "is_day",
      "rain",
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
    apparentTemperature: current.variables(1)!.value(),
    isDay: current.variables(2)!.value(),
    relativeHumidity2m: current.variables(0)!.value(),
    rain: current.variables(3)!.value(),
  };
};
