import Axios from 'axios'

class Api {

    weather_by_city = (city_name) => {
        let res = Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
            .then((res) => {
                return res.data;
            }).catch((err) => {
                return "Incorrect"
            })

        return res;
    }
    weather_by_Cords = async(lat, lon) => {
        let res = await Axios.get(`
        
        https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
            .then((res) => {
                return res.data;
            })
        return res;
    }
}
export default Api;