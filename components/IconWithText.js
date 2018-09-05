import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import FontAwesome, {Icons} from 'react-native-fontawesome';

class IconWithText extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <FontAwesome>{this.props.icon}</FontAwesome>
                <Text style={styles.text}>{this.props.text}</Text>
            </View>
        );
    }
}

export default IconWithText;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        padding: 5,
    },
    text: {
        padding: 5,
    }
});