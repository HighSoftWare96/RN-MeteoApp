import {
    PermissionsAndroid,
    Alert
} from 'react-native';

export default class WeatherApiManager {
    static getWeatherByCityName(city, country) {
        return fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "," + country + "&appid=779fdde75d120674cf47f45c1f287d15&units=metric")
            .then(response => {
                console.log(response);
                if (!response.ok) {
                    throw response;
                }
                return response.json();
            })
    }

    static getGeoLocation(successCallback) {
        return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        .then((granted) => {
            if(granted === PermissionsAndroid.RESULTS.GRANTED) {
                navigator.geolocation.getCurrentPosition(
                    successCallback,
                    (err) => {
                        throw err;
                    }, {
                        enableHighAccuracy: false,
                        timeout: 200000,
                        maximumAge: 1000
                    },
                );
            } else {
                throw 0; // errore: geolocalizzazione negata
            }
        });
    }

    static fetchWeatherDataByCoords(lat, long) {
        return fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&appid=779fdde75d120674cf47f45c1f287d15&units=metric")
            .then(response => {
                console.log(response);
                if (!response.ok) {
                    throw response;
                }
                return response.json();
            })
    }
}