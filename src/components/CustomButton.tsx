import React from "react";

interface ButtonParams {
  title: string;
  disabled: boolean;
  onClick: () => void;
}

const CustomButton = ({ title, disabled, onClick }: ButtonParams) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-blue-800 text-white px-3 py-1 rounded-md"
    >
      {title}
    </button>
  );
};

export default CustomButton;
