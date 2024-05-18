import React, { useState } from 'react'
import './Weather.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const Weather = () => {

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({})

    const api = {
        key: '1c121d4f375fd015fc496db5e9358469',
        base: 'https://api.openweathermap.org/data/2.5/'
    }

    const search = (evt) => {
        if (evt.key === 'Enter') {
            const fetchWeather = async () => {
                try {
                    const response = await fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const result = await response.json();
                    console.log(result)
                    setWeather(result);
                    setQuery('')
                }

                catch (err) {
                    console.log(`Unable to fetch weather data: ${err}`)
                }
            }

            fetchWeather();
        }

    }

    const dateBuilder = (d) => {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        let day = days[d.getDay()]
        let date = d.getDate();
        let month = months[d.getMonth()]
        let year = d.getFullYear()

        return `${day}, ${date}, ${month}, ${year}`
    }

    return (
        <>
            <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp >= 16) ? 'weather-warm' : 'weather-cold') : 'weather-box'}>
                <div className="container">
                    <div className="search-box">

                        <div className="search-bar">
                            <input type="text" placeholder='Search Weather...' value={query} onChange={(e) => setQuery(e.target.value)} onKeyPress={search} />
                        </div>

                    </div>

                    <h2>Get Weather...</h2>

                    {(typeof weather.main != 'undefined') ? (
                        <>
                            <div className="location-box">
                                <div className="location-name">
                                    <h2>{weather.name}, {weather.sys.country}</h2>
                                </div>
                                <div className="location-date">
                                    {/* <h3>{new Date().toLocaleDateString()}</h3> */}
                                    <h3>{dateBuilder(new Date())}</h3>
                                </div>
                            </div>

                            <div className="weather-content">
                                <div className="weather-temp">
                                    <h1>{Math.round(weather.main.temp)}°C</h1>
                                </div>
                                <div className="weather-type">
                                    <h4>{weather.weather[0].main}</h4>
                                </div>
                            </div>
                        </>
                    ) : ('')}

                </div>
            </div>
        </>
    )
}

export default Weather
