import React, {Component} from 'react';
import {Text, View, StatusBar} from 'react-native';
import {THEME_DARK} from '../styles/colors';
const theme = THEME_DARK;
export class Other extends Component {
  render() {
    return (
      <View>
        <StatusBar
          translucent={false}
          barStyle="light-content"
          backgroundColor={theme.BLACK}
        />
        <Text> textInComponent </Text>
      </View>
    );
  }
}

export default Other;
