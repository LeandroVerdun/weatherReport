import { useState } from "react";

export const WeatherReport = () => {
    const urlBase = 'https://api.openweathermap.org/data/2.5/weather';
    const API_KEY = 'c098202835103517c029148df45520b7';
    const difKelvin = 273.15;

    const [ciudad, setCiudad] = useState('');
    const [dataClima, setDataClima] = useState(null);
    const [localTime, setLocalTime] = useState('');
    const [animationKey, setAnimationKey] = useState(0);

    const handleCambioCiudad = (e) => {
        setCiudad(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (ciudad.length > 0) fetchClima();
    };

    const fetchClima = async () => {
        try {
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`);
            const data = await response.json();
            setDataClima(data);

            const timezoneOffset = data.timezone; 
            const utcTime = new Date().getTime() + (new Date().getTimezoneOffset() * 60000);
            const localDate = new Date(utcTime + timezoneOffset * 1000); 
            setLocalTime(localDate.toLocaleString());

        
            setAnimationKey(prevKey => prevKey + 1);
        } catch (error) {
            console.error('Ocurrió el siguiente problema: ', error);
        }
    };

    return (
        <div className="container">
            <h1>Aplicación del Clima</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={ciudad}
                    onChange={handleCambioCiudad}
                    placeholder="Ingrese una ciudad"
                />
                <button type="submit">Buscar</button>
            </form>
            {
                dataClima && (
                    <div className="info-container" key={animationKey}>
                        <h2>{dataClima.name}</h2>
                        <p>Temperatura: {parseInt(dataClima?.main?.temp - difKelvin)}ºC</p>
                        <p>Condición meteorológica: {dataClima.weather[0].description}</p>
                        <p>Hora local: {localTime}</p>
                        <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} alt="Icono del clima" />
                    </div>
                )
            }
        </div>
    );
};
