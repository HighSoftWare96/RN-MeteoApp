/*jshint esversion: 6 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ImageBackground,Text, Image, ScrollView  } from 'react-native';
import ImagesManager from '../services/ImagesManager';
import WeatherApiManager from './../services/WeatherApiManager';
import IconWithText from './../components/IconWithText';
import { Icons } from 'react-native-fontawesome';
import FontAwesome from 'react-native-fontawesome';

export default class MeteoDetailsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            meteoData: this.props.navigation.getParam('data'),
        };   
        console.dir(this.state.meteoData);
    }
    

    static navigationOptions = {
        header: null,
    };

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <ImageBackground style={styles.imageTop} source={ImagesManager.getWeatherBackground(this.state.meteoData.weather[0].id)}>
                    <Text style={styles.date}>{WeatherApiManager.convertFromUTCToStdDate(this.state.meteoData.dt)}</Text>
                    <View style={styles.infoTop}>
                        <View style={{padding: 10}}>
                            <Text style={styles.temp}>{this.state.meteoData.main.temp} °C</Text>
                            <IconWithText icon={Icons.arrowDown} text={this.state.meteoData.main.temp_min + '°C'} textStyle={{color: 'white',fontSize: 15,textShadowColor: 'black',textShadowOffset: { width: 2, height: 2 },textShadowRadius: 20,}}/>
                            <IconWithText icon={Icons.arrowUp} text={this.state.meteoData.main.temp_max + '°C'} textStyle={{color: 'white',fontSize: 15,textShadowColor: 'black',textShadowOffset: { width: 2, height: 2 },textShadowRadius: 20,}}/>
                        </View>
                        <View style={styles.weatherIconInfo}>
                            <Text style={styles.weatherText}>{this.state.meteoData.weather[0].description}</Text>
                            <Image source={ImagesManager.getWeatherIcon(this.state.meteoData.weather[0].icon)} style={styles.weatherImage}></Image>
                        </View>
                    </View>
                </ImageBackground>
                <View style={styles.subInfoBox}>
                    <FontAwesome style={styles.subInfoIcon}>{Icons.lineChart}</FontAwesome>
                    <Text style={styles.subtitle}>Pressure:</Text>
                    <Text>{this.state.meteoData.main.pressure} hPa</Text>
                </View>
                <View style={styles.subInfoBox}>
                    <FontAwesome style={styles.subInfoIcon}>{Icons.ship}</FontAwesome>
                    <Text style={styles.subtitle}>Pressure at sea level:</Text>
                    <Text>{this.state.meteoData.main.sea_level} hPa</Text>
                </View>
                <View style={styles.subInfoBox}>
                    <FontAwesome style={styles.subInfoIcon}>{Icons.globe}</FontAwesome>
                    <Text style={styles.subtitle}>Pressure at ground level:</Text>
                    <Text>{this.state.meteoData.main.grnd_level} hPa</Text>
                </View>
                <View style={styles.subInfoBox}>
                     <FontAwesome style={styles.subInfoIcon}>{Icons.tint}</FontAwesome>
                    <Text style={styles.subtitle}>Humidity:</Text>
                    <Text>{this.state.meteoData.main.humidity} hPa</Text>
                </View>
                <View style={styles.subInfoBox}>
                    <FontAwesome style={styles.subInfoIcon}>{Icons.cloud}</FontAwesome>
                    <Text style={styles.subtitle}>Cloudiness:</Text>
                    <Text>{this.state.meteoData.clouds.all} %</Text>
                </View>
                <View style={styles.subInfoBox}>
                <FontAwesome style={styles.subInfoIcon}>{Icons.flag}</FontAwesome>
                    <Text style={styles.subtitle}>Wind speed:</Text>
                    <Text>{this.state.meteoData.wind.speed} m/s</Text>
                </View>
                <View style={styles.subInfoBox}>
                <FontAwesome style={styles.subInfoIcon}>{Icons.compass}</FontAwesome>
                    <Text style={styles.subtitle}>Wind direction:</Text>
                    <Text>{this.state.meteoData.wind.deg} degree</Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        height: 105
    },
    imageTop: {
        height: '40%',
        flex: 0.6,
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
    },
    date: {
        marginTop: 30,
        padding: 10,
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 20,
        fontSize: 15,
    },
    weatherImage: {
        width: 100,
        height: 100,
        padding: 10,
    },
    weatherText: {
        color: 'white',
        padding: 10,
        
    },
    temp: {
        fontSize: 50,
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 20,
    },
    infoTop: {flexDirection: 'row', alignItems: 'center', width:'100%', flex: 1, padding: 15},
    weatherIconInfo: {
        flex: 1,
        alignItems: 'flex-end',
        
    },
    subtitle: {
        color: 'black',
        fontSize: 15,
        paddingEnd: 5,
    },
    subInfoBox: {
        flex: .085,
        flexDirection: 'row',
        paddingStart: 20,
        paddingTop: 20,
    },
    subInfoIcon: {
        color: 'black',
        fontSize: 22,
        paddingEnd: 10,
    }
});