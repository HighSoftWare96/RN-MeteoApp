class ImagesManager {
    static getWeatherBackground(weatherCode) {
        
        if(weatherCode == 800)
            return require('../images/sun.jpg');

        weatherCodeString = weatherCode.toString();
        switch (weatherCodeString.substring(0,1)) {
            case '2':        
                return require('../images/storm.jpg');
            case '3':
                return require('../images/cloud_dark.jpg');
            case '5':
                return require('../images/rain.jpg');
            case '6':
                return require('../images/snow.jpg');
            case '7':
                return require('../images/mist.jpg');
            case '8':
                return require('../images/cloud_soft.jpg');
            default:
                return require('../images/sun.jpg');
        }
    }

    static getWeatherIcon(iconName) {
        switch (iconName) {
            case '01d':
                return require('../images/01d.png');
            case '01n':
                return require('../images/01n.png');
            case '02d':
                return require('../images/02d.png');
            case '02n':
                return require('../images/02n.png');
            case '03d':
                return require('../images/03d.png');
            case '03n':
                return require('../images/03n.png');
            case '04d':
                return require('../images/04d.png');
            case '04n':
                return require('../images/04n.png');
            case '09d':
                return require('../images/09d.png');
            case '09n':
                return require('../images/09n.png');
            case '10d':
                return require('../images/10d.png');
            case '10n':
                return require('../images/10n.png');
            case '11d':
                return require('../images/11d.png');
            case '11n':
                return require('../images/11n.png');
            case '13d':
                return require('../images/13d.png');
            case '13n':
                return require('../images/13n.png');
            case '50d':
                return require('../images/50d.png');
            case '50n':
                return require('../images/50n.png');
            default:
                return require('../images/01d.png');
        }
    }
}



export default ImagesManager;