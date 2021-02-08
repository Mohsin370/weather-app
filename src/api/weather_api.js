import Axios from 'axios'

class Api {

    weather_by_city = (city_name) => {
        Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
            .then((res) => {
                console.log(res)
            })
    }
    weather_by_Cords = async(lat, lon) => {
        let res = await Axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
            .then((res) => {
                return res.data;
            })
        return res;
    }
}
export default Api;