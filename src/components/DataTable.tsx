import { Inter } from "next/font/google";
import React from "react";

const inter = Inter({ subsets: ["latin"] });
interface TableParams {
  title: string;
  weatherData: any;
}

const DataTable = ({ title, weatherData }: TableParams) => {
  console.log("Weather: ", weatherData);
  return (
    <div>
      <p className={`${inter.className} text-white uppercase`}>
        {title} Forecast
      </p>
      <div className="w-full h-[1px] bg-white" />
      <div className="flex items-center justify-between">
        {weatherData.map((item: any) => (
          <div className="flex flex-col items-center justify-center my-2">
            <p className={`${inter.className} uppercase text-white`}>Mon</p>
            <img
              src={`http://openweathermap.org/img/w/${item?.weather[0]?.icon}.png`}
              alt=""
            />
            <p className={`${inter.className} text-white `}>17 C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataTable;
