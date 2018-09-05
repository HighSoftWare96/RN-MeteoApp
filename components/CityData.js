import React from 'react';
import { StyleSheet, View, Text, ImageBackground, Image } from 'react-native';


class CityData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {backImage: ''};
    }
    

    componentDidMount() {
        /* NOT WORKING????
        fetch('https://pixabay.com/api/?key=10012672-83860458f3d16c6b8140b7ca2&q='+ this.props.jsondata.city.name +'&lang=en&image_type=photo&orientation=horizontal&category=travel&safesearch=true')
            .then(response => {
                console.dir(response);
                if (!response.ok) {
                    throw Error(data.statusText);
                }
                return response.json();
            })
            .then(json => {
                console.log(json.hits[0].largeImageURL)
                this.setState(() => {
                    return {backImage: json.hits[0].largeImageURL};
                });
            })
            .catch(err => {
                console.log('Unable to search image! ' + err);
            });*/
    }

    render() {
        const jsondata = this.props.jsondata; 
        return (
            <ImageBackground style={styles.container}>
                    <View style={styles.containerUp}>
                        <View style={styles.containerUpTown}>
                            <Text style={styles.h1}>{jsondata.city.name.substring(0, 10) + ((jsondata.city.name.length < 10) ? '' : '...')}, {jsondata.city.country}</Text>
                            <Text style={styles.subs}>Lon: {jsondata.city.coord.lon}, Long: {jsondata.city.coord.lat}</Text>
                        </View>
                        <Image source={require('../images/city.png')} style={styles.image}></Image>
                    </View>
            </ImageBackground>
        );
    }
};

export default CityData;

const styles = StyleSheet.create({
    container: {
        flex: 0.25,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    containerUp: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    containerUpTown: {
        margin: 20,
        flex: .8,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    h1: {
        color:'white',
        fontSize: 30,
    },
    subs: {
        color: 'white',
        fontSize: 15,
    },
    image: {
        margin: 20,
        flex: .2,
        width: 30,
        height: 50,
    }
});