import axios from "axios";
import { useEffect, useState } from "react"
import WeatherDetail from "./components/WeatherDetail";
import LoadApp from "./components/LoadApp";

function App() {
  const [weather, setWeather] = useState(null);

  const success = (pos) => {
    const {coords: {latitude, longitude}, } = pos;
    
    axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ae0d6bc66dee1ee280bf3928ff9d2fb4&lang=es&units=metric`)
        .then(({ data }) => setWeather(data))
        .catch((err) => console.log(err));
    
  }

  const getBackgroundClass = () => {
    const weatherIcon = weather?.weather[0].icon;
    return bgImg[weatherIcon] || "bg-black";
  };

  const bgImg = {
    "04d" : "bg-[url(/bgcloudy.jpg)]",
    "04n" : "bg-[url(/bgcloudyn.jpg)]",
    "01d" : "bg-[url(/bgsun.jpg)]",
    "01n" : "bg-[url(/bgsunn.webp)]",
    "02d" : "bg-[url(/bgfewclouds.jpg)]",
    "02n" : "bg-[url(/bgfewcloudsn.jpg)]",
    "03d" : "bg-[url(/bgcloudy.jpg)]",
    "09d" : "bg-[url(/bgrain.jpg)]",
    "09n" : "bg-[url(/bgrainn.jpg)]",
    "10d" : "bg-[url(/bgrain.jpg)]",
    "10n" : "bg-[url(/bgrainn.jpg)]",
    "11d" : "bg-[url(/bgelectric.jpg)]",
    "11n" : "bg-[url(/bgelectricn.jpg)]",
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  },[])

  return (
    <main className={`flex justify-center items-center h-screen text-white bg-cover ${getBackgroundClass()}`}>
      {weather ? <WeatherDetail weather={weather} /> : <LoadApp /> }
    </main>
  );
}

export default App;