import React from "react";

interface CustomDataParams {
  iconUrl: string;
  title: string;
}

const CustomData = ({ iconUrl, title }: CustomDataParams) => {
  return (
    <div className="flex items-center justify-start">
      <img src={iconUrl} alt="" className="w-7 h-7 mr-3" />
      <p>{title}</p>
    </div>
  );
};

export default CustomData;
