import { TextInput } from 'react-native';
import React from 'react';
 
class DefaultInput extends React.Component {
    render() {
        return (
            <TextInput placeholder={this.props.placeholder} style={this.props.style} selectionColor={'white'} underlineColorAndroid={'black'} onChangeText={this.props.onChangeText}
            autoCapitalize={this.props.autoCapitalize} maxLength= {this.props.maxLength} editable={this.props.enable}/>
        );
    }
}

export default DefaultInput