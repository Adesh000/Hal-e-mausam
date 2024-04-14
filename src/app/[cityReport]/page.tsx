"use client";
import DataTable from "@/components/DataTable";
import { fetchWeatherData } from "@/services/wetherServices";
import { useQuery } from "@tanstack/react-query";
import { Inter } from "next/font/google";
import Image from "next/image";
import React, { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const CityWetherReport = ({ params }: any) => {
  const cityName = params.cityReport;
  const [hourlyData, setHourlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);

  const { isError, data, error, isPending, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["weatherData"],
      queryFn: () => fetchWeatherData(cityName, "weather"),
    });

  const forecastQuery = useQuery({
    queryKey: ["forecastData"],
    queryFn: () => fetchWeatherData(cityName, "forecast"),
  });

  console.log("Forecast Data: ", forecastQuery);
  return (
    <>
      {isPending ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="h-full w-full flex items-center justify-center bg-gradient-to-r from-blue-200 to-cyan-800">
          <div className="mx-auto m-20 max-w-screen-md w-full bg-white/20 backdrop-filter backdrop-blur-sm shadow-lg rounded-lg shadow-black-400 p-10">
            <div className="flex items-center justify-center flex-col">
              <p
                className={`${inter.className} text-white text-5xl uppercase font-bold`}
              >
                {cityName}
              </p>
              <p>{data?.weather[0]?.main}</p>
              <p>{data?.weather[0]?.description}</p>
            </div>
            <img
              src={`http://openweathermap.org/img/w/${data?.weather[0]?.icon}.png`}
              alt=""
            />

            <div>
              <p>feels like: {data?.main?.feels_like}</p>
              <p>Pressure: {data?.main?.pressure}</p>
              <p>Temprature: {data?.main?.temp}</p>
              <p>Humidity: {data?.main?.humidity}</p>
              <p>Sea Level: {data?.main?.sea_level}</p>
              <p>Ground Level: {data?.main?.grnd_level}</p>
            </div>
            {forecastQuery?.isPending ? (
              <div>Loading...</div>
            ) : forecastQuery?.isError ? (
              <div>Error: {forecastQuery?.error.message}</div>
            ) : (
              <div>
                <DataTable
                  title="Daily"
                  weatherData={forecastQuery?.data?.list}
                />
                <DataTable
                  title="Hourly"
                  weatherData={forecastQuery?.data?.list}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CityWetherReport;
