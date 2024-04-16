"use client";
import DataTable from "@/components/DataTable";
import StatCard from "@/components/StatCard";
import { fetchWeatherData } from "@/services/wetherServices";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Inter, Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ weight: "100", subsets: ["devanagari"] });

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
  console.log("Weather Data: ", data);
  return (
    <>
      {isPending ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="h-full w-full flex items-center justify-center bg-gradient-to-r from-blue-200 to-cyan-800">
          <div className="mx-auto m-20 max-w-screen-md w-full bg-white/20 backdrop-filter backdrop-blur-sm shadow-lg rounded-lg shadow-black-400 p-10">
            <Link
              className="flex items-center justify-center rounded-full w-10 h-10 bg-white"
              href={"/"}
            >
              <ArrowLeftOutlined />
            </Link>
            <div className="flex items-center justify-center flex-col">
              <p
                className={`${poppins.className} text-white text-5xl uppercase font-bold`}
              >
                {cityName}
              </p>

              <p
                className={`${inter.className} text-white text-xl uppercase font-bold`}
              >
                {data?.weather[0]?.main}
              </p>

              <p
                className={`${inter.className} text-white text-lg uppercase font-bold`}
              >
                {data?.weather[0]?.description}
              </p>
            </div>

            <div className="flex items-center justify-between my-5">
              <img
                src={`http://openweathermap.org/img/w/${data?.weather[0]?.icon}.png`}
                alt=""
                className="w-20 h-20"
              />
              <StatCard
                data={data?.main?.temp}
                title={"Temperature"}
                unit="F"
              />
              <StatCard
                data={data?.main?.pressure}
                title={"Pressure"}
                unit=""
              />
              <StatCard
                data={data?.main?.humidity}
                title={"Humidity"}
                unit="%"
              />
              <StatCard data={data?.wind?.speed} title={"Wind Speed"} unit="" />
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
