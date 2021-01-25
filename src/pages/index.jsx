import React, { Component } from 'react';
import Api from '../api/weather_api'


class Index extends Component {

    componentDidMount(){
        let test = new Api();
        console.log(test.weather_by_city('lahore'));
    }
    render() {
        return (
            <div>
                hello
     
            {console.log(process.env.REACT_APP_WEATHER_API_KEY)}

            </div>

        )
    }
}

export default Index;