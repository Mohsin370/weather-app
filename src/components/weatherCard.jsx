import React,{Component} from 'react';
import styles from './weatherCard.module.css'


class WeatherCard extends Component{

render(){
        return(
            <div className={styles.cardMain}>
                <h3>{this.props.dayName}</h3>

            </div>
        )
    }

}


export default WeatherCard;