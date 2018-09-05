import React from 'react';
import { TouchableWithoutFeedback, View, ActivityIndicator, StyleSheet } from 'react-native';
import FontAwesome, {Icons}  from 'react-native-fontawesome';

export default class MeteoButton extends React.Component {
    render() {
        return (
        <TouchableWithoutFeedback style={{backgroundColor: 'rgba(176, 39, 75, 0)'}} onPress={this.props.onPress}>
            <View style={styles.posBtnContainer}>
            {(this.props.loading) ? <ActivityIndicator size='small' color='white'></ActivityIndicator> :
            <FontAwesome style={{color: 'white', fontSize: 20,}}>{Icons.mapMarker}</FontAwesome>}
            </View>
        </TouchableWithoutFeedback> 
        );
    }
}

const styles = StyleSheet.create({
    posBtnContainer: {
        marginTop: 20,
        borderRadius: 15,  
        backgroundColor: 'orange',  
        padding: 13,
      },
});