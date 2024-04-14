import { Rubik } from "next/font/google";
import Link from "next/link";
import React from "react";
import CustomData from "./CustomData";

const rubik = Rubik({ subsets: ["arabic"] });

const CityCard = ({ city }: any) => {
  return (
    <Link href={`/${city?.ascii_name}`} key={city?.geoname_id}>
      <div className="w-full my-2 rounded-lg p-5 shadow-lg flex items-center justify-between bg-slate-300 hover:bg-slate-400">
        <div>
          <p className={`${rubik.className} font-semibold text-lg`}>
            {city?.ascii_name} /{" "}
            <span className="font-normal text-base">{city?.cou_name_en}</span>
          </p>
          <CustomData
            iconUrl={"/change-date.webp"}
            title={city?.modification_date}
          />
          <CustomData title={city?.population} iconUrl={"/population.png"} />
        </div>
        <div>
          <CustomData
            title={(city?.coordinates?.lat, city?.coordinates?.lon)}
            iconUrl={"/coordinates.webp"}
          />
          <CustomData title={city?.timezone} iconUrl={"/timezone.webp"} />
        </div>
      </div>
    </Link>
  );
};

export default CityCard;
