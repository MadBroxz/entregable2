import { useState } from "react";

const WeatherDetail = ({ weather }) => {
    console.log(weather);
    const [isC, setIsC] = useState(true);

    const toggleTemperature = () => {
        setIsC(!isC);
    };

    const getTemperature = () => {
        return isC ? weather.main.temp : CToF(weather.main.temp);
    };

    const getTemperatureSymbol = () => {
        return isC ? "°C" : "°F";
    };

    const CToF = (tempC) => {
        const tempF = ((tempC * (9 / 5)) + 32).toFixed(1);
        return tempF;
    };

    return (
        <article className="text-center grid gap-4">
            <h3 className="bg-black/30 p-2 rounded-xl text-3xl">
                {weather.name}, {weather.sys.country}
            </h3>

            <div className="text-white grid gap-4 lg:grid-flow-col">
                {/* Sección 1: Temperatura, descripción e imagen */}
                <section className="bg-black/30 p-2 rounded-xl grid grid-cols-2 items-center lg:h-60">
                    <h3 className="col-span-2 text-2xl">{weather.weather[0].description}</h3>
                    <span className="text-4xl">{getTemperature() + getTemperatureSymbol()}</span>
                    <div>
                        <img className="block mx-auto" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
                    </div>
                </section>

                {/* Sección 2: Detalles adicionales del clima */}
                <section className="grid grid-cols-3 justify-items-center items-center bg-black/30 p-2 rounded-xl h-16 lg:grid-cols-1 lg:h-60">
                    <div className="flex gap-1">
                        <div>
                            <img src="/wind.svg" alt="ícono de la velocidad del viento" />
                        </div>
                        <span>{weather.wind.speed}m/s</span>
                    </div>
                    <div className="h-full items-center pl-2 pr-2 flex gap-1 sm:border-l sm:border-r lg:border-l-0 lg:border-r-0 lg:border-t lg:border-b">
                        <div>
                            <img src="/humidity.svg" alt="ícono de la húmedad" />
                        </div>
                        <span> {weather.main.humidity}%</span>
                    </div>
                    <div className="flex gap-1">
                        <div>
                            <img src="/pressure.svg" alt="ícono de la presión" />
                        </div>
                        <span>{weather.main.pressure}hPa</span>
                    </div>
                </section>

            </div>
                <section className="flex justify-center items-end">
                    <button className="bg-black/60 font-medium rounded-full w-32 h-10" onClick={toggleTemperature}>
                        Cambiar {isC ? "F°" : "C°"}
                    </button>
                </section>
        </article>
    );
};

export default WeatherDetail;