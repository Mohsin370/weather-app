import React, { Component } from 'react';
import Api from '../api/weather_api';
import WeatherCard from '../components/weatherCard';
import './index.css'


class Index extends Component {


    state={
        sevenDaysWeather:[]
    }
    componentDidMount(){
        this.getCurrentWeatherByLoc();
    }

     getCurrentWeatherByLoc =async ()=>{

        let latLngApi = new Api();
        let weatherStatus = ""
        navigator.geolocation.getCurrentPosition( async function (position) {
            weatherStatus =  await latLngApi.weather_by_Cords(position.coords.latitude,position.coords.longitude);
            console.log(weatherStatus);
          });

        var d = new Date();
        var currentDay = d.getDay();
          let weatherStateArray=[]
          var weekday = new Array(7);
          weekday[0] = "Sunday";
          weekday[1] = "Monday";
          weekday[2] = "Tuesday";
          weekday[3] = "Wednesday";
          weekday[4] = "Thursday";
          weekday[5] = "Friday";
          weekday[6] = "Saturday";

          weekday.forEach((res,index)=>{
              if(currentDay>6){
                  currentDay = 0;
              }
              console.log(weekday[currentDay]);
              weatherStateArray.push(
                  {dayName: weekday[currentDay], WeatherStatus: weatherStatus }
                  )
              currentDay+=1;
          })

          this.setState({
              sevenDaysWeather:weatherStateArray,
          })


        
    }
    render() {
        return (
            <div className="weather_cards">
                {this.state.sevenDaysWeather.map((res)=>{
                    console.log(res);
                    return<WeatherCard dayName={res.dayName}></WeatherCard>

                })}
            </div>

        )
    }
}

export default Index;