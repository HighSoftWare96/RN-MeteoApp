import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ImageBackground,
StatusBar} from 'react-native';
import {
  Button} from 'react-native-elements'
import DefaultInput from './../components/DefaultInput';
import WeatherApiManager from './../services/WeatherApiManager';
import MeteoButton from '../components/MeteoButton';


class HomeScreen extends React.Component {

    static navigationOptions = {
      header: null,
    };
    constructor(props) {
      super(props);
      this.state = {
        city: '',
        country: '',
        loadingPosition: false,
        geoData: {
          searchingByPosition: false,
          lat: null,
          lon: null,
        },
      };
    }


    onCityTextChange = (text) => {
      this.setState(pv => {
        return {
          city: text,
          country: pv.country,
          loadingPosition: false,
          geoData: {
            searchingByPosition: false,
            lat: null,
            lon: null,
          },
        }
      })
    };

    onCountryTextChange = (text) => {
      this.setState(pv => {
        return {
          city: pv.city,
          country: text,
          loadingPosition: false,
          geoData: {
            searchingByPosition: false,
            lat: null,
            lon: null,
          },
        }
      })
    };

    searchForMeteo = () => {
      const {
        navigate
      } = this.props.navigation;
      if (this.state.city && this.state.country)
        navigate('Meteo', this.state);
    };

    searchForMeteoGeoLocation = () =>  {

        this.setState(pv => {
          return {
            city: pv.city,
            country: pv.country,
            loadingPosition: true,
            geoData: {
              searchingByPosition: true,
              lat: null,
              lon: null,
            },
          }
        });
        WeatherApiManager.getGeoLocation((geodata) => {
          this.setState(pv => {
            return {
              city: pv.city,
              country: pv.country,
              loadingPosition: false,
              geoData: {
                searchingByPosition: true,
                lat: geodata.coords.latitude,
                lon: geodata.coords.longitude,
              },
            }
          }); 
          this.props.navigation.navigate('Meteo', this.state);
        })
        .catch((err) => {
          // geolocation denied
          if(err === 0) {
            Alert.alert('Geolocation permission denied', 'Please insert your city manually or grant geolocation permissions!');
            this.setState(pv => {
              return {
                city: pv.city,
                country: pv.country,
                loadingPosition: false,
                geoData: {
                  searchingByPosition: false,
                  lat: null,
                  lon: null,
                },
              }
            });
          } else {
            Alert.alert('Geolocation error', err);
            this.setState(pv => {
              return {
                city: pv.city,
                country: pv.country,
                loadingPosition: false,
                geoData: {
                  searchingByPosition: false,
                  lat: null,
                  lon: null,
                },
              }
            });
          }
        });
      }

    render() {
        return (
          <ImageBackground style={styles.container} imageStyle={{resizeMode: 'cover'}}  source={require('../images/sun.jpg')}>
              <StatusBar
                translucent
                backgroundColor="rgba(0, 0, 0, 0.20)"
                animated
              />
            <Image source={require('../images/meteo.png')} style={styles.image}/>
            <Text style={styles.h1}>Meteo App</Text>
            <DefaultInput enable={!this.state.loadingPosition} placeholder="Your city" style={styles.input} onChangeText={this.onCityTextChange}/>
            <DefaultInput enable={!this.state.loadingPosition} placeholder="Country code" style={styles.input} maxLength={2} onChangeText={this.onCountryTextChange} autoCapitalize={'characters'}/>
            <View style={{flexDirection: 'row'}}>
              <Button disabled={this.state.loadingPosition} disabledStyle={styles.searchBtnDisabled} title="SEARCH" containerViewStyle={styles.btnContainer} backgroundColor={'black'} buttonStyle={styles.searchBtn} textStyle={styles.searchBtnText} onPress={this.searchForMeteo}/>
              <MeteoButton loading={this.state.loadingPosition} onPress={this.searchForMeteoGeoLocation}/>
            </View>
          </ImageBackground>
        );
    }
  }

export default HomeScreen;

const styles = StyleSheet.create({
    searchBtnText:{
      fontSize: 15,
    },
    btnContainer: {
      marginTop: 20,
      borderRadius: 15,  
      backgroundColor: 'black',  
    },
    searchBtnDisabled: {
      backgroundColor: 'gray',
      borderRadius: 15,      
    },
    searchBtn: {
      borderRadius: 15,
    },
    image: {
      width: 200,
      height: 200,
      paddingBottom: 10,
      shadowColor: 'black',
      shadowOffset: { width: 2, height: 2 },
      shadowRadius: 20,
      shadowOpacity: 1,
    },
    h1: {
      paddingTop: 8,
      fontSize: 40,
      color: 'white',
      textShadowColor: 'black',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 20
    },
    input: {
      padding: 6,
      width: 130,
      borderColor: 'gray',
      height: 40,
      fontSize: 20,
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      color: 'black',
    },
    container: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: -10,
    },
  });
  