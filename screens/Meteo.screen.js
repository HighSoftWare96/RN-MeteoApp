import React from 'react';
import {
    View,
    ListView,
    StyleSheet,
    ActivityIndicator,
    Text,
    ImageBackground,
    Image,
    StatusBar,
    Alert
} from 'react-native';
import CityData from '../components/CityData';
import SingleDayWeather from './../components/SingleDayWeather';
import WeatherApiManager from './../services/WeatherApiManager';

class MeteoScreen extends React.Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            geoData: this.props.navigation.getParam('geoData'),
            loading: true,
            notFound: false,
            error: false,
            cityName: this.props.navigation.getParam('city'),
            countryID: this.props.navigation.getParam('country'),
            meteoData: {
                list: [],
            },
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            }),
        }
    }

    componentDidMount() {
        if(this.state.geoData.searchingByPosition) {
            WeatherApiManager.fetchWeatherDataByCoords(this.state.geoData.lat, this.state.geoData.lon)
                .then(jsonData => {
                    console.log(jsonData);
                    this.setState(pv => {
                        return {
                            geoData: pv.geoData,
                            loading: false,
                            notFound: false,
                            error: false,
                            cityName: jsonData.city.name,
                            countryID:  jsonData.city.country,
                            meteoData: jsonData,
                            dataSource: pv.dataSource.cloneWithRows(jsonData.list)
                        };
                    });
                })
                .catch(err => {
                    if (err.status == 404) {
                        this.setState(pv => {
                            return {
                                geoData: pv.geoData,
                                loading: false,
                                notFound: true,
                                error: false,
                                cityName: jsonData.city.name,
                                countryID:  jsonData.city.country,
                                meteoData: pv.meteoData,
                                dataSource: pv.dataSource
                            };
                        });
                    } else {
                        this.setState(pv => {
                            return {
                                geoData: pv.geoData,
                                loading: false,
                                notFound: false,
                                error: true,
                                cityName: jsonData.city.name,
                                countryID:  jsonData.city.country,
                                meteoData: pv.meteoData,
                                dataSource: pv.dataSource
                            };
                        });
                        console.log(err);
                    }
                });
            } else {
            WeatherApiManager.getWeatherByCityName(this.state.cityName, this.state.countryID).then(jsonData => {
                    console.log(jsonData);
                    this.setState(pv => {
                        return {
                            geoData: pv.geoData,
                            loading: false,
                            notFound: false,
                            error: false,
                            cityName: pv.cityName,
                            countryID: pv.countryID,
                            meteoData: jsonData,
                            dataSource: pv.dataSource.cloneWithRows(jsonData.list)
                        };
                    });
                })
                .catch(err => {
                    if (err.status == 404) {
                        this.setState(pv => {
                            return {
                                geoData: pv.geoData,
                                loading: false,
                                notFound: true,
                                error: false,
                                cityName: pv.cityName,
                                countryID: pv.countryID,
                                meteoData: pv.meteoData,
                                dataSource: pv.dataSource
                            };
                        });
                    } else {
                        this.setState(pv => {
                            return {
                                geoData: pv.geoData,
                                loading: false,
                                notFound: false,
                                error: true,
                                cityName: pv.cityName,
                                countryID: pv.countryID,
                                meteoData: pv.meteoData,
                                dataSource: pv.dataSource
                            };
                        });
                        console.log(err);
                    }
                });
        }
    }

    showMeteoDetails = (meteoData) => {
        this.props.navigation.navigate('Details', {data: meteoData});
    }

    render() {
        if(this.state.loading) {
            return (<View style={styles.container}>
            <ActivityIndicator size='large' color='white' style={{marginBottom: 5,}}></ActivityIndicator>
            <Text style={{color: 'white'}}>Searching for your meteo!</Text>
        </View>)
        } else if(!this.state.loading && this.state.notFound) {
            return (
            <ImageBackground style={styles.container}>
                <Image source={require('../images/error-404.png')} style={{width: 100, height: 100}}></Image>
                <Text style={{color: 'white',}}>Sorry, we haven't found what you were looking for...</Text>
            </ImageBackground>);
        } else if(this.state.error) {
            return (
            <ImageBackground style={styles.container}>
                <Image source={require('../images/error.png')} style={{width: 70, height: 70, marginBottom: 10,}}></Image>
                <Text style={{color: 'white',}}>Sorry, something went wrong...</Text>
            </ImageBackground>
            );
        } else {
            return this.displayRenderSuccess();
        }

    }

    displayRenderSuccess() {
        return ( 
        <View style = {styles.container} >
            <StatusBar
                translucent
                backgroundColor="rgba(0, 0, 0, 0.20)"
                animated
              />
            <CityData jsondata={this.state.meteoData}></CityData>
            <ListView style={styles.list} dataSource={this.state.dataSource}
            renderRow={(item) => <SingleDayWeather onPress={() => { return this.showMeteoDetails(item) }} weatherData={item}/>}/>
        </View>
        );
        // NOTE: interessante il passaggio sopra: passo una funzione con un argomento già inizializzato
        // wrappando la funzione all'interno di un'altra funzione.
    }
};

export default MeteoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
    },
    list: {
        width: '100%',
        height: '100%'
    }
});