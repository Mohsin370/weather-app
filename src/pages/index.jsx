import React, { Component } from 'react';
import Api from '../api/weather_api';
import './index.css';
import sunnyImage from '../images/sunny.jpg';
import HazeImage from '../images/haze.jpg'
import rainImage from '../images/rain.jpeg'
import HazeIcon from '../images/icons/haze_icon.png';
import SunIcon from '../images/icons/sun_icon.png';
import SearchIcon from '../images/icons/search.png';



let latLngApi = new Api();

class Index extends Component {

    state = {
        currentWeatherBasic: {},
        cityName: ''
    }


    componentDidMount() {
        this.getCurrentWeatherByLoc();
    }

    getCurrentWeatherByLoc = () => {

        let weatherStatus = ""
        var d = new Date();
        console.log(d.toLocaleTimeString())
        let weekdays = [];
        weekdays[2] = 'Tuesday';
        weekdays[1] = 'Monday';
        weekdays[3] = 'Wednesday';
        weekdays[4] = 'Thursday';
        weekdays[5] = 'Friday';
        weekdays[6] = 'Saturday';
        weekdays[7] = 'sunday';


        let promise = new Promise((res, rej) => {

            navigator.geolocation.getCurrentPosition(async function (position) {
                weatherStatus = await latLngApi.weather_by_Cords(position.coords.latitude, position.coords.longitude);
                // weatherStatus.weather[0].main ="Rain";
                let backgroundImage,icon;
                if(weatherStatus.weather[0].main == "Haze" || "Smoke"){
                    backgroundImage = HazeImage;
                    icon =HazeIcon;
                }else if(weatherStatus.weather[0].main == "Sunny"){
                    backgroundImage = sunnyImage;
                    icon =SunIcon;
                }else if (weatherStatus.weather[0].main == "Rain"){
                    backgroundImage = rainImage;
                    icon =SunIcon;
                }


                let currentWeather = {
                    tempInCel: ((weatherStatus.main.temp - 273.15)),
                    weatherCondition: weatherStatus.weather[0].main,
                    Day: weekdays[d.getDay()],
                    Time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    cityName: "Current Location",
                    Icon:icon,
                    backgroundImage: backgroundImage,


                }
                // console.log(weatherStatus)
                res(currentWeather);
            });
        })
        promise.then((res) => {
            console.log(res);
            this.setState({ currentWeatherBasic: res })

        })
    }


    getWeatherbyCity = async () => {
        let weatherStatus = await latLngApi.weather_by_city(this.state.cityName);
        console.log(weatherStatus);

    }

    render() {
        return (
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

                        <div className="city_date_container">
                            <img className="weather_icon" src={this.state.currentWeatherBasic.Icon} alt="haze_icon"/>
                            <p className="weather_condition"> {this.state.currentWeatherBasic.weatherCondition}</p>
                        </div>
                    </div>
                </div>


                <div className="weather_details">

                    <div className="weather_detals_main">
                    <input placeholder="Enter City Name"
                    onChange={(e) => { this.setState({ cityName: e.target.value }) }} className="searchInput"></input>
                    <button onClick={this.getWeatherbyCity} className="searchBtn">
                        <img src={SearchIcon} alt="search" className="searchIcon"/>
                    </button>
                    </div>
                </div>

            </div>

        )
    }
}

export default Index;