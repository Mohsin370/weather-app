import Axios from 'axios'

class Api {
 
    weather_by_city = (city_name) => {
        console.log('hello');
        Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
            .then((res) => {
                console.log(res)
            })
    }
}
export default Api;