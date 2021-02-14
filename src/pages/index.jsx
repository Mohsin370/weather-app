import React, { Component } from 'react';
import Api from '../api/weather_api';
import './index.css';
import sunnyImage from '../images/sunny.jpg';
import HazeImage from '../images/haze.jpg'
import rainImage from '../images/rain.jpeg'
import cloudImage from '../images/cloud.jpeg';
import clearImage from '../images/clear.jpg';
import CloudIcon from '../images/icons/cloud.png';
import HazeIcon from '../images/icons/haze_icon.png';
import SunIcon from '../images/icons/sun_icon.png';
import clearIcon from '../images/icons/clear.png';
import SearchIcon from '../images/icons/search.png';
import { MagicSpinner } from "react-spinners-kit";
let latLngApi = new Api();
class Index extends Component {
    state = {
        currentWeatherBasic: {
            weather_details: [{}]
        },
        cityName: '',
        displaError: false,
        LoadSpinner: true,
    }
    componentDidMount() {
        this.getCurrentWeatherByLoc();
    }
    getCurrentWeatherByLoc = () => {
        let weatherStatus = ""
        let promise = new Promise((res, rej) => {
            navigator.geolocation.getCurrentPosition(async function (position) {
                weatherStatus = await latLngApi.weather_by_Cords(position.coords.latitude, position.coords.longitude);
                res(weatherStatus);
            });
        })
        promise.then((res) => {
            let result = this.calculateWeather(res);
            this.setState({LoadSpinner:false})
            this.setState({ currentWeatherBasic: result })
        })
    }
    getWeatherbyCity = (e) => {
        if (e.key === "Enter" || e.type === "click") {
            let promise = new Promise(async (res, rej) => {
                let weatherStatus = await latLngApi.weather_by_city(this.state.cityName);
                res(weatherStatus);
            })

            promise.then((res) => {

                if (res !== "Incorrect") {
                    if (this.state.displaError !== false) {
                        this.setState({ displaError: false })
                    }

                    let result = this.calculateWeather(res);
                    this.setState({ currentWeatherBasic: result }, () => {
                        console.log(this.state.currentWeatherBasic);

                    })
                } else {
                    if (this.state.displaError !== true) {
                        this.setState({ displaError: true })
                    }
                }
            })
        }
    }

    calculateWeather = (weatherStatus) => {

        var d = new Date();
        let weekdays = [];
        weekdays[0] = 'Sunday';
        weekdays[1] = 'Monday';
        weekdays[2] = 'Tuesday';
        weekdays[3] = 'Wednesday';
        weekdays[4] = 'Thursday';
        weekdays[5] = 'Friday';
        weekdays[6] = 'Saturday';
        let backgroundImage, icon;
        if (weatherStatus.weather[0].main === "Haze" || weatherStatus.weather[0].main === "Smoke" || weatherStatus.weather[0].main === "Mist") {
            backgroundImage = HazeImage;
            icon = HazeIcon;
        } else if (weatherStatus.weather[0].main === "Sunny") {
            backgroundImage = sunnyImage;
            icon = SunIcon;
        } else if (weatherStatus.weather[0].main === "Rain") {
            backgroundImage = rainImage;
            icon = SunIcon;
        } else if (weatherStatus.weather[0].main === "Clouds") {
            backgroundImage = cloudImage;
            icon = CloudIcon;
        } else if (weatherStatus.weather[0].main === "Clear") {
            backgroundImage = clearImage;
            icon = clearIcon;
        }
        let arr = [
            { title: "Description", value: weatherStatus.weather[0].description },
            { title: "Humidity", value: weatherStatus.main.humidity },
            { title: "Pressure", value: weatherStatus.main.pressure },
            { title: "Max Temprature", value: (Math.round(weatherStatus.main.temp_max - 273.15))+" C" },
            { title: "Min Temprature", value: (Math.round(weatherStatus.main.temp_min - 273.15))+" C" },
            { title: "Feels Like", value: (Math.round(weatherStatus.main.feels_like - 273.15))+" C" },
            { title: "Wind Speed", value: weatherStatus.wind.speed },
        ]

        let currentWeather = {
            tempInCel: (Math.round(weatherStatus.main.temp - 273.15)),
            weatherCondition: weatherStatus.weather[0].main,
            Day: weekdays[d.getDay()],
            Time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            cityName: weatherStatus.name,
            Icon: icon,
            backgroundImage: backgroundImage,

            weather_details: arr,

        }
        return currentWeather;
    }
    render() {
        return (
            <div>
                {this.state.LoadSpinner ?
                    <div className="spinner_main">
                        <div className="spinner">
                            <MagicSpinner size={150} color="#1687a7" loading={this.state.LoadSpinner} />
                        </div>
                    </div>
                    :
                    <div className="weather_main" style={{ backgroundImage: `url(${this.state.currentWeatherBasic.backgroundImage})` }}>
                        <div className="temprature_container">
                            <div className="container_item_temprature">
                                <p className="temprature">{this.state.currentWeatherBasic.tempInCel}
                                    <span>&#176;</span>
                                </p>

                                <div className="city_date_container">
                                    <p className="city"> {this.state.currentWeatherBasic.cityName}   </p>
                                    <p className="day_time"> {this.state.currentWeatherBasic.Day} - {this.state.currentWeatherBasic.Time}</p>
                                </div>

                                <div className="weather_icon_condition">
                                    <img className="weather_icon" src={this.state.currentWeatherBasic.Icon} alt="icon" />
                                    <p className="weather_condition"> {this.state.currentWeatherBasic.weatherCondition}</p>
                                </div>
                            </div>
                        </div>
                        <div className="weather_details">

                            <div className="weather_detals_main">
                                <div className="Form">
                                    <input placeholder="Enter City Name"
                                        onChange={(e) => { this.setState({ cityName: e.target.value }) }} onKeyPress={this.getWeatherbyCity} className="searchInput"></input>
                                    <button onClick={this.getWeatherbyCity} className="searchBtn">
                                        <img src={SearchIcon} alt="search" className="searchIcon" />
                                    </button>
                                </div>
                                {this.state.displaError ? <p className="error_message">Incorrect City Name</p> : ''}
                                <p className="details-heading">Weather Details</p>


                                {this.state.currentWeatherBasic.weather_details.map((res) => {
                                    return (
                                        <div className="details">
                                            <p>{res.title}</p>
                                            <p>{res.value}</p>
                                        </div>)

                                })}

                            </div>

                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default Index;