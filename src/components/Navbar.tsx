import React from "react";
import { Bungee_Spice, Montserrat, Poppins } from "next/font/google";

// const poppins = Poppins({ subsets: ["devanagari"], weight: "600" });
const bungee = Bungee_Spice({ weight: "400", subsets: ["latin"] });

const Navbar = () => {
  return (
    <div className="bg-gradient-to-r from-gray-500 to-red-500 p-5 px-20">
      <div>
        <p className={`${bungee.className} text-white text-lg`}>Mausam</p>
      </div>
      <div></div>
    </div>
  );
};

export default Navbar;
