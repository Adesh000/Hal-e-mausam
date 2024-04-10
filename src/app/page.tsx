"use client";
import CityCard from "@/components/CityCard";
import CustomButton from "@/components/CustomButton";
import Navbar from "@/components/Navbar";
import { fetchCitiesData } from "@/services/wetherServices";
import {
  QueryClient,
  QueryClientProvider,
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [page, setPage] = useState<number>(0);
  const [searchedText, setSearchedText] = useState<string>("");
  // const [city, setCity] = useState([]);
  const { isError, data, error, isPending, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["cities", page, searchedText],
      queryFn: () => fetchCitiesData(page, searchedText),
      placeholderData: keepPreviousData,
    });

  return (
    <main>
      <Navbar />
      <section className="px-20 ">
        <div className="w-full mt-5 p-1 border border-slate-500 rounded-lg">
          <input
            value={searchedText}
            onChange={(e) => {
              setSearchedText(e.target.value);
            }}
            type="search"
            placeholder="Search city..."
            className="appearance-none w-full py-3 focus:outline-none"
          />
        </div>
        <div>
          {isPending ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Error: {error.message}</div>
          ) : (
            <div>
              {data?.results.map((city: any) => (
                <CityCard city={city} />
              ))}
            </div>
          )}
          <div className="flex items-center justify-center my-5">
            <CustomButton
              title={"Previous Page"}
              disabled={page === 0}
              onClick={() => setPage((old) => Math.max(old - 1, 0))}
            />
            <span className="px-3 py-1 bg-orange-400 rounded-md text-white mx-5">
              {page + 1}
            </span>
            <CustomButton
              title={"Next Page"}
              disabled={isPlaceholderData}
              onClick={() => {
                if (!isPlaceholderData) {
                  setPage((old) => old + 1);
                }
              }}
            />
          </div>
          {isFetching ? <span> Loading...</span> : null}{" "}
        </div>
      </section>
    </main>
  );
}
