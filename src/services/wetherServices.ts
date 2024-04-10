import axios from "axios";
const API_KEY = "2e95734b178bc1fe440a58f5e72c7c38";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const CITY_BASE_URL =
  "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?";

export const fetchCitiesData = async (page: number, searchedText: string) => {
  const query =
    searchedText !== "" ? `where=search(name%2C%20%22${searchedText}%22)&` : "";
  const url = CITY_BASE_URL + query + `limit=20&offset=${page}`;
  console.log("Url: ", url);
  try {
    const response = await axios.get(url);
    console.log("Response: ", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchWeatherData = async (city: string, type: string) => {
  const url = BASE_URL + type + `?q=${city}&appid=${API_KEY}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
