import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableNativeFeedback } from 'react-native';
import IconWithText from './IconWithText';
import FontAwesome, { Icons } from 'react-native-fontawesome'
import ImagesManager from './../services/ImagesManager';

class SingleDayWeather extends React.Component {
    constructor(props) {
        super(props);
        
    }

    printDate(utc) {
        let resultString = '';
        let date = new Date(utc*1000);

        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        if(date.getDate() == new Date().getDate()) {
            resultString += 'Today, ';
        } else if(date.getDate() == tomorrow.getDate()){
            resultString += 'Tomorrow, ';
        } else {
            resultString += this.toStringWithTwoZero(date.getMonth()) + '/' + this.toStringWithTwoZero(date.getDate()) + '/' + date.getFullYear() + ', '; 
        }
        resultString += this.toStringWithTwoZero(date.getHours()) + ':' + this.toStringWithTwoZero(date.getMinutes());
        return resultString;
    }

    toStringWithTwoZero(number) {
        if(number <= 9) {
            return '0' + number; 
        } else {
            return number.toString();
        }
    }

    render() {
        const weatherData = this.props.weatherData;
        return (
        <TouchableNativeFeedback onPress={this.props.onPress}>
            <ImageBackground style={styles.container} source={ImagesManager.getWeatherBackground(weatherData.weather[0].id)}>
                <View style={styles.containerTemp}>
                    <View style={styles.currentTempContainer}>
                        <FontAwesome style={styles.tempIcon}>{Icons.thermometer}</FontAwesome>
                        <Text style={styles.temp}>{weatherData.main.temp}°C</Text>
                    </View>
                    <View style={styles.minmaxcontainer}>
                        <IconWithText icon={Icons.arrowDown} text={weatherData.main.temp_min + '°C'}/>
                        <IconWithText icon={Icons.arrowUp} text={weatherData.main.temp_max + '°C'}/>
                    </View>
                </View>
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{this.printDate(weatherData.dt)}</Text>
                    <View style={styles.weatherDesc}>
                        <Text style={styles.weatherDescText}>{weatherData.weather[0].description}</Text>
                        <Image style={styles.weatherImage} source={ImagesManager.getWeatherIcon(weatherData.weather[0].icon)}></Image>
                    </View>
                </View>
            </ImageBackground>
        </TouchableNativeFeedback>
        );
    }

}

export default SingleDayWeather;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 90,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#ECECEC',
    },
    containerTemp: {
        flex: 0.45,
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingLeft: 5,
    },
    currentTempContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    temp: {
        fontSize: 25,
        color: 'white',
        alignItems: 'center',
        paddingStart: 10,
        paddingTop: 10,
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 20
    },
    tempIcon: {
        fontSize: 22,
        color: 'white',
        paddingStart: 10,
        paddingTop: 17,
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 20
    },
    minmaxcontainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingStart: 10,
    },
    dateContainer: {
        paddingEnd: 10,
        paddingTop: 15,
        flex: 0.55,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
        alignSelf: 'flex-start',
    },
    dateText: {
        color: 'white',
    },
    weatherDesc: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    weatherDescText: {
        paddingRight: 5,
    }
});