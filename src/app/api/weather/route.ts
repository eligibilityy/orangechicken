import { NextResponse } from "next/server";
import { fetchWeatherData } from "../weather";

export async function GET() {
  try {
    const data = await fetchWeatherData();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
} 