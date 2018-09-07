import {
  createStackNavigator,
} from 'react-navigation';
import HomeScreen from './screens/Home.screen';
import MeteoScreen from './screens/Meteo.screen';
import {fromTop} from 'react-navigation-transitions'
import MeteoDetailsScreen from './screens/Details.screen';

const App = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Meteo: {
    screen: MeteoScreen
  },
  Details: {
    screen: MeteoDetailsScreen
  }
}, {
  initialRouteName: 'Home',
  transitionConfig: () => fromTop(),
});

export default App;