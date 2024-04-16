import { poppins1, poppins4, poppins7 } from "@/utils/constants/Constants";
import React from "react";

interface StatProps {
  data: string;
  title: string;
  unit: string;
}
const StatCard = ({ data, title, unit }: StatProps) => {
  return (
    <div className="text-center">
      <p className={`${poppins7.className} text-white text-3xl`}>
        {data}
        <span className={`${poppins1.className} text-lg ml-1`}>
          {unit}
        </span>{" "}
      </p>
      <p className={`${poppins1.className} text-white text-lg`}>{title}</p>
    </div>
  );
};

export default StatCard;
